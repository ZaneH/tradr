import { objectType } from '@nexus/schema'

const Watcher = objectType({
  name: 'Watcher',
  definition(t) {
    t.model.id()
  },
})

export default Watcher
