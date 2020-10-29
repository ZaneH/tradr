import { ChainId, Fetcher, Pair, Token } from '@uniswap/sdk'
import moment from 'moment'
import { provider } from '../server'
import { CConsole } from './CConsole'
import { getAddress, web3 } from './Wallet'

interface ITradeInfo {
  fromToken: Token
  toToken: Token
  pair: Pair
}

export const getTradeInfo = async (
  fromContract: string,
  toContract: string
): Promise<ITradeInfo> => {
  const chain =
    process.env.NODE_ENV === 'production' ? ChainId.MAINNET : ChainId.ROPSTEN
  const fromToken = new Token(chain, fromContract, 18)
  const toToken = new Token(chain, toContract, 18)

  const pair = await Fetcher.fetchPairData(fromToken, toToken, provider)

  return {
    fromToken,
    toToken,
    pair,
  }
}

const uniswapTrade = async (fromWei: string, toWei: string) => {
  // prepare for Uniswap trade
  const gasPrice = await web3.eth.getGasPrice()
  const gasEstimate = await web3.eth.estimateGas({ from: getAddress() })
  const deadline = moment(Date.now()).add(20, 'minutes').unix().toString()

  const abi = web3.eth.abi.encodeFunctionCall(
    {
      type: 'function',
      name: 'swapExactTokensForTokens',
      inputs: [
        {
          name: 'amountIn',
          type: 'uint256',
        },
        {
          name: 'amountOutMin',
          type: 'uint256',
        },
        {
          name: 'path',
          type: 'address[]',
        },
        {
          name: 'to',
          type: 'address',
        },
        {
          name: 'deadline',
          type: 'uint256',
        },
      ],
    },
    [
      fromWei,
      toWei,
      web3.eth.abi.encodeParameter('address[]', [
        '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        '0x20fe562d797a42dcb3399062ae9546cd06f63280',
      ]),
      getAddress(),
      deadline,
    ]
  )

  console.log(abi)

  const tradeTx = await web3.eth
    .sendTransaction({
      gasPrice,
      chainId:
        process.env.NODE_ENV === 'production'
          ? ChainId.MAINNET
          : ChainId.ROPSTEN,
      from: getAddress(),
      to: '0x7a250d5630b4cf539739df2c5dacb4c659f2488d', // uniswap router
      value: 0,
      gas: gasEstimate,
      data: abi,
    })
    .on('transactionHash', (tx) => {
      CConsole.yellow('[!]', `Broadcasting: ${tx}`)
    })
    .catch((e) => {
      CConsole.red('[!]', e)
    })

  console.log(tradeTx)
}

export const makeTrade = async (fromAmount: number, minToAmount: number) => {
  const fromInWei = web3.utils.toWei(fromAmount.toString())
  const minToInWei = web3.utils.toWei(minToAmount.toString())

  uniswapTrade(fromInWei, minToInWei)
}
