import { useState, useCallback } from "react"

import { useContractWrite, useWaitForTransaction } from 'wagmi'

import { useReadAllowance } from '@/hooks/useReadAllowance'

import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'
import abiStakingToken from '@/abis/contracts/StakingToken.sol/StakingToken.json'

import { parseEther } from 'viem'

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

  const stakeTokens = () => {
    console.log(allowance)
    console.log(amount)
    if (allowance < amount) {
      approve({args: [addresses.StakingRewards, parseEther(amount)]})
    } else {
      stake({args: [parseEther(amount)]})
    }
  }

  return {
    stakeTokens,
    approveSucceed,
    approveFailed,
    stakeSucceed,
    stakeFailed,
  }
}
