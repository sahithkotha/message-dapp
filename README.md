# Message DApp

A decentralized messaging application built with Ethereum, Truffle, and React.

## Features

- Send and receive messages on the Ethereum blockchain
- Real-time message updates
- MetaMask integration
- Clean and modern UI

## Tech Stack

- Solidity (Smart Contracts)
- Truffle Framework
- React.js
- Web3.js
- MetaMask
- Ganache (Local blockchain)

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/sahithkotha/message-dapp.git
cd message-dapp
```

2. Install dependencies:
```bash
# Install Truffle dependencies
cd truffle
npm install

# Install React client dependencies
cd ../client
npm install
```

3. Start Ganache:
- Open Ganache GUI
- Create a new workspace
- Configure network (PORT: 8545, NETWORK ID: 1337)

4. Deploy smart contracts:
```bash
cd truffle
truffle migrate --reset
```

5. Start the React client:
```bash
cd client
npm start
```

6. Configure MetaMask:
- Network Name: Localhost 8545
- RPC URL: http://127.0.0.1:8545
- Chain ID: 1337
- Currency Symbol: ETH

## Usage

1. Connect your MetaMask wallet
2. Send messages using the input field
3. View messages in real-time

## License

MIT

<h1 align="center">Message Dapp</h1>

> A simple full-stack dapp that writes messages to the Ethereum blockchain. You will learn the whole process of developing a decentralized application.

<div align="center">
  Website: https://message-dapp.on.fleek.co/
</div>

<div align="center">
  <img src="https://github.com/akhileshthite/msg-dapp/blob/main/demo.gif" />
</div>

## Contract
  https://rinkeby.etherscan.io/address/0x285594f491fDb7a204EBBB26bC095e69F4BA6914

## Development
### Installation & setup
This dapp is created by using truffle dev environment (`truffle unbox react` command). Truffle box comes with everything you need to start using Truffle to write, compile, test, and deploy smart contracts, and interact with them from a React app.

Make sure you have truffle installed on your computer.
```sh
# Install Truffle globally
npm install -g truffle
```
```sh
# Install truffle dependencies in root directory (./msg-dapp)
npm install
```

Ensure you create an `.env` file in `./truffle/` directory. Then to access the Ethereum network/node, create a project on [infura](https://infura.io/) and copy-paste the `infura project-id url` in `.env` with a variable name or `INFURA_RINKEBY` (contracts of this dapp is deployed to rinkeby testnet).
```sh
INFURA_RINKEBY=https://rinkeby.infura.io/v3/YOUR_PROJECT_ID
```

Paste the 12 word Secret Recovery Phrase of your (preferably newly generated and testnet-only) MetaMask wallet in `.env` with the variable name `MNEMONIC`. This will be loaded by truffle at runtime, and the environment variable can then be accessed with `process.env.MNEMONIC`.

```sh
MNEMONIC=for example put your twelve word BIP39 secret recovery phrase here
```

OR

To develop on ganache blockchain, open ganache and import the accounts by adding your ganache private keys in MetaMask.

```sh
$ ganache-cli
```

### Deployment
To deploy the smart contracts on blockchain networks, follow the given truffle command below.

```sh
# truffle migrate --network NETWORK_NAME
truffle migrate --network rinkeby

# --reset: Run all migrations from the beginning, instead of running from the last completed migration.

```
This will generate [ABI](https://docs.soliditylang.org/en/v0.8.13/abi-spec.html#:~:text=The%20Contract%20Application%20Binary%20Interface,as%20described%20in%20this%20specification.) in `./client/contracts/`. For more information, read [truffle docs](https://trufflesuite.com/docs/truffle/).

### React client
Start react app.

```sh
# cd into client directory
cd client

# Install dependencies
npm install

# Start the app
npm start
Starting the development server...
```

## License
msg-dapp is licensed under the [GPL-3.0 license](https://github.com/akhileshthite/msg-dapp/blob/main/LICENSE).

<hr>
Don't forget to leave a star ⭐️
