"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

import { useFeeData } from 'wagmi'

export default function GasPrice() {

  const { data, isSuccess } = useFeeData()

  return (
    <>
      {isSuccess && (
        <Flex>
          <Text pt='2' fontSize='sm'>
            Gas Price
          </Text>
          <Spacer />
          <Text pt='2' fontSize='sm'>
            {data?.formatted.gasPrice} WEI
          </Text>      
        </Flex>
      )}
    </>
  )
}
