import dotenv from "dotenv";
dotenv.config(); // load env vars from .env
import { task, HardhatUserConfig } from "hardhat/config";
import "@nomiclabs/hardhat-waffle";
import "./tasks/index";

const { GOERLI_URL, MNEMONIC } = process.env;

if (!GOERLI_URL)
    throw new Error(
        `GOERLI_URL env var not set. Copy .env.template to .env and set the env var`
    );
if (!MNEMONIC)
    throw new Error(
        `MNEMONIC env var not set. Copy .env.template to .env and set the env var`
    );

const accounts = {
    // derive accounts from mnemonic, see tasks/create-key
    mnemonic: MNEMONIC,
};

// Go to https://hardhat.org/config/ to learn more
const config: HardhatUserConfig = {
    solidity: {
        compilers: [
            // old ethernaut compilers
            { version: "0.5.0" },
            { version: "0.6.0" },
            { version: "0.7.3" },
        ],
    },
    networks: {
        goerli: {
            url: GOERLI_URL,
            accounts,
        },
        hardhat: {
            accounts,
            forking: {
                url: GOERLI_URL, // https://eth-rinkeby.alchemyapi.io/v2/SECRET`,
            },
        },
    },
    mocha: {
        timeout: 300 * 1e3,
    },
};

export default config;
