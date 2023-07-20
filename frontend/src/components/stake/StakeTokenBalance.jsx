"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

export default function StakeTokenBalance( { stakeRewardsBalance } ) {

  return (
    <>
      <Flex>
        <Text pt='2' fontSize='sm'>
          Staking balance
        </Text>
        <Spacer />
        <Text pt='2' fontSize='sm'>
          {stakeRewardsBalance}
        </Text>      
      </Flex>
    </>
  )
}
