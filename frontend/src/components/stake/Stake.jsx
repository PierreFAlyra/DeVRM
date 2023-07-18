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

import { parseEther } from 'viem'

import AmountInput from '@/components/stake/AmountInput'
import { ConnectButton } from '@rainbow-me/rainbowkit';

import { WalletContext } from '@/contexts/WalletContext'
import { useState, useContext, useMemo, useCallback } from "react"
import { useContractWrite, useContractRead, useFeeData } from 'wagmi'
import { useReadAllowance } from '@/hooks/useReadAllowance'

import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

export default function Stake() {

  const { account, isConnected, balance } = useContext(WalletContext)
  const [amount, setAmount] = useState(0)

  const { isSuccess: stakeTokensSucceed, isError: stakeTokensFailed, write: stake } = useContractWrite({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: "stakeTokens"
  })

  const stakeTokens = useCallback(() => {
    stakeTokensSucceed && stake({args: [parseEther(amount)]})
  }, [stake, amount])

  const { allowance, isSuccess: readAllowanceSucceed } = useReadAllowance()
  const Allowance = useCallback(() => {
    if (readAllowanceSucceed) {
      return (
        <Text pt='2' fontSize='sm'>
          {allowance.toString()}
        </Text>
      )
    }
  }, [readAllowanceSucceed, allowance])

  const { data: gasPrice, isSuccess: feeDataSucces } = useFeeData()
  const GasPrice = useCallback(() => {
    if (feeDataSucces) {
      return (
        <Text pt='2' fontSize='sm'>
          {gasPrice?.formatted.gasPrice} WEI
        </Text>
      )
    }
  }, [gasPrice, feeDataSucces])
  
  const { data: rewardRate, isSuccess: rewardRateSucceed } = useContractRead({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: 'rewardRatePerSecond'
  })

  const RewardRate = useCallback(() => {
    if (rewardRateSucceed) {
      return (
        <Text pt='2' fontSize='sm'>
          {rewardRate.toString()* 31_536_000}%
        </Text>
      )
    }
  }, [rewardRateSucceed, rewardRate])

  const { data: totalStaked, isSuccess: totalStakedSucceed} = useContractRead({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: 'totalStaked'
  })

  const TotalStaked = useCallback(() => {
    if (totalStakedSucceed) {
      return (
        <Text pt='2' fontSize='sm'>
          {totalStaked.toString()}
        </Text>
      )
    }
  }, [totalStakedSucceed, totalStaked])

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

            {isConnected ?
             <Button colorScheme='twitter' width="100%" h='3rem' onClick={stakeTokens}>
               Submit
             </Button>
             :
             <Flex align='center' justify='center'>
               <ConnectButton />
             </Flex>
            }
            
            {stakeTokensFailed &&
             <Alert status='error' width="90%" margin='6'>
               <AlertIcon />
               There was an error processing your request
             </Alert>
            }
            
            {stakeTokensSucceed &&
             <Alert status='success' width="90%" margin='6'>
               <AlertIcon />
               Congrats! You stake with success
             </Alert>
            }

            <Flex>
              <Text pt='2' fontSize='sm'>
                Allowance
              </Text>
              <Spacer />
              <Allowance />
            </Flex>
            
            <Flex>
              <Text pt='2' fontSize='sm'>
                Gas Price
              </Text>
              <Spacer />
              <GasPrice />
            </Flex>
            
            <Flex>
              <Text pt='2' fontSize='sm'>
                APR
              </Text>
              <Spacer />
              <RewardRate />
            </Flex>
            
            <Flex>
              <Text pt='2' fontSize='sm'>
                Total staked with DeVRM
              </Text>
              <Spacer />
              <TotalStaked />
            </Flex>
            
          </Flex>
        </CardBody>
      </Card>
    </Flex>
  )
}
