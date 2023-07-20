"use client"

import { Flex, Center, Heading, Text, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Stake from '@/components/stake/Stake'
import Rewards from '@/components/stake/Rewards'
import Withdrawals from '@/components/stake/Withdrawals'

import { useState } from 'react'
import { useStakeTokens } from '@/hooks/useStakeTokens'
import { useWithdrawTokens } from '@/hooks/useWithdrawTokens'
import { useClaimRewards } from '@/hooks/useClaimRewards'
import { useReadStakingTokensBalance } from '@/hooks/useReadStakingTokensBalance'
import { useReadStakeRewardsBalance } from '@/hooks/useReadStakeRewardsBalance'
import { useReadRewardBalance } from '@/hooks/useReadRewardBalance'
import { useReadAllowance } from '@/hooks/useReadAllowance'
import { useTotalStaked } from '@/hooks/useTotalStaked'

export default function Body( { selectedIndex } ) {

  const [amountStaked, setAmountStaked] = useState(0)
  const [amountWithdrawn, setAmountWithdrawn] = useState(0)
  const [allowance, setAllowance] = useState(0)

  const {
    stakeTokens,
    approveSucceed,
    approveFailed,
    stakeSucceed,
    stakeFailed
  } = useStakeTokens(amountStaked, allowance)

  useReadAllowance(approveSucceed, approveFailed, stakeSucceed, setAllowance)

  const {
    withdrawTokens,
    withdrawSucceed,
    withdrawFailed
  } = useWithdrawTokens(amountWithdrawn)

  const {
    claimRewardsSucceed,
    claimRewardsFailed,
    claimRewards
  } = useClaimRewards()

  const stakingTokensBalance = useReadStakingTokensBalance(stakeSucceed, withdrawSucceed)
                              
  const stakeRewardsBalance = useReadStakeRewardsBalance(stakeSucceed, withdrawSucceed)
  const rewardBalance = useReadRewardBalance(stakeSucceed, withdrawSucceed, claimRewardsSucceed)
  const { totalStaked, totalStakedSucceed } = useTotalStaked(stakeSucceed, withdrawSucceed)

  return (
    <Flex flex="1" p={4}>
      <Tabs flex="1" variant="enclosed" index={selectedIndex}>
        <TabPanels flex="1">
          <TabPanel>
            <Center height="100%">
              <Stake
                stakeTokens={stakeTokens}
                stakeSucceed={stakeSucceed}
                stakeFailed={stakeFailed}
                amountStaked={amountStaked}
                setAmountStaked={setAmountStaked}
                stakingTokensBalance={stakingTokensBalance}
                allowance={allowance}
                totalStaked={totalStaked}
                totalStakedSucceed={totalStakedSucceed}
              />
            </Center>
          </TabPanel>
          <TabPanel>
            <Center height="100%">
              <Withdrawals
                withdrawTokens={withdrawTokens}
                withdrawSucceed={withdrawSucceed}
                withdrawFailed={withdrawFailed}
                amountWithdrawn={amountWithdrawn}
                setAmountWithdrawn={setAmountWithdrawn}
                stakeRewardsBalance={stakeRewardsBalance}
              />
            </Center>            
          </TabPanel>
          <TabPanel>
            <Center height="100%">
              <Rewards
                claimRewardsSucceed={claimRewardsSucceed}
                claimRewardsFailed={claimRewardsFailed}
                claimRewards={claimRewards}
                rewardBalance={rewardBalance}
              />
            </Center>                    
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>    
  )
}
