import { TOKENS } from '../../../common/constants'

/**
 * Get the ticker symbol based on the contract address.
 * This only works on supported tokens
 * @param address The Token contract address (Checksummed)
 */
export const getSymbolFromAddress = (address: string): string => {
  const tokenKeys = Object.keys(TOKENS)
  for (let i = 0; i < tokenKeys.length; i++) {
    const token = Object.values(TOKENS)[i]
    if (token.address === address) {
      return token.symbol
    }
  }

  throw new Error('getSymbolFromAddress(...): Token not supported')
}
