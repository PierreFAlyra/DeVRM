import { useState, useCallback } from "react"

import { useContractWrite } from 'wagmi'

import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export const useWithdrawTokens = () => {

  const [amount, setAmount] = useState(0)
  const { isSuccess, isError, write } = useContractWrite(
    {
      address: addresses.StakingRewards,
      abi: abiStakingRewards,
      functionName: "withdrawTokens"
    }
  )

  const withdrawTokens = useCallback(() => {
    write({args: [parseEther(amount)]})
  }, [write, amount])

  return {
    amount,
    setAmount,
    isSuccess,
    isError,
    withdrawTokens
  }
}
