import { GraphQLClient } from 'graphql-request'

import { getSdk, Sdk } from '../client'

interface LoginCredentials {
  username: string
  password: string
}

interface APIResponse {
  status: number
}

class Auth {
  sdk: Sdk

  constructor() {
    const client = new GraphQLClient('http://localhost:3000/graphql')
    this.sdk = getSdk(client)
  }

  async login({ username, password }: LoginCredentials): Promise<void> {
    const { authenticate } = await this.sdk.Authenticate({ username, password })
    const { jwtToken } = authenticate ?? {}
    if (!jwtToken) {
      localStorage.removeItem('jwt')
      throw Error('Either username or password incorrect')
    }
    localStorage.setItem('jwt', jwtToken)
  }

  async logout(): Promise<void> {
    localStorage.removeItem('jwt')
  }

  // called when the API returns an error
  checkError({ status }: APIResponse) {
    if (status === 401 || status === 403) {
      localStorage.removeItem('jwt')
      return Promise.reject()
    }
    return Promise.resolve()
  }

  // called when the user navigates to a new location, to check for authentication
  async checkAuth() {
    if (!localStorage.getItem('jwt')) {
      throw Error('Unauthorized')
    }
  }

  // called when the user navigates to a new location, to check for permissions / roles
  async getPermissions() {}
}

export default new Auth()
