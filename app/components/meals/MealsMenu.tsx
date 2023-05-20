'use client';
import Meal from "@/app/components/meals/Meal";
import { MdFreeBreakfast } from "react-icons/md";
import { GiChickenOven, GiHotMeal, GiShinyApple } from "react-icons/gi";
import { useEffect, useState } from "react";
import { MealType } from "@/app/types";
import { useSession } from "next-auth/react";
import useMeal from "@/app/hooks/useMeal";
import Circle from "@/app/components/CircleNutrients/Circle";


interface MealsMenuProps {
    meals: MealType[];
}

const MealsMenu : React.FC<MealsMenuProps> = ({meals}) => {

    return (
        <div className="
        grid
        grid-cols-1
        sm:grid-cols-1
        md:grid-cols-2
        lg:grid-cols-2
        xl:grid-cols-2
        2xl:grid-cols-4
        bg-gray-100
        shadow-sm
        rounded-lg
        p-4
        mx-auto
        sm:w-auto
        space-y-4
        sm:max-h-screen
        sm:overflow-y-auto
        min-h-[400px]
        ">
            <div className="grid grid-cols-2 gap-4 md:col-span-2 lg:col-span-2 xl:col-span-2 2xl:col-span-2">
                <div className="grid grid-cols-1">
                    <Meal label="breakfast" icon={MdFreeBreakfast} foods={meals.filter((meal) => meal.mealType === "breakfast")} />
                    <Meal label="lunch" icon={GiChickenOven} foods={meals.filter((meal) => meal.mealType === "lunch")} />
                </div>
                <div className="grid grid-cols-1">
                    <Meal label="dinner" icon={GiHotMeal} foods={meals.filter((meal) => meal.mealType === "dinner")} />
                    <Meal label="snack" icon={GiShinyApple} foods={meals.filter((meal) => meal.mealType === "snack")} />
                </div>
            </div>
        </div>
    );
};

export default MealsMenu;
