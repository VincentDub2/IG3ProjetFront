'use client';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { Food } from '@/app/types';

interface FoodItemProps {
    food: Food;
    handleRemove?: (foodId: string) => void;  // Function to handle food removal
    handleEdit? : (food: Food) => void;  // Function to handle food editing
}

const FoodItem: React.FC<FoodItemProps> = ({ food, handleRemove, handleEdit }) => {
    return (
        <Box bg="white" p={4} borderRadius="md" shadow="md" mb={4}>
            <Flex justifyContent="space-between" alignItems="center">
                <Box>
                    <Heading size="md">{food.name}</Heading>
                    <Text>Calories: {food.calories}</Text>
                    {/* Add more information about the food as needed */}
                </Box>
                <Box>
                    <Button colorScheme="red" mr={2} onClick={() => handleEdit && handleEdit(food)}>Edit</Button>
                    <Button colorScheme="red" onClick={() => handleRemove && handleRemove(food.id)}>Remove</Button>
                </Box>
            </Flex>
        </Box>
);}

export default FoodItem;
