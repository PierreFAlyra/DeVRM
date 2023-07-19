import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

import { formatEther } from 'viem'

export const useTotalStaked = (stakeSucceed, withdrawSucceed) => {

  const [totalStaked, setTotalStaked] = useState(0)

  const { data, isSuccess: totalStakedSucceed, refetch} = useContractRead({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: 'totalStaked'
  })

  useEffect(() => {
    refetch?.()
  }, [stakeSucceed, withdrawSucceed])

  useEffect(() => {
    totalStakedSucceed && setTotalStaked(formatEther(data))
  }, [data])

  return {
    totalStaked,
    totalStakedSucceed
  }
}
