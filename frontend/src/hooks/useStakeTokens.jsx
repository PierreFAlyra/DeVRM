import { useState, useCallback } from "react"

import { parseEther } from 'viem'

import { useContractWrite } from 'wagmi'

import { useReadAllowance } from '@/hooks/useReadAllowance'

import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'
import abiStakingToken from '@/abis/contracts/StakingToken.sol/StakingToken.json'

export const useStakeTokens = (amount, allowance) => {

  const { write: approve, isSuccess: approveSucceed, isError: approveFailed, data: approveData } = useContractWrite({
    address: addresses.StakingToken,
    abi: abiStakingToken,
    functionName: "approve"
  })

  const { write: stake, isSuccess: stakeSucceed, isError: stakeFailed } = useContractWrite({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: "stakeTokens"
  })

  const stakeTokens = useCallback(() => {
    if (allowance < amount) {
      approve({args: [addresses.StakingRewards, amount]})
      useWaitForTransaction({ hash: approveData?.hash })
    }
    
    stake({args: [amount]})
  }, [allowance, amount, approve, stake])

  return {
    stakeTokens,
    approveSucceed,
    approveFailed,
    stakeSucceed,
    stakeFailed,
  }
}
