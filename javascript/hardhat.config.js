require("@nomicfoundation/hardhat-toolbox");
// Import and configure dotenv
require("dotenv").config();


module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: process.env.STAGING_QUICKNODE_KEY,
      accounts:[process.env.PRIVATE_KEY],
    },
    mainnet: {
      url: process.env.PROD_QUICKNODE_KEY,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
  paths: {
    sources: "./contracts",
  }
};
