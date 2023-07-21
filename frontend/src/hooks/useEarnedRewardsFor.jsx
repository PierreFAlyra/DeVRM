import { useState, useContext, useEffect, useCallback } from "react"
import { WalletContext } from '@/contexts/WalletContext'
import { readContract } from '@wagmi/core'

import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

import { formatEther } from 'viem'

export const useEarnedRewardsFor = (address) => {

  const { isConnected } = useContext(WalletContext)
  const [earnedRewards, setEarnedRewards] = useState(0)

  const earnedRewardsFor =  useCallback(async () => {
    if (isConnected) {
      try {
        const data = await readContract({
          address: addresses.StakingRewards,
          abi: abiStakingRewards,
          functionName: 'earnedRewardsFor',
          args:[address]
        })
        setEarnedRewards(formatEther(data))
      } catch (err) {
        console.log(err.message)
      }
    }
  }, [isConnected, address])

  useEffect(() => {
    earnedRewardsFor()
  }, [earnedRewardsFor])

  return earnedRewards
}
