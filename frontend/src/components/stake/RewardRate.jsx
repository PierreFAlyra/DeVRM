"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

import { useContractRead } from 'wagmi'
import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export default function RewardRate( { totalStaked, totalStakedSucceed }) {

  const {
    data:rewardRatePerSecond,
    isSuccess: rewardRatePerSecondSucceed
  } = useContractRead({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: 'rewardRatePerSecond'
  })

  const apr = () => {
    if (totalStaked === '0') {
      return (rewardRatePerSecond.toString() * 31_536_000 * 100)
    }

    return ((rewardRatePerSecond.toString() * 31_536_000 * 100) / totalStaked)
  }

  return (
    <>
      {rewardRatePerSecondSucceed && totalStakedSucceed && (
        <Flex>
          <Text pt='2' fontSize='sm'>
            APR
          </Text>
          <Spacer />
          <Text pt='2' fontSize='sm'>
            {apr()}%
          </Text>      
        </Flex>
      )}
    </>
  )
}
