import React from 'react'
import ReactDOM from 'react-dom'
import ListPage from './pages/Post/ListPage'
import CreatePage from './pages/Post/CreatePage'
import DetailPage from './pages/Post/DetailPage'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import 'tachyons'
import './index.css'

const httpLink = new HttpLink({ uri: 'http://localhost:4000/graphql' })

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <div>
        <Route exact path='/post-app' component={ListPage} />
        <Route path='/post-app/create' component={CreatePage} />
        <Route path='/post-app/post/:_id' component={DetailPage} />
      </div>
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)
