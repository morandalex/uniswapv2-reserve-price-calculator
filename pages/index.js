import Connect from "../components/Connect";
import Contract from "../components/Contract";
// import App from 'next/app'
import Link from "next/link";

import { ChakraProvider, Box } from "@chakra-ui/react";

import { Provider, chain, defaultChains, developmentChains, defaultL2Chains } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'
import { providers } from 'ethers'
//import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
//import { WalletLinkConnector } from 'wagmi/connectors/walletLink'
// API key for Ethereum node



// Chains for connectors to support
const chains = [defaultL2Chains[2], defaultL2Chains[3]]
// Set up connectors
const connectors = ({ chainId }) => {
  const rpcUrl = chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ?? chain.mainnet.rpcUrls[0]


  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    /*  new WalletConnectConnector({
        options: {
          infuraId,
          qrcode: true,
        },
      }),
      new WalletLinkConnector({
        options: {
          appName: 'My wagmi app',
          jsonRpcUrl: `${rpcUrl}/${infuraId}`,
        },
      }),*/
  ]
}



// Use `chainId` to make ethers.js provider network-aware
const provider = ({ chainId }) => {


  return new providers.InfuraProvider(chainId, infuraId)
}

export default function IndexPage() {
  return (
    <>
      <ChakraProvider>
        <Provider autoConnect connectors={connectors} provider={provider}>
          <Box m='5'
            display='flex'
            flexDirection='column'
            justifyContent='center'
            alignItems='center'>

            <Box mb='20'>
              {
                // <Connect />
              }

            </Box>
            <Contract />
          </Box>
        </Provider>
      </ChakraProvider>

    </>
  );
}
