"use client"

import {
  Flex,
  Spacer,
  Heading,
  Text,
  Input,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Alert,
  AlertIcon
} from '@chakra-ui/react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import RewardBalance from '@/components/stake/RewardBalance'

import { WalletContext } from '@/contexts/WalletContext'
import { useContext, useState, useEffect } from 'react'
import { useClaimRewards } from '@/hooks/useClaimRewards'

export default function Rewards() {

  const [address, setAddress] = useState('')
  const { account, isConnected } = useContext(WalletContext)
  const { isSuccess, isError, claimRewards } = useClaimRewards()
  
  const handleChange = (event) => {setAddress(event.target.value)}

  useEffect(() => {
    isConnected && setAddress(account)
  }, [isConnected, account])


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
                value={address}
                onChange={handleChange}
              />
            </Flex>
            
            {isConnected ? (
              <Button colorScheme='twitter' h='3rem' onClick={claimRewards}>
                Claim
              </Button>
            ) : (
              <Flex align='center' justify='center'>
                <ConnectButton />
              </Flex>
            )}
            
            {isSuccess && (
              <Alert status='success' width="90%" margin='6'>
                <AlertIcon />
                Congrats! You withdraw your rewards with success
              </Alert>
            )}

            {isError && (
              <Alert status='error' width="90%" margin='6'>
                <AlertIcon />
                There was an error processing your request
              </Alert>
            )}

            <RewardBalance />
            
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  )
}
