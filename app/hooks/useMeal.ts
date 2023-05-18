import { useEffect, useState } from 'react';
import { getFoodEeatToDay } from '@/app/actions/getMeal';
import { MealType } from '@/app/types';
const useMealFoods = (userId: String | undefined, token : String | undefined) => {
    const [foods, setFoods] = useState<MealType[]>([]);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                if (!userId || !token){
                    return [];
                }
                const mealData = await getFoodEeatToDay(userId, token);
                setFoods(mealData);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };

        fetchFoods();
    }, [userId, token]);

    const getAllMealFood = () => {
        return foods;
    }

    const getFoodsByMealType = (mealType : String) => {
        return foods.filter((food) => food.mealType === mealType);
    };
    const getDistinctCategories = () => {
        const categories = foods.map((food) => food.foodCategory);
        return [...new Set(categories)];
    };

    return { getFoodsByMealType , getDistinctCategories, getAllMealFood};
};

export default useMealFoods;
