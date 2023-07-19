import { Text, HStack, VStack, Image, Box, StackDivider, Skeleton } from '@chakra-ui/react';
import ClearTask from './ClearTask';
import DeleteTask from './DeleteTask';
import img from '../images/empty.svg';

import { useState ,useEffect } from 'react';
import { supabase } from '../supabase'
// import { useRealtime } from 'react-supabase';

export default function TaskList() {
    // Using react-supabase
    // const [result, reexecute] = useRealtime('todos');
    // const { data: tasks, error, fetching } = result;

    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        try {
            let { data: tasks, error } = await supabase.from('todos').select('*')
            if (error) {
                console.error('Error fetching tasks:', error);
            } else {
                setTasks(tasks);
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        } finally {
            setIsLoading(false);
        }
        console.log(tasks);
    };

    // useEffect(() => {
    //   fetchData();
    // }, [])

    useEffect(() => {
        
        fetchData();

        const todos = supabase
            .channel('*')
            .on(
                'postgres_changes',
                { 
                    event: '*', 
                    schema: 'public', 
                    table: 'todos' 
                },
                (payload) => {
                    const newTasks = payload.new;
                    const oldTask = payload.old;
                    const event = payload.eventType;
                    console.log(event);

                    if (event === 'INSERT') {
                        setTasks((prevTasks) => [...prevTasks, newTasks]);
                    } else if (event === 'UPDATE') {
                        setTasks((prevTasks) => {
                            prevTasks.map((task) => 
                                task.id === oldTask.id ? newTasks : task
                            )
                        });
                    } else if (event === 'DELETE') {
                        setTasks((prevTasks) =>
                            prevTasks.filter((task) => task.id !== oldTask.id)
                        );
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(todos);
        }
    }, [])
    
    if (isLoading) {
        return (
            <Skeleton
                width={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
                height="300px"
                rounded="md"
            />
        );
    }
    
    if (!tasks || !tasks.length) {
        return (
            <Box alignItems="center">
                <Image src={img} mt="30px" maxW="95%" />
            </Box>
        );
    }

    return (
        <>
            <VStack
                divider={<StackDivider />}
                borderColor="gray.700"
                borderWidth="2px"
                p="5"
                borderRadius="lg"
                w="100%"
                maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
                alignItems="stretch"
            >
                {tasks.map((task) => (
                    <HStack key={task.id}>
                        <Text w="100%" p="8px" borderRadius="lg">
                            {task.text}
                        </Text>
                        <DeleteTask id={task.id} />
                    </HStack>
                ))}
            </VStack>

            <ClearTask />
        </>
    )
}