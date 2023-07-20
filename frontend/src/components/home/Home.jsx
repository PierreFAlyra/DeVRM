"use client"

import { Link, Button } from '@chakra-ui/react'
import { BiDna } from 'react-icons/bi';

export default function Home() {

  return (
    <Link href="/" textDecoration="none">
      <Button
        leftIcon={<BiDna />}
        aria-label="BiDna"
        variant="ghost"
        fontSize="xl"
        colorScheme='twitter'
        mr={2}
      >
        DeVRM
      </Button>
    </Link>
  )
}
