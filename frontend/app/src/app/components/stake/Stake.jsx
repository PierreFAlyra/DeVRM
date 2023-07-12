import { Flex, Spacer, Heading, Text, Button } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

import AmountInput from '@/components/stake/AmountInput'

export default function Stake() {

  return (
    <Flex width="100%" direction='column' align='center' justify='center'>
      <Heading size='md'>
        Stake
      </Heading>
      <Text size='sm' mb={3}>
        Stake ETH/USDC and receive rewards while staking
      </Text>
      <Card width="50%">
        <CardBody>
          <Flex direction='column' margin='6'>
            <AmountInput />
            <Button colorScheme='twitter' h='3rem' onClick={null}>
              Submit
            </Button>
            <Flex>
              <Text pt='2' fontSize='sm'>
                Max transaction cost
              </Text>
              <Spacer />
              <Text pt='2' fontSize='sm'>
                $5.12
              </Text>
            </Flex>
            <Flex>
              <Text pt='2' fontSize='sm'>
                Rewards transaction fee
              </Text>
              <Spacer />
              <Text pt='2' fontSize='sm'>
                10%
              </Text>
            </Flex>
          </Flex>       
        </CardBody>
      </Card>
    </Flex>
  )

}
