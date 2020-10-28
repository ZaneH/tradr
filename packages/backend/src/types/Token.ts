import { objectType } from '@nexus/schema'

const Token = objectType({
  name: 'Token',
  definition(t) {
    t.model.id()
    t.model.contract()
    t.model.symbol()
  },
})

export default Token
