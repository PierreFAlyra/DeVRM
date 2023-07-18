import { createContext, useState } from 'react';
import { useAccount, useBalance } from 'wagmi'


export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  
  const { address:account, isConnected } = useAccount()
  const { data:balance } = useBalance({address: account})

  const contextValue = {
    account,
    isConnected,
    balance
  }

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  )
}
