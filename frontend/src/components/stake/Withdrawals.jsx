"use client"

import {
  Alert,
  AlertIcon,
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
import { useContext } from "react"

export default function Withdrawals({
  withdrawTokens,
  withdrawSucceed,
  withdrawFailed,
  amountWithdrawn,
  setAmountWithdrawn,
  stakeRewardsBalance
}) {

  const { isConnected } = useContext(WalletContext)

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
            
            <AmountInput
              amount={amountWithdrawn}
              setAmount={setAmountWithdrawn}
              maxValue={stakeRewardsBalance.toString()}
            />

            {isConnected ? (
              <Button
                colorScheme='twitter'
                width="100%"
                h='3rem'
                onClick={withdrawTokens}
              >
                Submit
              </Button>
            ) : (
              <Flex align='center' justify='center'>
                <ConnectButton />
              </Flex>
            )}

            {withdrawFailed && (
              <Alert status='error' width="90%" margin='6'>
                <AlertIcon />
                There was an error processing your request
              </Alert>
            )}

            {withdrawSucceed && (
              <Alert status='success' width="90%" margin='6'>
                <AlertIcon />
                Congrats! You widthdraw with success
              </Alert>
            )}

            <GasPrice gasAmount='106101'/>
            
          </Flex>       
        </CardBody>
      </Card>
    </Flex>
  )
}
