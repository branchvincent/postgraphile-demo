import { ApolloClient, InMemoryCache } from '@apollo/client'
import { useApolloClient } from '@apollo/react-hooks'
import { ApolloProvider } from '@apollo/react-hooks'
import pgDataProvider from 'ra-postgraphile'
import React, { useEffect, useState } from 'react'
import { Admin, LegacyDataProvider, Resource } from 'react-admin'

import Dashboard from './Dashboard'
import authProvider from './providers/auth'
import users from './resources/users'

// TODO: add headers from auth
const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
  cache: new InMemoryCache(),
})

function ReactAdminWrapper() {
  const [dataProvider, setDataProvider] = useState<LegacyDataProvider | null>(
    null,
  )
  const client = useApolloClient()

  useEffect(() => {
    ;(async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        <Resource name="users" {...users} />
      </Admin>
    )
  )
}

function App(): React.ReactElement {
  return (
    <ApolloProvider client={client}>
      <ReactAdminWrapper />
    </ApolloProvider>
  )
}

export default App
