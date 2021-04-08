import UserIcon from '@material-ui/icons/Group'
import React from 'react'
import {
  Create,
  CreateProps,
  Datagrid,
  DateField,
  Edit,
  EditProps,
  List,
  ListProps,
  SimpleForm,
  TextField,
  TextInput,
} from 'react-admin'

// type Component = React.ComponentType<ResourceComponentProps>
// type Props = Record<string, unknown>
interface UserRecord {
  record?: Record<string, unknown>
}

export function UserCreate(props: CreateProps): React.ReactElement {
  return (
    <Create title="Create a User" {...props}>
      <SimpleForm>
        <TextInput source="email" />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
      </SimpleForm>
    </Create>
  )
}

// Filter?
export function UserList(props: ListProps): React.ReactElement {
  return (
    <List title="All users" {...props}>
      <Datagrid optimized rowClick="edit">
        <TextField source="id" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <DateField source="updatedAt" showTime />
        <DateField source="createdAt" showTime />
      </Datagrid>
    </List>
  )
}

function UserTitle({ record }: UserRecord) {
  return <span>User {record ? `"${record.firstName}"` : ''}</span>
}

export function UserEdit(props: EditProps): React.ReactElement {
  return (
    <Edit title={<UserTitle />} {...props}>
      <SimpleForm>
        <TextInput source="id" disabled />
        <TextInput source="firstName" />
        <TextInput source="lastName" />
      </SimpleForm>
    </Edit>
  )
}

const resource = {
  list: UserList,
  create: UserCreate,
  edit: UserEdit,
  icon: UserIcon,
}

export default resource
