<img src="https://i.imgur.com/7ANBiRp.png" align="right" height="128px" width="128px">

# Tradr (Incomplete)
This is built to be an open-source bot to watch Uniswap and make trades based on set critera.

# Requirements
- [ ] Docker
- [ ] Node.js
- [ ] yarn

# Todo
- [ ] Fix an issue with making the trade ([Stackoverflow](https://stackoverflow.com/questions/64583374/issue-encoding-array-of-addresses-for-web3))
- [ ] Allow the maximum gas price to be adjusted
- [ ] Allow the slippage tolerance to be adjusted

# Setup
Simply clone the repo and run `./start.sh`. If everything succeeds, you'll be able to run the servers on your machine.

## Run development servers (Ropsten)
Open 2 instances of your Terminal
- Run `yarn dev` in ./packages/backend
- Run `yarn start` in ./packages/web

## Run production servers (Mainnet)
(Coming soon)

# License
GPL v3

<img src="https://i.imgur.com/sFV78Mu.png" />
