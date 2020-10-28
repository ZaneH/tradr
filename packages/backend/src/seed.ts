import { prisma } from './context'
import { TOKENS } from '@tradr/common/constants'

// Seed the database
const main = async () => {
  await seedSupportedTokens()

  process.exit(0)
}

const seedSupportedTokens = async () => {
  Object.entries(TOKENS).map(async ([key, token]) => {
    await prisma.token.create({
      data: {
        symbol: token.symbol,
        contract: token.contract,
      },
    })

    console.log('[+] Seeded: ', key)
  })
}

main()
