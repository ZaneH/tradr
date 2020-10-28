import { objectType } from '@nexus/schema'

const Watcher = objectType({
  name: 'Watcher',
  definition(t) {
    t.model.id()
    t.model.isActive()
    t.model.fromAmount()
    t.model.fromToken()
    t.model.toAmount()
    t.model.toToken()
  },
})

export default Watcher
