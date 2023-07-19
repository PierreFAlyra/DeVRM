"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

import { useContractRead } from 'wagmi'
import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export default function RewardRate() {

  const { data, isSuccess } = useContractRead({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: 'rewardRatePerSecond'
  })

  return (
    <>
      {isSuccess && (
        <Flex>
          <Text pt='2' fontSize='sm'>
            APR
          </Text>
          <Spacer />
          <Text pt='2' fontSize='sm'>
            {data.toString()* 31_536_000}%
          </Text>      
        </Flex>
      )}
    </>
  )
}
