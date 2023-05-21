import { useEffect, useState } from 'react';
import axios from 'axios';
import { MealType ,MealFoodPost} from '@/app/types';
import { toast } from 'react-hot-toast';
import useAddProductModal from "@/app/hooks/useAddProductModal";
import {number} from "prop-types";
import moment from "moment";


type UseMealFoodsResponse = {
    foods: MealType[];
    error: string | null;
    isLoading: boolean;
    consumed: number;
    totalCalories: number;
    totalProtein: number;
    totalCarbohydrates: number;
    totalLipids: number;
    getFoodsByMealType: (mealType : string) => MealType[];
    getDistinctCategories: () => string[];
    addMealFood: (newMealFood: MealFoodPost) => Promise<boolean>;
    getAllMealFoods: () => Promise<void>;
};
type sussess ={
     result: boolean;
}

const useMealFoods = (userId: string, sessionToken: string): UseMealFoodsResponse => {
    const [foods, setFoods] = useState<MealType[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [consumed, setConsumed] = useState(0);
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalCarbohydrates, setTotalCarbohydrates] = useState(0);
    const [totalLipids, setTotalLipids] = useState(0);

    const getAllMealFoods = async () => {
        try {
            const date = Date();
            console.log(sessionToken, userId)
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/meals/${userId}/${date}`, {
                headers: {
                    Authorization: `Eattrack-Auth-${sessionToken}`,
                },
            });

            if (response.status !== 200) {
                setError('Failed to get meals');
                return;
            }

            setFoods(response.data);
            setError(null);
        } catch (error) {
            console.error(error);
            setError('An unexpected error occurred');
        } finally {
            setIsLoading(false);
        }
    };
    const addMealFood = async (newMealFood: MealFoodPost) => {
        try {
            console.log(newMealFood);
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/meal/add`, newMealFood,
                {
                    headers: {
                        Authorization: `Eattrack-Auth-${sessionToken}`,
                    }
                }
            );

            if (response.status !== 200) {
                toast.error('Failed to add meal');
                return false;
            }
            toast.success('Meal added successfully' );
            setFoods([...foods, response.data]);

            const event = new CustomEvent('mealUpdated');
            window.dispatchEvent(event);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }  finally {
            setIsLoading(false);
        }
    }

    const getFoodsByMealType = (mealType : string) => {
        return foods.filter((food) => food.mealType === mealType);
    };

    const getDistinctCategories = () => {
        const categories = foods.map((food) => food.foodCategory);
        return [...new Set(categories)];
    };

    useEffect(() => {
        getAllMealFoods();
    }, [userId, sessionToken]);

    useEffect(() => {
        let calories = 0;
        let protein = 0;
        let carbs = 0;
        let fat = 0;

        console.log("Food :" ,foods);

        foods.forEach(food => {
            calories += Number(food.calories) * Number(food.quantity) / 100;
            protein +=  Number(food.protein) *  Number(food.quantity) / 100;
            carbs +=  Number(food.carbs) *  Number(food.quantity) / 100;
            fat +=  Number(food.fat) *  Number(food.quantity) / 100;
        });

        setTotalCalories(calories);
        setTotalProtein(protein);
        setTotalCarbohydrates(carbs);
        setTotalLipids(fat);
        setConsumed(calories);
    }, [foods]);

    const Date = () => {
        const today = moment().format('YYYY-MM-DDTHH:mm:ssZ');
        return today;
    }

    return {getAllMealFoods,addMealFood, foods, error, isLoading, consumed, totalCalories, totalProtein, totalCarbohydrates, totalLipids, getFoodsByMealType, getDistinctCategories };
};

export default useMealFoods;
