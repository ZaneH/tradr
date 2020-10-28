import { getDefaultProvider } from '@ethersproject/providers'
import { GraphQLServer } from 'graphql-yoga'
import { createContext } from './context'
import { beginMarketWatch } from './modules/Watcher'
import { schema } from './schema'

require('dotenv').config()

export const provider = getDefaultProvider('homestead', {
  etherscan: process.env.ETHERSCAN_API_KEY,
})

new GraphQLServer({
  schema,
  context: createContext,
}).start(async () => {
  console.log(`🚀 Server ready at: http://localhost:4000`)

  beginMarketWatch()
})
