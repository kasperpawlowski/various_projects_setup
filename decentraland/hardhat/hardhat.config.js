require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
 module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.24",
        settings: {
         optimizer: {
           enabled: true,
           runs: 999999
         },
         evmVersion: "byzantium", 
         outputSelection: {
          "*": {
            "": [
              "ast"
            ],
            "*": [
              "evm.bytecode.object",
              "evm.deployedBytecode.object",
              "abi",
              "evm.bytecode.sourceMap",
              "evm.deployedBytecode.sourceMap",
              "metadata"
            ]
          },
        }
        }
      }
    ]
  },
  networks: {
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`,
      accounts: [`${process.env.PRIVATE_KEY}`]
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_KEY
  }
};
