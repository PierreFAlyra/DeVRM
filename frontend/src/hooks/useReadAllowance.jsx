

import { useState, useContext, useEffect, useCallback } from "react"
import { WalletContext } from '@/contexts/WalletContext'
import { readContract } from '@wagmi/core'

import { addresses } from '@/constants/addresses'
import abiStakingToken from '@/abis/contracts/StakingToken.sol/StakingToken.json'

import { formatEther } from 'viem'

export const useReadAllowance = (approveSucceed, approveFailed, stakeSucceed, setAllowance) => {

  const { account, isConnected } = useContext(WalletContext)

  const getAllowance =  useCallback(async () => {
    if (isConnected) {
      try {
        const data = await readContract({
          address: addresses.StakingToken,
          abi: abiStakingToken,
          functionName: 'allowance',
          args: [account, addresses.StakingRewards]
        })
        setAllowance(formatEther(data))
      } catch (err) {
        console.log(err.message)
      }
    }
  }, [isConnected, account])

  useEffect(() => {
    getAllowance()
  }, [getAllowance, approveSucceed, approveFailed, stakeSucceed, account, isConnected])
}
