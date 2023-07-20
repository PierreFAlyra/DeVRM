"use client"
import './globals.css'
import { Inter } from 'next/font/google'

import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  hardhat,
  sepolia
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import { ChakraProvider } from '@chakra-ui/react'

import { WalletProvider } from '@/contexts/WalletContext'

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
  autoConnect: false,
  connectors,
  publicClient
})

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <ChakraProvider>
              <WalletProvider>        
                {children}
              </WalletProvider>
            </ChakraProvider>
          </RainbowKitProvider>
        </WagmiConfig>
      </body>
    </html>
  )
}
