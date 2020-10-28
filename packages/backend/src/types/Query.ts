import { queryType } from '@nexus/schema'
import { getAddress } from '../modules/Wallet'

const Query = queryType({
  definition(t) {
    /**
     * Returns the address of the active ETH wallet.
     */
    t.string('getAddress', {
      resolve: (root, args, ctx) => {
        const address = getAddress()
        return address
      },
    })

    /**
     * Queries for all available Token rows.
     * Supported tokens are specified in seed data.
     */
    t.field('getSupportedTokens', {
      type: 'Token',
      list: true,
      resolve: (root, args, ctx) => {
        return ctx.prisma.token.findMany()
      },
    })

    /**
     * Query for all of the Watchers.
     */
    t.field('getWatchers', {
      type: 'Watcher',
      list: true,
      resolve: (root, args, ctx) => {
        return ctx.prisma.watcher.findMany()
      },
    })
  },
})

export default Query
