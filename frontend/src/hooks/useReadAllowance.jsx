import { useState, useContext, useEffect, useCallback } from "react"
import { WalletContext } from '@/contexts/WalletContext'
import { readContract } from '@wagmi/core'

import { addresses } from '@/constants/addresses'
import abiStakingToken from '@/abis/contracts/StakingToken.sol/StakingToken.json'

export const useReadAllowance = () => {
  const [allowance, setAllowance] = useState(0)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const { account, isConnected } = useContext(WalletContext)

  const getAllowance =  useCallback(async () => {
    if (isConnected && account) {
      try {
        const data = await readContract({
          address: addresses.StakingToken,
          abi: abiStakingToken,
          functionName: 'allowance',
          args:[account, addresses.StakingRewards]
        })
        setAllowance(data)
        setIsSuccess(true)
      } catch (err) {
        setIsSuccess(false)
        console.log(err.message)
      }
    }
  }, [isConnected, account])

  useEffect(() => {
    getAllowance()
  }, [getAllowance])

  return { allowance, isSuccess }
}
