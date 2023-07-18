"use client"

import { Flex, Spacer, Heading, Text, Input, Button } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

export default function Rewards() {

  return (
    <Flex width="100%" direction='column' align='center' justify='center'>
      <Heading size='md'>
        Reward History
      </Heading>
      <Text size='sm' mb={3}>
        Track your staking rewards with DeVRM
      </Text>
      <Card width="50%">
        <CardBody>
          <Flex direction='column' margin='6'>
            <Flex margin='3'>
              <Input
                type='text'
                placeholder='Enter your public address'
              />
            </Flex>
            <Button colorScheme='twitter' h='3rem' onClick={null}>
              Claim
            </Button>
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  )
}
