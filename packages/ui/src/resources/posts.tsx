import {
  Create,
  Datagrid,
  DateField,
  Edit,
  EditButton,
  Filter,
  List,
  ReferenceField,
  ReferenceInput,
  RichTextField,
  SelectInput,
  Show,
  ShowButton,
  SimpleForm,
  SimpleShowLayout,
  TextField,
  TextInput,
} from 'react-admin'

interface Props {
  [propName: string]: any
}

interface PostRecord {
  record?: {
    title: string
  }
}

function PostFilter(props: Props) {
  return (
    <Filter {...props}>
      <TextInput label="Search" source="q" alwaysOn />
      <ReferenceInput label="User" source="userId" reference="users" allowEmpty>
        <SelectInput optionText="name" />
      </ReferenceInput>
    </Filter>
  )
}

export function PostList(props: Props) {
  return (
    <List {...props} filters={<PostFilter />}>
      <Datagrid>
        <TextField source="id" />
        <ReferenceField label="User" source="userId" reference="users">
          <TextField source="name" />
        </ReferenceField>
        <TextField source="title" />
        <EditButton />
        <ShowButton />
      </Datagrid>
    </List>
  )
}

function PostTitle({ record }: PostRecord) {
  return <span>Post {record ? `"${record.title}"` : ''}</span>
}

export function PostEdit(props: Props) {
  return (
    <Edit title={<PostTitle />} {...props}>
      <SimpleForm>
        <TextInput disabled source="id" />
        <ReferenceInput label="User" source="userId" reference="users">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="title" />
        <TextInput multiline source="body" />
      </SimpleForm>
    </Edit>
  )
}

export function PostCreate(props: Props) {
  return (
    <Create {...props}>
      <SimpleForm>
        <ReferenceInput label="User" source="userId" reference="users">
          <SelectInput optionText="name" />
        </ReferenceInput>
        <TextInput source="title" />
        <TextInput multiline source="body" />
      </SimpleForm>
    </Create>
  )
}

export function PostShow(props: Props) {
  return (
    <Show {...props}>
      <SimpleShowLayout>
        <TextField source="title" />
        <TextField source="teaser" />
        <RichTextField source="body" />
        <DateField label="Publication date" source="created_at" />
      </SimpleShowLayout>
    </Show>
  )
}
