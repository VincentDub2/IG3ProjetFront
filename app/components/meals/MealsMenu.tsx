'use client';
import Meal from "@/app/components/meals/Meal";
import { MdFreeBreakfast } from "react-icons/md";
import { GiChickenOven, GiHotMeal, GiShinyApple } from "react-icons/gi";
import { useEffect, useState } from "react";
import { MealType } from "@/app/types";
import { useSession } from "next-auth/react";
import useMeal from "@/app/hooks/useMeal";

const MealsMenu = () => {
    const { data: session } = useSession();
    const { getAllMealFood} = useMeal(session?.user.id, session?.user.sessionToken);

    const [meals, setMeals] = useState<MealType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    console.log("MealsMenu.tsx: ", meals);

    useEffect(() => {
        const fetchMeals = async () => {
            if (session && session.user) {
                const data = await getAllMealFood()
                setMeals(data);
                setIsLoading(false);
            }
        };

        fetchMeals();
    }, [session, getAllMealFood]);

    if (isLoading) {
        return <div className="flex justify-center items-center text-gray-500 text-lg">Loading...</div>;
    }

    return (
        <div className="bg-white
        shadow-sm
        rounded-lg
        p-4
        xl:max-w-lg
        sm:max-w-lg
        lg:max-w-lg
        mx-auto
        w-full
        sm:w-auto
        space-y-4
        min-h-[20rem]">
            <Meal label="breakfast" icon={MdFreeBreakfast} foods={meals.filter((meal) => meal.mealType === "breakfast")} />
            <Meal label="lunch" icon={GiChickenOven} foods={meals.filter((meal) => meal.mealType === "lunch")} />
            <Meal label="dinner" icon={GiHotMeal} foods={meals.filter((meal) => meal.mealType === "dinner")} />
            <Meal label="snack" icon={GiShinyApple} foods={meals.filter((meal) => meal.mealType === "snack")} />
        </div>
    );
};

export default MealsMenu;
