import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client'
import preset from '@rebass/preset'
import { setContext } from 'apollo-link-context'
import { ThemeProvider } from 'emotion-theming'
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Routes from './constants/Routes'
import { HomePage } from './pages'

const theme = {
  ...preset,
  colors: {
    background: '#FFFFFC',
    clear: 'rgba(0, 0, 0, 0)',
    text: '#000',
    primary: '#FF3F00',
    lightText: '#fff',
    gray: '#f7f7fc',
  },
  buttons: {
    primary: {
      fontSize: 2,
      px: '18px',
      py: '10px',
      boxShadow: 'smallColor',
      borderRadius: 'default',
      color: 'default',
      cursor: 'pointer',
    },
    larger: {
      px: '26px',
      py: '14px',
      fontWeight: 'bold',
      boxShadow: 'smallColor',
      borderRadius: 'default',
      fontSize: 2,
      cursor: 'pointer',
    },
    outline: {
      borderRadius: 'circle',
      padding: '1 4',
      bg: 'clear',
      color: 'primary',
      border: '2px solid',
      borderColor: 'primary',
      cursor: 'pointer',
      ':hover': {
        bg: 'primary',
        color: 'lightText',
      },
    },
    subtle: {
      bg: 'clear',
      color: 'primary',
      cursor: 'pointer',
    },
    default: {
      color: 'lightText',
    },
  },
  variants: {
    card: {
      borderRadius: 'default',
      boxShadow: 'smallGray',
    },
    info: {
      px: 4,
      py: 3,
      bg: 'gray',
      borderRadius: 'default',
      fontFamily: 'body',
    },
  },
  fontWeights: {
    heading: 700,
    bold: 700,
  },
  text: {
    h3: {
      fontWeight: 400,
      fontSize: 3,
    },
  },
  shadows: {
    smallColor: '1px 3px 8px 0px rgba(255, 63, 0, 0.20)',
    smallGray: '1px 2px 6px 0px rgba(0, 0, 0, 0.08)',
  },
  fonts: {
    body: 'Inter, sans-serif',
    heading: 'Inter, sans-serif',
  },
  radii: {
    default: '8px',
    circle: 99999,
  },
}

const cache = new InMemoryCache()
const link = createHttpLink({
  uri: `${process.env.REACT_APP_BACKEND_ENDPOINT}`,
})

const client = new ApolloClient({
  cache,
  link: link,
  name: 'tradr',
  version: '1.0',
  defaultOptions: {
    mutate: {
      errorPolicy: 'all',
    },
  },
})

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Switch>
              <Route path={Routes.home}>
                <HomePage />
              </Route>
            </Switch>
          </Router>
        </div>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
