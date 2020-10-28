import { getDefaultProvider } from '@ethersproject/providers'
import { TOKENS } from '../../common/constants'
import { getSymbolFromAddress } from './modules/Symbols'
import { getTradeInfo } from './modules/Trades'

// Just testing stuff. Safely ignore this file.
export const provider = getDefaultProvider('homestead', {
  etherscan: process.env.ETHERSCAN_API_KEY,
})

async function main() {
  const tradeInfo = await getTradeInfo(
    TOKENS.DEUS.contract,
    TOKENS.WETH.contract
  )

  console.log('Found pair ---')
  console.log(
    `1 ${getSymbolFromAddress(
      tradeInfo.fromToken.address
    )} = ${tradeInfo.pair.token0Price.toSignificant()} ${getSymbolFromAddress(
      tradeInfo.toToken.address
    )}`
  )
}

main()
