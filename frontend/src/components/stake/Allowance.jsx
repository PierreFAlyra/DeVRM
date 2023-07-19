"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

export default function Allowance( { allowance } ) {

  return (
    <>
      <Flex>
        <Text pt='2' fontSize='sm'>
          Allowance
        </Text>
        <Spacer />
        <Text pt='2' fontSize='sm'>
          {allowance.toString()}
        </Text>
      </Flex>
    </>
  )
}
