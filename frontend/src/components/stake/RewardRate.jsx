"use client"

import {
  Flex,
  Spacer,
  Text
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { useContractRead } from 'wagmi'
import { addresses } from '@/constants/addresses'
import abiStakingRewards from '@/abis/contracts/StakingRewards.sol/StakingRewards.json'

import { formatEther } from 'viem'

export default function RewardRate( { totalStaked, totalStakedSucceed }) {

  const [aprValue, setApr ] = useState(0)

  const {
    data:rewardRatePerSecond,
    isSuccess: rewardRatePerSecondSucceed
  } = useContractRead({
    address: addresses.StakingRewards,
    abi: abiStakingRewards,
    functionName: 'rewardRatePerSecond'
  })

  useEffect(() => {
    const apr = () => {
      if (rewardRatePerSecondSucceed) {
        console.log(rewardRatePerSecond)
        const rewardRatePerSecondETH = formatEther(rewardRatePerSecond)
        if (totalStaked === '0') {
          return (rewardRatePerSecondETH * 31_536_000 * 100)
        }
        return ((rewardRatePerSecondETH * 31_536_000 * 100) / totalStaked)
      }
      return 0
    }

    setApr(apr())
    
  }, [totalStaked])

  return (
    <>
      {rewardRatePerSecondSucceed && (
        <Flex>
          <Text pt='2' fontSize='sm'>
            APR
          </Text>
          <Spacer />
          <Text pt='2' fontSize='sm'>
            {aprValue}%
          </Text>      
        </Flex>
      )}
    </>
  )
}
