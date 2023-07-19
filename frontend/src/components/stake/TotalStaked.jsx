"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

export default function TotalStaked( { totalStaked, totalStakedSucceed } ) {

  return (
    <>
      {totalStakedSucceed && (
        <Flex>
          <Text pt='2' fontSize='sm'>
            Total staked with DeVRM
          </Text>
          <Spacer />
          <Text pt='2' fontSize='sm'>
            {totalStaked}
          </Text>      
        </Flex>
      )}
    </>
  )
}
