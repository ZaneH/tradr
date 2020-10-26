import { floatArg, mutationType } from '@nexus/schema'

const Mutation = mutationType({
  definition(t) {
    t.field('createWatch', {
      type: 'Watcher',
      args: {
        token0Amount: floatArg({ nullable: false }),
      },
      resolve: (root, { token0Amount }, ctx) => {
        return ctx.prisma.watcher.create({
          data: {
            fromAmount: token0Amount,
          },
        })
      },
    })
  },
})

export default Mutation
