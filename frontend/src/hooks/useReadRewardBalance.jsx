import { useState, useContext, useEffect, useCallback } from "react"
import { WalletContext } from '@/contexts/WalletContext'
import { readContract } from '@wagmi/core'

import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export const useReadRewardBalance = () => {
  const [rewardBalance, setRewardBalance] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const { account, isConnected } = useContext(WalletContext)

  const getRewardBalance =  useCallback(async () => {
    if (isConnected) {
      try {
        const data = await readContract({
          address: addresses.StakingRewards,
          abi: abiStakingRewards,
          functionName: 'rewardBalanceOf',
          args:[account]
        })
        setRewardBalance(data)
        setIsSuccess(true)
      } catch (err) {
        setIsSuccess(false)
        console.log(err.message)
      }
    }
  }, [isConnected, account])

  useEffect(() => {
    getRewardBalance()
  }, [getRewardBalance])

  return { rewardBalance, isSuccess }
}
