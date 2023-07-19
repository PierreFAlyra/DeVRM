"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

import { useReadAllowance } from '@/hooks/useReadAllowance'

export default function Allowance() {

  const { allowance, isSuccess } = useReadAllowance()

  return (
    <>
      {isSuccess && (
        <Flex>
          <Text pt='2' fontSize='sm'>
            Allowance
          </Text>
          <Spacer />
          <Text pt='2' fontSize='sm'>
            {allowance.toString()}
          </Text>
        </Flex>
      )}
    </>
  )
}
