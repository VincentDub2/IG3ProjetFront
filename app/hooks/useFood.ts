import { useEffect, useState } from 'react';
import axios from 'axios';
import { Food } from '../types';
import {toast} from "react-hot-toast";
import {getColor} from "@chakra-ui/theme-tools";

type UseFoodResponse = {
    food: Food | null;
    error: string | null;
    foods: Food[];
    isLoading: boolean;
    getAllFoodFromThisUser: () => Promise<void>;
    updateFood: (foodId : String, updatedFood: Food) => Promise<Food | void>;
    deleteFood: (foodId: string) => Promise<void>;
    addFood: (newFood: Food) => Promise<void>;
};

const useFood = (userId: string, sessionToken: string): UseFoodResponse => {
    const [food, setFood] = useState<Food | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [foods, setFoods] = useState<Food[]>([]);
    const [counter, setCounter] = useState(0);
    const getAllFoodFromThisUser = async () => {
        setIsLoading(true);
        console.log(`get all food from user ${userId}`);
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}/foods`, {
                headers: {
                    Authorization: `Eattrack-Auth-${sessionToken}`,
                },
            });
            if (response.status === 404){
                setError('No food found');
                return;
            }

            if (response.status !== 200) {
                setError('Failed to get food');
                return ;
            }

            setFoods(response.data);
            setError(null);

        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateFood = async (foodId : String, updatedFood: Food): Promise<Food | void> => {
        setIsLoading(true);
        try {
            const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/food/${foodId}`, updatedFood, {
                headers: {
                    Authorization: `Eattrack-Auth-${sessionToken}`,
                },
            });

            if (response.status !== 200) {
                setError('Failed to update food');
                return;
            }
            if (response.status === 200) {
                // trigger a custom event
                const event = new CustomEvent('foodUpdated');
                window.dispatchEvent(event);
            }

            setFood(response.data);
            setError(null);
            setCounter(prevCounter => prevCounter + 1);

            return response.data;
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteFood = async (foodId: string): Promise<void> => {
        setIsLoading(true);
        console.log(`delete food ${foodId}`);
        try {
            const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/food/${foodId}`, {
                headers: {
                    Authorization: `Eattrack-Auth-${sessionToken}`,
                },
            });

            if (response.status !== 200) {
                setError('Failed to delete food');
                return;
            }
            if (response.status === 200) {
                // trigger a custom event
                const event = new CustomEvent('foodUpdated');
                window.dispatchEvent(event);
            }

            setFood(null);
            setError(null);
            setCounter(prevCounter => prevCounter + 1);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const addFood = async (newFood: Food): Promise<void> => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/food/add`, newFood, {
                headers: {
                    Authorization: `Eattrack-Auth-${sessionToken}`,
                },
            });

            if (response.status !== 200) {
                setError('Failed to add food');
                toast.success("can't add food");
                return ;
            }
            if (response.status === 200) {
                // trigger a custom event
                const event = new CustomEvent('foodUpdated');
                window.dispatchEvent(event);
            }

            setFoods(prevFoods => [...prevFoods, response.data]);
            setError(null);
            toast.success("Food added");
            setCounter(prevCounter => prevCounter + 1);

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unexpected error occurred');
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAllFoodFromThisUser();
    }, [userId, sessionToken, counter]);

    return { food,addFood, error, foods, isLoading, updateFood, deleteFood, getAllFoodFromThisUser };
};

export default useFood;
