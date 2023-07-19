import { useState, useContext, useEffect, useCallback } from "react"
import { WalletContext } from '@/contexts/WalletContext'
import { readContract } from '@wagmi/core'

import { addresses } from '@/constants/addresses'
import abiStakingToken from '@/abis/contracts/StakingToken.sol/StakingToken.json'

export const useReadStakingTokensBalance = (stakeSucceed, withdrawSucceed) => {
  
  const { isConnected, account } = useContext(WalletContext)
  const [stakingTokensBalance, setStakingTokensBalance] = useState(0)
  
  const getStakingTokensBalance =  useCallback(async () => {
    if (isConnected) {
      try {
        const data = await readContract({
          address: addresses.StakingToken,
          abi: abiStakingToken,
          functionName: 'balanceOf',
          args:[account]
        })
        setStakingTokensBalance(data)
      } catch (err) {
        console.log(err.message)
      }
    }
  }, [isConnected, account])

  useEffect(() => {
    getStakingTokensBalance()
  }, [getStakingTokensBalance, stakeSucceed, withdrawSucceed])

  return stakingTokensBalance
}
