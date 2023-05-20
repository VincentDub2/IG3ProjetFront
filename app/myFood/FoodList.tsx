'use client'
import { Box, Stack } from '@chakra-ui/react';
import FoodItem from "@/app/myFood/FoodItem";
import { Food } from "@/app/types";

interface FoodListProps {
    foods: Food[];
    handleRemove?: (foodId: string) => void;  // Function to handle food removal
    handleEdit?: (food: Food) => void;  // Function to handle food editing
}

const FoodList : React.FC<FoodListProps> = ({ foods ,handleEdit,handleRemove}) => (
    <Box>
        <Stack spacing={4}>
            {foods.map((food) => (
                <FoodItem key={food.id} food={food} handleEdit={handleEdit} handleRemove={handleRemove} />
            ))}
        </Stack>
    </Box>
);

export default FoodList;
