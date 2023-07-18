import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Heading,
} from '@chakra-ui/react';
import TaskList from './components/TaskList';
import AddTasks from './components/AddTasks';

function App() {
  return (
    <VStack>
      <Heading
        mt="20"
        p="5"
        fontWeight="extrabold"
        size="xl"
        bgGradient="linear(to-l, teal.300,blue.500)"
        bgClip="text"
      >
        Todo List
      </Heading>
      <AddTasks />
      <TaskList />
    </VStack>
  );
}

export default App;
