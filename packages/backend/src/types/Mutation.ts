import { booleanArg, floatArg, idArg, mutationType } from '@nexus/schema'

const Mutation = mutationType({
  definition(t) {
    /**
     * Create a Watcher to watch for a trade.
     */
    t.field('createWatcher', {
      type: 'Watcher',
      args: {
        fromTokenAmount: floatArg({ nullable: false }),
        toTokenAmount: floatArg({ nullable: false }),
        fromTokenId: idArg({ nullable: false }),
        toTokenId: idArg({ nullable: false }),
      },
      resolve: (root, args, ctx) => {
        return ctx.prisma.watcher.create({
          data: {
            fromAmount: args.fromTokenAmount,
            toAmount: args.toTokenAmount,
            fromToken: {
              connect: {
                id: args.fromTokenId,
              },
            },
            toToken: {
              connect: {
                id: args.toTokenId,
              },
            },
          },
        })
      },
    })

    /**
     * Set the isActive property on a Watcher.
     */
    t.field('setActiveWatcher', {
      type: 'Watcher',
      args: {
        id: idArg({ nullable: false }),
        active: booleanArg({ nullable: false }),
      },
      resolve: (root, { id, active }, ctx) => {
        return ctx.prisma.watcher.update({
          where: {
            id,
          },
          data: {
            isActive: active,
          },
        })
      },
    })
  },
})

export default Mutation
