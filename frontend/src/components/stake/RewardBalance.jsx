"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

import { useEarnedRewardsFor } from '@/hooks/useEarnedRewardsFor'

export default function RewardBalance( { rewardBalance } ) {

  const earnedRewards = useEarnedRewardsFor()

  return (
    <>
      <Flex>
        <Text pt='2' fontSize='sm'>
          Reward balance
        </Text>
        <Spacer />
        <Text pt='2' fontSize='sm'>
          {rewardBalance}
        </Text>
      </Flex>
    </>
  )
}
