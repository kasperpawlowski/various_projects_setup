const hre = require('hardhat');

async function main() {
  const Contract = await hre.ethers.getContractFactory('contracts/land/LANDRegistry.sol:LANDRegistry');
  const contract = await (await Contract.deploy()).deployed();

  console.log('LANDRegistry contract deployed to:', contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
