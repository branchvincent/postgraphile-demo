begin;
-- GRANT CONNECT ON DATABASE :DATABASE_NAME TO :DATABASE_OWNER;
-- GRANT CONNECT ON DATABASE :DATABASE_NAME TO :DATABASE_AUTHENTICATOR;
-- GRANT ALL ON DATABASE :DATABASE_NAME TO :DATABASE_OWNER;
-- ALTER SCHEMA public OWNER TO :DATABASE_OWNER;

-- Roles
drop role if exists ":DATABASE_VISITOR";
create role ":DATABASE_VISITOR";

drop role if exists ":DATABASE_AUTHENTICATOR";
create role ":DATABASE_AUTHENTICATOR";

-- Extensions (require superuser privileges)
-- CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;
-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
-- CREATE EXTENSION IF NOT EXISTS citext WITH SCHEMA public;
create extension if not exists pgcrypto with schema public;

commit;
