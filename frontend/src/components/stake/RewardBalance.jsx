"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

import { useReadRewardBalance } from '@/hooks/useReadRewardBalance'

export default function RewardBalance() {

  const { rewardBalance, isSuccess } = useReadRewardBalance()

  return (
    <>
      {isSuccess && (
        <Flex>
          <Text pt='2' fontSize='sm'>
            Reward balance
          </Text>
          <Spacer />
          <Text pt='2' fontSize='sm'>
            {rewardBalance.toString()}
          </Text>
        </Flex>
      )}
    </>
  )
}
