import { useState, useContext, useEffect, useCallback } from "react"
import { WalletContext } from '@/contexts/WalletContext'
import { readContract } from '@wagmi/core'

import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export const useReadStakeBalance = () => {
  const [stakeBalance, setStakeBalance] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const { account, isConnected } = useContext(WalletContext)

  const getStakeBalance =  useCallback(async () => {
    if (isConnected) {
      try {
        const data = await readContract({
          address: addresses.StakingRewards,
          abi: abiStakingRewards,
          functionName: 'stakeBalanceOf',
          args:[account]
        })
        setStakeBalance(data)
        setIsSuccess(true)
      } catch (err) {
        setIsSuccess(false)
        console.log(err.message)
      }
    }
  }, [isConnected, account])

  useEffect(() => {
    getStakeBalance()
  }, [getStakeBalance])

  return { stakeBalance, isSuccess }
}
