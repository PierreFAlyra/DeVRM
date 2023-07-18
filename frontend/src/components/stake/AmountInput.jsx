"use client"

import { useContext } from 'react'

import {
  IconButton,
  Input,
  InputRightElement,
  InputGroup,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem
} from '@chakra-ui/react'

import { FaEthereum } from "react-icons/fa"
import { BiSolidDollarCircle } from "react-icons/bi"

import { WalletContext } from '@/contexts/WalletContext'

export default function AmountInput( { amount, setAmount, maxValue }) {

  const { isConnected } = useContext(WalletContext)

  const handleChange = (event) => {setAmount(event.target.value)}
  const handleClick = () => {isConnected && setAmount(maxValue?.formatted)}

  return (
    <Flex margin='3'>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          variant='outline'
          onChange={null}
        />
        <MenuList>
          <MenuItem icon={<FaEthereum />} />
          <MenuItem icon={<BiSolidDollarCircle />} />
        </MenuList>
      </Menu>
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
