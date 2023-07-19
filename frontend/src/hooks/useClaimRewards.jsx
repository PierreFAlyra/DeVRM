import { useState, useContext, useEffect, useCallback } from "react"

import { useContractWrite } from 'wagmi'

import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export const useClaimRewards = () => {

  const { isSuccess, isError, write:claimRewards } = useContractWrite({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: "claimRewards"
  })

  return { isSuccess, isError, claimRewards }
}
