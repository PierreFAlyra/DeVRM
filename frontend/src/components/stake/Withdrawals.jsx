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
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { WalletContext } from '@/contexts/WalletContext'
import { useState, useContext, useMemo, useCallback } from "react"
import { useContractWrite } from 'wagmi'
import { useReadStakeBalance } from '@/hooks/useReadStakeBalance'

import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export default function Withdrawals() {

  const { isConnected } = useContext(WalletContext)
  const [amount, setAmount] = useState(0)

  const { isSuccess: withdrawTokensSucceed,
          isError: withdrawTokensFailed,
          write: withdraw
        } = useContractWrite({
          address: addresses.StakingRewards,
          abi: abiStakingRewards,
          functionName: "withdrawTokens"
        })

  const withdrawTokens = useCallback(() => {
    withdrawTokensSucceed && withdraw({args: [parseEther(amount)]})
  }, [withdraw, amount])

  const { stakeBalance, isSuccess: stakeBalanceSucceed } = useReadStakeBalance()

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

            {isConnected ?
             <Button colorScheme='twitter' width="100%" h='3rem' onClick={withdrawTokens}>
               Submit
             </Button>
             :
             <Flex align='center' justify='center'>
               <ConnectButton />
             </Flex>
            }

            {withdrawTokensFailed &&
             <Alert status='error' width="90%" margin='6'>
               <AlertIcon />
               There was an error processing your request
             </Alert>
            }

            {withdrawTokensSucceed &&
             <Alert status='success' width="90%" margin='6'>
               <AlertIcon />
               Congrats! You widthdraw with success
             </Alert>
            }
            
            <Flex>
              <Text pt='2' fontSize='sm'>
                Max transaction cost
              </Text>
              <Spacer />
              <Text pt='2' fontSize='sm'>
                $0.0
              </Text>
            </Flex>
            
          </Flex>       
        </CardBody>
      </Card>
    </Flex>
  )
}
