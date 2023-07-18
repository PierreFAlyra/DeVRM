"use client"

import { useContext, useState, useEffect } from 'react'

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
  CardFooter
} from '@chakra-ui/react'

import { ConnectButton } from '@rainbow-me/rainbowkit';

import { WalletContext } from '@/contexts/WalletContext'

export default function Rewards() {

  const [address, setAddress] = useState('')
  const { account, isConnected } = useContext(WalletContext)
  const handleChange = (event) => {setAddress(event.target.value)}

  useEffect(() => {
    if (isConnected) {
      setAddress(account)
    }
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
            {isConnected ?
             <Button colorScheme='twitter' h='3rem' onClick={null}>
               Claim
             </Button>
             :
             <Flex align='center' justify='center'>
               <ConnectButton />
             </Flex>}
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  )
}
