import { useState, useCallback } from "react"

import { useContractWrite } from 'wagmi'

import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export const useWithdrawTokens = (amount) => {

  const {
    isSuccess: withdrawSucceed,
    isError: withdrawFailed,
    write: widthraw
  } = useContractWrite({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: "withdrawTokens"
  })

  const withdrawTokens = useCallback(() => {
    widthraw({args: [amount]})
  }, [widthraw, amount])

  return {
    withdrawTokens,
    withdrawSucceed,
    withdrawFailed
  }
}
