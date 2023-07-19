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

import { ConnectButton } from '@rainbow-me/rainbowkit';
import AmountInput from '@/components/stake/AmountInput'
import GasPrice from '@/components/stake/GasPrice'

import { WalletContext } from '@/contexts/WalletContext'
import { useState, useContext, useMemo, useCallback } from "react"
import { useContractWrite } from 'wagmi'
import { useReadStakeBalance } from '@/hooks/useReadStakeBalance'
import { useWithdrawTokens } from '@/hooks/useWithdrawTokens'

export default function Withdrawals() {

  const { isConnected } = useContext(WalletContext)
  const { amount, setAmount, isSuccess, isError, withdrawTokens } = useWithdrawTokens()
  const { stakeBalance } = useReadStakeBalance()

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
            
            <AmountInput amount={amount} setAmount={setAmount} maxValue={stakeBalance.toString()}/>

            {isConnected ? (
              <Button colorScheme='twitter' width="100%" h='3rem' onClick={withdrawTokens}>
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
                Congrats! You widthdraw with success
              </Alert>
            )}

            <GasPrice />
            
          </Flex>       
        </CardBody>
      </Card>
    </Flex>
  )
}
