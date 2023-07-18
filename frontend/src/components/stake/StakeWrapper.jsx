"use client"

import { useState } from 'react';
import { Flex } from '@chakra-ui/react';

import Header from '@/components/stake/Header'
import Body from '@/components/stake/Body'

export default function StakeWrapper() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const handleTabChange = (index) => {
    setSelectedIndex(index);
  };

  return (
      <Flex direction="column" minHeight="100vh">
        <Header selectedIndex={selectedIndex}  handleTabChange={handleTabChange} />
        <Body selectedIndex={selectedIndex}/>
      </Flex>
  );
}
