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

import { FaEthereum } from "react-icons/fa";
import { BiSolidDollarCircle } from "react-icons/bi";

export default function AmountInput() {

  return (
    <Flex margin='3'>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          variant='outline'
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
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={null}>
            MAX
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  )
}
