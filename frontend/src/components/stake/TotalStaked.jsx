"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

import { useContractRead } from 'wagmi'
import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export default function TotalStaked() {

  const { data, isSuccess} = useContractRead({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: 'totalStaked'
  })

  return (
    <>
      {isSuccess && (
        <Flex>
          <Text pt='2' fontSize='sm'>
            Total staked with DeVRM
          </Text>
          <Spacer />
          <Text pt='2' fontSize='sm'>
            {data.toString()}
          </Text>      
        </Flex>
      )}
    </>
  )
}
