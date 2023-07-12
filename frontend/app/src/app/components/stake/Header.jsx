import { Flex, Spacer, Tab, TabList, Tabs, Stack, Text } from '@chakra-ui/react';
import { BsLightningCharge } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { TfiCup } from "react-icons/tfi";
import { ConnectButton } from '@rainbow-me/rainbowkit';

import Home from '@/components/home/Home'
import ColorMode from '@/components/theme/ColorMode'

export default function Header( { selectedIndex, handleTabChange } ) {

  const tabs = [
    {icon:<BsLightningCharge />, text:'Stack'},
    {icon:<GiReceiveMoney />, text:'Withdrawals'},
    {icon:<TfiCup />, text:'Rewards'}]

  return (
    <Flex align="center" p={4}>
      <Home />
      <Tabs
        ml={4}
        variant='soft-rounded'
        colorScheme='twitter'
        isLazy
        index={selectedIndex}
        onChange={handleTabChange}
      >
        <TabList>
          {tabs.map((tab) => (
            <Tab>
              <Stack align="center" direction="row" spacing={2}>
                {tab.icon}
                <Text>{tab.text} </Text>
              </Stack>
            </Tab>
          ))}
        </TabList>
      </Tabs>
      
      <Spacer />
      
      <Stack align="center" direction="row" spacing={2}>
        <ConnectButton chainStatus="none"/>
        <ColorMode />
      </Stack>
    </Flex>
  )
}
