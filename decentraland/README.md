# Decentraland - how to deploy the land smart contract

Prerequisites:
1. installed metamask or another wallet with test ETH on ropsten -> https://ropsten.oregonctf.org/eth
2. infura key -> https://infura.io/
3. etherscan key, if one wanted their contract to be verified on etherscan -> https://etherscan.io/login

Steps:
1. clone this repository
```
git clone https://github.com/kasperpawlowski/various_projects_setup.git
cd various_projects_setup/decentraland
```
2. clone the decentraland repository
```
git clone https://github.com/decentraland/land.git
```
3. install necessary dependencies
IMPORTANT:
the land registry contract to have its full functionality requires deployment of estate registry contract and binding the contracts together. however, the estate registry contract contrains references to old open zeppelin repositories and node packages that are deprecated and no longer supported. its not even possible to install them using the node package manager therefore the estate registry contract should be ported to the newer version of referenced software. for now, let's remove the estate registry package so that the compilation of the rest of the project is successful.
```
cd hardhat
npm install
mv .env.example .env
cp -r ../land/contracts ./contracts
rm ./contracts/estate/EstateRegistry.sol
```
5. paste your own infura and private key in the .env file
6. compile the contracts
```
npx hardhat compile
```
7. deploy the contracts to the ropsten tesnet
```
npx hardhat run scripts/deploy.js --network ropsten
```
8. if one wants, verify the smart contract on etherscan. take the address from the console as displayed
```
npx hardhat verify "PASTE THE ADDRESS HERE, REMOVE THE QUOTES" --network ropsten
```
9. go to https://ropsten.etherscan.io to play with the contract


Refer to https://github.com/decentraland/land for more information.