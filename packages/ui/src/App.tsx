import { ApolloClient, InMemoryCache } from '@apollo/client'
import { useApolloClient } from '@apollo/react-hooks'
import { ApolloProvider } from '@apollo/react-hooks'
import PostIcon from '@material-ui/icons/Book'
import UserIcon from '@material-ui/icons/Group'
import pgDataProvider from 'ra-postgraphile'
import React, { useEffect, useState } from 'react'
import { Admin, LegacyDataProvider, ListGuesser, Resource } from 'react-admin'

import Dashboard from './Dashboard'
import authProvider from './providers/auth'
import { PostCreate, PostEdit, PostList, PostShow } from './resources/posts'
import { ToDoList } from './resources/todos'
import { UserList } from './resources/users'

function ReactAdminWrapper() {
  const [dataProvider, setDataProvider] = useState<LegacyDataProvider | null>(
    null,
  )
  const client = useApolloClient()

  useEffect(() => {
    ;(async () => {
      const dataProvider = await pgDataProvider(client as any)
      setDataProvider(() => dataProvider)
    })()
  }, [client])

  return (
    dataProvider && (
      <Admin
        dashboard={Dashboard}
        authProvider={authProvider}
        dataProvider={dataProvider}
      >
        <Resource
          name="posts"
          icon={PostIcon}
          list={PostList}
          edit={PostEdit}
          create={PostCreate}
          show={PostShow}
        />
        <Resource name="users" icon={UserIcon} list={UserList} />
        <Resource name="todos" icon={UserIcon} list={ToDoList} />
        <Resource name="comments" list={ListGuesser} />
      </Admin>
    )
  )
}

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
})

function App() {
  return (
    <ApolloProvider client={client}>
      <ReactAdminWrapper />
    </ApolloProvider>
  )
}

export default App
