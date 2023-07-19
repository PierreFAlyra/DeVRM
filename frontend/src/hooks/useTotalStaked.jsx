import { useEffect } from 'react'
import { useContractRead } from 'wagmi'
import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export const useTotalStaked = (stakeSucceed, withdrawSucceed) => {

  const { data: totalStaked, isSuccess: totalStakedSucceed, refetch} = useContractRead({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: 'totalStaked'
  })

  useEffect(() => {
    refetch?.()
  }, [stakeSucceed, withdrawSucceed])

  return {
    totalStaked,
    totalStakedSucceed
  }
}
