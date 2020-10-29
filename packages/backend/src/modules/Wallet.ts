import Web3 from 'web3'

/**
 * Check if the required environment variables are present.
 * Load them with dotenv if they're missing.
 */
const checkEnvironment = () => {
  if (!process.env.ETH_PRIVATE_KEY || !process.env.INFURA_API_KEY) {
    require('dotenv').config()
  }
}

/**
 * Return a new/get the old Web3 instance
 */
const _web3 = () => {
  if (web3) {
    return web3
  }

  checkEnvironment()

  return new Web3(
    process.env.NODE_ENV === 'production'
      ? `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
      : `wss://ropsten.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
  )
}

/**
 * Backing variable for Web3.
 */
export const web3: Web3 = _web3()

/**
 * Initialize an ETH wallet from environment variables.
 */
const envWallet = () => {
  checkEnvironment()
  return web3.eth.accounts.wallet.add(process.env.ETH_PRIVATE_KEY!)
}

/**
 * The ETH wallet (never exported)
 */
const wallet = envWallet()

/**
 * Get the address of the ETH wallet.
 */
export const getAddress = () => {
  return wallet.address
}
