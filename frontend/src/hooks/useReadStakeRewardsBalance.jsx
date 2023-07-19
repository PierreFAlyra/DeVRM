import { useState, useContext, useEffect, useCallback } from "react"
import { WalletContext } from '@/contexts/WalletContext'
import { readContract } from '@wagmi/core'

import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export const useReadStakeRewardsBalance = (stakeSucceed, withdrawSucceed) => {

  const { account, isConnected } = useContext(WalletContext)
  const [stakeRewardsBalance, setStakeRewardsBalance] = useState(0)

  const getStakeBalance =  useCallback(async () => {
    if (isConnected) {
      try {
        const data = await readContract({
          address: addresses.StakingRewards,
          abi: abiStakingRewards,
          functionName: 'stakeBalanceOf',
          args:[account]
        })
        setStakeRewardsBalance(data)
      } catch (err) {
        console.log(err.message)
      }
    }
  }, [isConnected, account])

  useEffect(() => {
    getStakeBalance()
  }, [getStakeBalance, stakeSucceed, withdrawSucceed])

  return stakeRewardsBalance
}
