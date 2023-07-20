"use client"

import { useContext } from 'react'

import {
  IconButton,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  Flex
} from '@chakra-ui/react'


import { WalletContext } from '@/contexts/WalletContext'

export default function AmountInput( { amount, setAmount, maxValue }) {

  const { isConnected } = useContext(WalletContext)

  const handleChange = (event) => {setAmount(event.target.value)}
  const handleClick = () => {isConnected && setAmount(maxValue)}

  return (
    <Flex margin='3'>
      <InputGroup size='md'>
        <Input
          type='number'
          min='0'
          placeholder='Amount'
          value={amount}
          onChange={handleChange}
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            MAX
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}
