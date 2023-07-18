import { Button, HStack, Input } from '@chakra-ui/react';

function AddTasks() {
  return (
    <form>
        <HStack my="4" h="45">
            <Input h="100%" variant="filled" placeholder="Add task" />
            <Button  backgroundColor="blue.500" colorScheme="Blue" px="10" h="100%" type="submit">
                Add
            </Button>
        </HStack>
    </form>
  )
}

export default AddTasks