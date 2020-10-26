import {
  ChainId,
  Fetcher,
  Pair,
  Route,
  Token,
  TokenAmount,
  WETH,
} from '@uniswap/sdk'
import { provider } from '..'

interface ITradeInfo {
  fromToken: Token
  toToken: Token
  pair: Pair
}

export const getTradeInfo = async (
  fromContract: string,
  toContract: string
): Promise<ITradeInfo> => {
  const fromToken = new Token(ChainId.MAINNET, fromContract, 18)
  const toToken = new Token(ChainId.MAINNET, toContract, 18)

  const pair = await Fetcher.fetchPairData(fromToken, toToken, provider)

  return {
    fromToken,
    toToken,
    pair,
  }
}
