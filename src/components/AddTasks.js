import React, { useState } from 'react';
import { useToast, Button, HStack, Input } from '@chakra-ui/react';
import { supabase } from '../supabase';

function AddTasks() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase
    .from('todos')
    .insert([
      { text: inputText },
    ])
    .select();

    setLoading(false);
    setInputText('');

    toast({
      title: error || 'Task Added Successfully!',
      position: 'top',
      status: error ? 'error' : 'success',
      duration: 2000,
      isClosable: true,
    })

  }

  return (
    <form onSubmit={handleSubmit}>
        <HStack my="4" h="45">
            <Input 
              h="100%" 
              variant="filled" 
              placeholder="Add task" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              disabled={loading}
            />
            <Button backgroundColor="blue.500" colorScheme="Blue" px="10" h="100%" type="submit" isLoading={loading} loadingText="Adding...">
                Add
            </Button>
        </HStack>
    </form>
  )
}

export default AddTasks