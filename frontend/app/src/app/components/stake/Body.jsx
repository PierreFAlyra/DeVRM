import { Flex, Center, Heading, Text, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import Stake from '@/components/stake/Stake'
import Rewards from '@/components/stake/Rewards'
import Withdrawals from '@/components/stake/Withdrawals'

export default function Body( { selectedIndex } ) {
  
  return (
    <Flex flex="1" p={4}>
      <Tabs flex="1" variant="enclosed" index={selectedIndex}>
        <TabPanels flex="1">
          <TabPanel>
            <Center height="100%">
              <Stake />
            </Center>
          </TabPanel>
          <TabPanel>
            <Center height="100%">
              <Withdrawals />
            </Center>            
          </TabPanel>
          <TabPanel>
            <Center height="100%">
              <Rewards />
            </Center>                    
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>    
  )
}
