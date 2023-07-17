import { Flex, Spacer, Heading, Text, Button } from '@chakra-ui/react'
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

import AmountInput from '@/components/stake/AmountInput'

export default function Withdrawals() {
  
  return (
    <Flex width="100%" direction='column' align='center' justify='center'>
      <Heading size='md'>
        Withdrawals
      </Heading>
      <Text size='sm' mb={3}>
        Request asset withdrawal and claim ETH/USDC
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
                $34.08
              </Text>
            </Flex>
            <Flex>
              <Text pt='2' fontSize='sm'>
                Allowance
              </Text>
              <Spacer />
              <Text pt='2' fontSize='sm'>
                0.0 
              </Text>
            </Flex>
            <Flex>
              <Text pt='2' fontSize='sm'>
                Exchange rate
              </Text>
              <Spacer />
              <Text pt='2' fontSize='sm'>
                1 = 1
              </Text>
            </Flex>            
          </Flex>       
        </CardBody>
      </Card>
    </Flex>
  )
}
