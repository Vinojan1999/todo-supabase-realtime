import { useToast, Flex, Button } from '@chakra-ui/react';
import { supabase } from '../supabase';
import { useState } from 'react';

export default function ClearTask() {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleClear() {
    setLoading(false);
    const { error } = await supabase
      .from('todos')
      .delete()
      .not('text', 'eq', 'Do not delete me!');
    setLoading(true);

    toast({
      title: error || 'All Tasks Deteted Successfully!',
      position: 'top',
      status: error ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    })
  }

  return (
    <Flex>
      <Button colorScheme='gray' px="8" h="45" color="gray.500" mt="10" onClick={handleClear} isLoading={loading}>
        Clear Task
      </Button>
    </Flex>
  )
}
