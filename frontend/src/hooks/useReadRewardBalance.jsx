import { useState, useContext, useEffect, useCallback } from "react"
import { WalletContext } from '@/contexts/WalletContext'
import { readContract } from '@wagmi/core'

import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

import { formatEther } from 'viem'

export const useReadRewardBalance = ({
  stakeSucceed,
  withdrawSucceed,
  claimRewardsSucceed
}) => {

  const { account, isConnected } = useContext(WalletContext)
  const [rewardBalance, setRewardBalance] = useState(0)

  const getRewardBalance =  useCallback(async () => {
    if (isConnected) {
      try {
        const data = await readContract({
          address: addresses.StakingRewards,
          abi: abiStakingRewards,
          functionName: 'rewardBalanceOf',
          args:[account]
        })
        setRewardBalance(formatEther(data))
      } catch (err) {
        console.log(err.message)
      }
    }
  }, [isConnected, account])

  useEffect(() => {
    getRewardBalance()
  }, [getRewardBalance, stakeSucceed, withdrawSucceed])

  return rewardBalance
}
