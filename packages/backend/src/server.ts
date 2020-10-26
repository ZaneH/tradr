import { GraphQLServer } from 'graphql-yoga'
import { createContext } from './context'
import { schema } from './schema'

require('dotenv').config()

new GraphQLServer({
  schema,
  context: createContext,
}).start(async () => {
  console.log(`🚀 Server ready at: http://localhost:4000`)
})
