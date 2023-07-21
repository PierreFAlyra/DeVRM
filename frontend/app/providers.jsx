'use client';

import * as React from 'react';
import { WalletProvider } from '@/contexts/WalletContext'
import { ChakraProvider } from '@chakra-ui/react'
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  hardhat,
  sepolia
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [
    hardhat,
    sepolia
  ],
  [publicProvider()]
);

const projectId = '9e76334d46197c1103b32171f5c8eaf9';

const { connectors } = getDefaultWallets({
  appName: 'DeVRM',
  projectId,
  chains,
});

const demoAppInfo = {
  appName: 'DeVRM',
};

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient
});

export function Providers({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        <ChakraProvider>
          <WalletProvider>
            {mounted && children}
          </WalletProvider>
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
