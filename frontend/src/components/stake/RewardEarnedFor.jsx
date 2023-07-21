"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

import { useEarnedRewardsFor } from '@/hooks/useEarnedRewardsFor'

export default function RewardEarnedFor({ address }) {

  const earnedRewards = useEarnedRewardsFor(address)

  return (
    <>
      <Flex>
        <Text pt='2' fontSize='sm'>
          Earned For {`${address.substr(0,4)}...${address.substr(-4, 4)}`}
        </Text>
        <Spacer />
        <Text pt='2' fontSize='sm'>
          {earnedRewards}
        </Text>
      </Flex>
    </>
  )
}

