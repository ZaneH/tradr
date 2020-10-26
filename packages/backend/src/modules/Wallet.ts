import Web3 from 'web3'

export const web3 = new Web3(
  process.env.NODE_ENV === 'production'
    ? `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
    : `wss://ropsten.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
)

const envWallet = () => {
  if (!process.env.ETH_PRIVATE_KEY) {
    require('dotenv').config()
  }

  const _wallet = web3.eth.accounts.wallet.add(process.env.ETH_PRIVATE_KEY!)
  console.log(_wallet)
  return _wallet
}

const wallet = envWallet()

export const getAddress = () => {
  return wallet.address
}
