"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

import { useFeeData } from 'wagmi'
import { formatEther } from 'viem'

export default function GasPrice({ gasAmount }) {

  const { data, isSuccess } = useFeeData()

  return (
    <>
      {isSuccess && (
        <Flex>
          <Text pt='2' fontSize='sm'>
            Max transaction cost
          </Text>
          <Spacer />
          <Text pt='2' fontSize='sm'>
            ${((formatEther(data?.gasPrice) * gasAmount)*2000).toFixed(2)}
          </Text>      
        </Flex>
      )}
    </>
  )
}
