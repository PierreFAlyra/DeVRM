"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

import { useFeeData } from 'wagmi'

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
            {(data?.formatted.gasPrice * gasAmount).toFixed(2)} WEI
          </Text>      
        </Flex>
      )}
    </>
  )
}
