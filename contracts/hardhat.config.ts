import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('dotenv').config();

// console.log("API_URL", process.env.API_URL);

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    // mumbai: {
    //   url: "",
    //   accounts: [`0x${PRIVATE_KEY}`]
    // }
    // goerli: {
    //   url: process.env.API_URL,
    //   accounts: [`0x${process.env.PRIVATE_KEY}`]
    // }
  }
};

export default config;
