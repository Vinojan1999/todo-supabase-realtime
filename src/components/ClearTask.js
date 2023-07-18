import { Flex, Button } from '@chakra-ui/react'

export default function ClearTask() {
  return (
    <Flex>
      <Button colorScheme='gray' px="8" h="45" color="gray.500" mt="10">
        Clear Task
      </Button>
    </Flex>
  )
}
