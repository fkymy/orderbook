import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

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
  }
};

export default config;
