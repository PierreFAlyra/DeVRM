"use client"

import {
  Flex,
  Spacer,
  Heading,
  Text,
  Button,
  Alert,
  AlertIcon,
  Card,
  CardHeader,
  CardBody,
  CardFooter
} from '@chakra-ui/react'

import AmountInput from '@/components/stake/AmountInput'

import { parseEther } from 'viem'

import { WalletContext } from '@/contexts/WalletContext'

import { useState, useContext } from "react"
import { useContractWrite } from 'wagmi'
import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export default function Stake() {

  const { isConnected, balance } = useContext(WalletContext)
  const [amount, setAmount] = useState(0)

  const { isSuccess, isError, write } = useContractWrite({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: "stakeTokens",
  })

  const stakeTokens = () => {
    isConnected && write({args: [parseEther(amount)]})
  }

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
            <AmountInput amount={amount} setAmount={setAmount} maxValue={balance}/>
            <Button colorScheme='twitter' width="100%" h='3rem' onClick={stakeTokens}>
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
