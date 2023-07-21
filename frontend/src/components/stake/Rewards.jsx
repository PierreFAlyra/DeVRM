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
import RewardEarnedFor from '@/components/stake/RewardEarnedFor'

import { WalletContext } from '@/contexts/WalletContext'
import { useContext, useState, useEffect } from 'react'

export default function Rewards({
  claimRewardsSucceed,
  claimRewardsFailed,
  claimRewards,
  rewardBalance
}) {

  const { account, isConnected } = useContext(WalletContext)
  const [address, setAddress] = useState('')
  const handleChange = (event) => {
    const regex = /^0x[a-fA-F0-9]{40}$/gm
    if (event.target.value.match(regex))
      setAddress(event.target.value)
  }

  useEffect(() => {
    isConnected && setAddress(account)
  }, [isConnected, account])

  return (
    <Flex width="100%" direction='column' align='center' justify='center'>
      <Heading size='md'>
        Reward History
      </Heading>
      
      <Text size='sm' mb={3}>
        Track your VRM staking rewards
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
            
            {claimRewardsSucceed && (
              <Alert status='success' width="90%" margin='6'>
                <AlertIcon />
                Congrats! You withdraw your rewards with success
              </Alert>
            )}

            {claimRewardsFailed && (
              <Alert status='error' width="90%" margin='6'>
                <AlertIcon />
                There was an error processing your request
              </Alert>
            )}

            <RewardBalance rewardBalance={rewardBalance}/>
            <RewardEarnedFor address={address}/>
            
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  )
}
