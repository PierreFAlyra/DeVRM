"use client"

import {
  Flex,
  Spacer,
  Heading,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter  
} from '@chakra-ui/react'

import AmountInput from '@/components/stake/AmountInput'

import { useContractWrite } from 'wagmi'
import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export default function Withdrawals() {

  const { isSuccess, isError, write } = useContractWrite({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: "withdrawTokens",
  })

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
            <AmountInput amount={null} setAmount={null} maxValue={null}/>
            <Button colorScheme='twitter' width="100%" h='3rem' onClick={null}>
              Submit
            </Button>
            {isError &&
             <Alert status='error' width="90%" margin='6'>
               <AlertIcon />
               There was an error processing your request
             </Alert>
            }
            {isSuccess &&
             <Alert status='success' width="90%" margin='6'>
               <AlertIcon />
               Congrats! You stake with success
             </Alert>
            }
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
