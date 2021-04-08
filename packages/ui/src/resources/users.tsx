import { Theme, useMediaQuery } from '@material-ui/core'
import { Datagrid, EmailField, List, SimpleList, TextField } from 'react-admin'

export function UserList(props: object) {
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))

  return (
    <List title="All users" {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.name}
          secondaryText={(record) => record.username}
          tertiaryText={(record) => record.email}
        />
      ) : (
        <Datagrid>
          <TextField source="id" />
          <TextField source="name" />
          <TextField source="username" />
          <EmailField source="email" />
        </Datagrid>
      )}
    </List>
  )
}
