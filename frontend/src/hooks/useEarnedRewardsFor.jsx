import { useState, useContext, useEffect, useCallback } from "react"
import { WalletContext } from '@/contexts/WalletContext'
import { readContract } from '@wagmi/core'

import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

import { formatEther } from 'viem'

export const useEarnedRewardsFor = () => {

  const { account, isConnected } = useContext(WalletContext)
  const [earnedRewards, setEarnedRewards] = useState(0)

  const earnedRewardsFor =  useCallback(async () => {
    if (isConnected) {
      try {
        const data = await readContract({
          address: addresses.StakingRewards,
          abi: abiStakingRewards,
          functionName: 'earnedRewardsFor',
          args:[account]
        })
        setEarnedRewards(formatEther(data))
      } catch (err) {
        console.log(err.message)
      }
    }
  }, [isConnected, account])

  useEffect(() => {
    const interval = setInterval(() => {
      earnedRewardsFor()
    }, 1000*30);
    
    return () => clearInterval(interval);
  }, [])

  return earnedRewards
}
