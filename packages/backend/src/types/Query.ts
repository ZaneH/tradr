import { queryType } from '@nexus/schema'
import { getAddress } from '../modules/Wallet'

const Query = queryType({
  definition(t) {
    t.string('getAddress', {
      nullable: true,
      resolve: (root, args, ctx) => {
        // const address = getAddress()
        // return address

        return null
      },
    })
  },
})

export default Query
