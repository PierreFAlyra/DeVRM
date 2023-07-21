"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

import { formatEther } from 'viem'

export default function RewardRate({
  totalStaked,
  totalStakedSucceed,
  stakeRewardsBalance
}) {

  return (
    <>
      {totalStakedSucceed && (
        <Flex>
          <Text pt='2' fontSize='sm'>
            Reward shares
          </Text>
          <Spacer />
          <Text pt='2' fontSize='sm'>
            {totalStaked > 0 ? stakeRewardsBalance/totalStaked * 100 : 0}%
          </Text>      
        </Flex>
      )}
    </>
  )
}
