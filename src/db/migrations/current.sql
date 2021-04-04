--- Schemas ---

-- Directly exposed
drop schema if exists app_public cascade;
create schema app_public;
comment on schema app_public is 'Core public interface and schema for GraphQL';

-- Indirectly exposed
drop schema if exists app_hidden cascade;
create schema app_hidden;
comment on schema app_hidden is 'User-accessible but private implementation details';

-- Not exposed
drop schema if exists app_private cascade;
create schema app_private;
comment on schema app_private is 'Private credentials accessible only to database owner';

--- RBAC ---

-- Revoke `public` default access, which all roles inherit
revoke all on schema public from public;
alter default privileges revoke all on sequences from public;
alter default privileges revoke all on functions from public;

-- Grant `owner` access
grant all on schema public to ":DATABASE_OWNER";

-- Grant `visitor` access (insert and functions)
grant usage on schema public, app_public, app_hidden to ":DATABASE_VISITOR";
alter default privileges in schema public, app_public, app_hidden
  grant usage, select on sequences to ":DATABASE_VISITOR";
alter default privileges in schema public, app_public, app_hidden
  grant execute on functions to ":DATABASE_VISITOR";

--- Triggers ---

-- Ensure `created_at` is never mutated and `updated_at` is monotonically increasing
create or replace function app_private.tg__timestamps() returns trigger as $$
begin
  NEW.created_at = (case when TG_OP = 'INSERT' then now() else OLD.created_at end);
  NEW.updated_at = (case when TG_OP = 'UPDATE' and OLD.updated_at >= now() then OLD.updated_at + interval '1 millisecond' else NOW() end);
  return NEW;
end;
$$ language plpgsql volatile set search_path to pg_catalog, public, pg_temp;
comment on function app_private.tg__timestamps() is 'This trigger should be called on all tables with created_at and updated_at';

--- Users ---

-- users
drop table if exists app_public.users;
create table app_public.users (
  id serial primary key,
  first_name text not null check (char_length(first_name) < 80),
  last_name text check (char_length(last_name) < 80),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
create trigger _users_set_updated_at
  before update on app_public.users
  for each row execute procedure app_private.tg__timestamps();

comment on table app_public.users is 'A user of the app.';
comment on column app_public.users.id is 'The primary unique identifier for the user.';
comment on column app_public.users.first_name is 'The user’s first name.';
comment on column app_public.users.last_name is 'The user’s last name.';
comment on column app_public.users.created_at is 'The time this user was created.';
comment on column app_public.users.updated_at is 'The time this user was updated.';

-- current user
create or replace function app_public.current_user() returns app_public.users as $$
  select *
  from app_public.users
  where id = nullif(current_setting('jwt.claims.user_id', true), '')::integer
$$ language sql stable;

comment on function app_public.current_user() is 'Gets the user who was identified by our JWT.';

create or replace function app_public.current_user_id() returns int as $$
  select id from app_public.current_user()
$$ language sql stable;

comment on function app_public.current_user_id() is 'Gets the user id who was identified by our JWT.';

-- user rls
alter table app_public.users enable row level security;
create policy select_all on app_public.users for select using (true);
create policy update_self on app_public.users for update using (id = app_public.current_user_id());
create policy delete_self on app_public.users for delete using (id = app_public.current_user_id());
grant select on app_public.users to ":DATABASE_VISITOR";
grant insert(first_name, last_name) on app_public.users to ":DATABASE_VISITOR";
grant update(first_name, last_name) on app_public.users to ":DATABASE_VISITOR";
grant delete on app_public.users to ":DATABASE_VISITOR";

-- accounts
drop table if exists app_private.user_accounts;
create table app_private.user_accounts (
  user_id integer primary key references app_public.users(id) on delete cascade,
  email text not null unique check (email ~* '^.+@.+\..+$'),
  password_hash text not null
);

comment on table app_private.user_accounts is 'Private information about a person’s account.';
comment on column app_private.user_accounts.user_id is 'The id of the person associated with this account.';
comment on column app_private.user_accounts.email is 'The email address of the person.';
comment on column app_private.user_accounts.password_hash is 'An opaque hash of the person’s password.';

--- Registration and authentication ---

-- Register new user
create or replace function app_public.register_user(
  first_name text,
  last_name text,
  email text,
  password text
) returns app_public.users as $$
declare
  usr app_public.users;
begin
  insert into app_public.users (first_name, last_name) values
    (first_name, last_name)
    returning * into usr;

  insert into app_private.user_accounts (user_id, email, password_hash) values
    (usr.id, email, crypt(password, gen_salt('bf')));

  return usr;
end;
$$ language plpgsql strict security definer;

comment on function app_public.register_user(text, text, text, text) is 'Registers a new user and creates an account.';

-- Authenticate user
create type app_public.jwt_token as (
  role text,
  user_id integer,
  exp bigint
);

create or replace function app_public.authenticate(
  email text,
  password text
) returns app_public.jwt_token as $$
declare
  account app_private.user_accounts;
begin
  select a.* into account
  from app_private.user_accounts as a
  where a.email = $1;

  if account.password_hash = crypt(password, account.password_hash) then
    return ('app_public_person', account.user_id, extract(epoch from (now() + interval '2 days')))::app_public.jwt_token;
  else
    return null;
  end if;
end;
$$ language plpgsql strict security definer;

comment on function app_public.authenticate(text, text) is 'Creates a JWT token that will securely identify a person and give them certain permissions. This token expires in 2 days.';

--- Seed ---
select app_public.register_user('John', 'Doe', 'john.doe@gmail.com', 'password');
