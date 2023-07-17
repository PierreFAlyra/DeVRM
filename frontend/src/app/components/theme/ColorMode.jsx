import { Button, useColorMode } from '@chakra-ui/react'
import { WiDaySunny, WiMoonAltWaxingCrescent4 } from "react-icons/wi";

export default function ColorMode() {
  
  const { colorMode, toggleColorMode } = useColorMode()
  
  return (
    <Button variant='ghost' colorScheme='twitter' onClick={toggleColorMode}>
      {colorMode === 'light' ? <WiMoonAltWaxingCrescent4 /> : <WiDaySunny />}
    </Button>
  )
}
