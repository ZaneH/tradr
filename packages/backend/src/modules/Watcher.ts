import { Price } from '@uniswap/sdk'
import { CronJob } from 'cron'
import { prisma } from '../context'
import { CConsole } from './CConsole'
import { getTradeInfo, makeTrade } from './Trades'

const marketCron = new CronJob('35 * * * * *', () => {
  checkMarket()
})

/**
 * Setup the market watcher.
 */
export const beginMarketWatch = () => {
  CConsole.green('[+]', 'Started market watch')
  marketCron.start()
}

/**
 * Get all of the active market watchers.
 */
const activeWatchers = async () => {
  const watchers = await prisma.watcher.findMany({
    where: {
      isActive: true,
    },
  })

  return watchers
}

/**
 * Check the market for valid watcher trades.
 */
const checkMarket = async () => {
  CConsole.yellow('[~]', 'Checking...')

  const watchers = await activeWatchers()

  // loop through each active watcher
  watchers.map(async (watcher) => {
    if (!watcher) return

    // get the token data for the watcher
    const _watcher = await prisma.watcher.findOne({
      where: {
        id: watcher.id,
      },
      include: {
        fromToken: true,
        toToken: true,
      },
    })

    const fromToken = _watcher!.fromToken
    const toToken = _watcher!.toToken
    const fromAmount = _watcher!.fromAmount
    const toAmount = _watcher!.toAmount

    // get the price data for the token pair
    const tradeInfo = await getTradeInfo(fromToken?.contract, toToken?.contract)

    // note: invert the _fromTokenPrice for the _toTokenPrice
    // ensure _fromTokenPrice is the right token
    const _fromTokenPrice =
      tradeInfo.pair.token0.address === fromToken.contract
        ? tradeInfo.pair.token0Price
        : tradeInfo.pair.token1Price

    // log 1 FROM = y TO
    CConsole.green(
      '[!]',
      `1 ${fromToken.symbol} = ${_fromTokenPrice.toSignificant()} ${
        toToken.symbol
      }`
    )

    // log Watcher
    CConsole.green(
      '[!]',
      `Looking to swap ${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`
    )

    // check if the price meets the requirements, return a percentage for the desired trade
    const percentage = checkPrice(fromAmount, toAmount, _fromTokenPrice)
    if (percentage >= 1) {
      CConsole.green(
        `[+] Trade found (${(percentage * 100).toFixed(2)}%).`,
        `${fromAmount} ${fromToken.symbol} for ${toAmount} ${toToken.symbol}`
      )

      makeTrade(fromAmount, toAmount)
    }
  })
}

/**
 * Return 0 - 1+, at >=1, the check passes
 * @param fromAmount The amount of the from token
 * @param toAmount The amount of the to token
 * @param fromTokenPrice The Price object for the from token
 */
const checkPrice = (
  fromAmount: number,
  toAmount: number,
  fromTokenPrice: Price
) => {
  const fromValue = fromAmount * Number(fromTokenPrice.toSignificant())
  const toValue = toAmount * Number(fromTokenPrice.invert().toSignificant())

  const percentage = fromValue / toValue
  return percentage / 100
}
