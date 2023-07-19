"use client"

import {
  Flex,
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

import { useContext } from "react"
import { WalletContext } from '@/contexts/WalletContext'

import { useStakeTokens } from '@/hooks/useStakeTokens'

import { ConnectButton } from '@rainbow-me/rainbowkit';
import Allowance from '@/components/stake/Allowance'
import AmountInput from '@/components/stake/AmountInput'
import GasPrice from '@/components/stake/GasPrice'
import RewardRate from '@/components/stake/RewardRate'
import TotalStaked from '@/components/stake/TotalStaked'

export default function Stake() {

  const { isConnected, balance } = useContext(WalletContext)

  const { amount, setAmount, isSuccess, isError, stakeTokens } = useStakeTokens()

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
            <AmountInput amount={amount} setAmount={setAmount} maxValue={balance?.formatted}/>

            {isConnected ? (
              <Button colorScheme='twitter' width="100%" h='3rem' onClick={stakeTokens}>
                Submit
              </Button>
            ) : (
              <Flex align='center' justify='center'>
                <ConnectButton />
              </Flex>
            )}
            
            {isError && (
              <Alert status='error' width="90%" margin='6'>
                <AlertIcon />
                There was an error processing your request
              </Alert>
            )}
            
            {isSuccess && (
              <Alert status='success' width="90%" margin='6'>
                <AlertIcon />
                Congrats! You stake with success
              </Alert>
            )}
            
            <Allowance />
            <GasPrice />
            <RewardRate />
            <TotalStaked />
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  )
}
