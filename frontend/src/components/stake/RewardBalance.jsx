"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

import { useState, useContext, useEffect, useCallback } from "react"
import { WalletContext } from '@/contexts/WalletContext'

export default function RewardBalance( { rewardBalance } ) {

  return (
    <>
      <Flex>
        <Text pt='2' fontSize='sm'>
          Reward balance
        </Text>
        <Spacer />
        <Text pt='2' fontSize='sm'>
          {rewardBalance.toString()}
        </Text>
      </Flex>
    </>
  )
}
