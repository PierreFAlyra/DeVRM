'use client'

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { hardhat, sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { ColorModeScript } from '@chakra-ui/react'

import theme from './theme'
import App from './pages/App'

export default function Providers({ children }) {
  
  const { chains, publicClient } = configureChains(
    [hardhat, sepolia],
    [publicProvider()]
  )
  
  const { connectors } = getDefaultWallets({
    appName: 'DeVRM',
    projectId: '343b2052aaac644063b8aa68292db12e',
    chains
  })
  
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient
  })  

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>    
        <CacheProvider>
          <ChakraProvider>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
          </ChakraProvider>
        </CacheProvider>
      </RainbowKitProvider>
    </WagmiConfig>        
  )
}

