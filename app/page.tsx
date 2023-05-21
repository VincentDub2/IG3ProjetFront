'use client'
import Container from "@/app/components/Container";
import ClientOnly from "./components/ClientOnly";
import MealsMenu from "@/app/components/meals/MealsMenu";
import CircleNutrients from "@/app/components/CircleNutrients/CircleNutrients";
import NutritionAdvice from "@/app/components/Advice/NutritionAdvice";
import useMeal from "@/app/hooks/useMeal";
import {MealType} from "@/app/types";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

import useEditFoodModal from '@/app/hooks/useEditFoodModal';

const Home  =()  => {

    const { data: session } = useSession();

    const userId = session?.user?.id ?? '';
    const sessionToken = session?.user?.sessionToken ?? '';

    const {consumed ,
        foods,
        totalProtein,
        totalCarbohydrates,
        totalLipids,
        totalCalories,
        isLoading,
        getAllMealFoods
    } = useMeal(userId, sessionToken);

    useEffect(() => {
        const updateFoods = () => {
            getAllMealFoods();
        };

        window.addEventListener('mealUpdated', updateFoods);

        return () => {
            // clean up
            window.removeEventListener('mealUpdated', updateFoods);
        };
    }, [getAllMealFoods]);


    return (
        <ClientOnly>
            <Container>
                <div
                    className="
            pt-12
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-4
            2xl:grid-cols-5
            gap-9
          ">
                <div className="md:col-span-2 xl:col-span-2">
                    <MealsMenu meals={foods}/>
                </div>
                    <div className="">
                        <CircleNutrients
                            consumed={totalCalories} total={session?.user.dailyCalories ? session?.user.dailyCalories : 2700}
                           proteinTarget={session?.user.dailyProtein ? session?.user.dailyProtein : 100}
                            proteinValue={totalProtein}
                            carbohydrateTarget={session?.user.dailyCarbs ? session?.user.dailyCarbs : 100}
                            carbohydrateValue={totalCarbohydrates}
                            lipidTarget={session?.user.dailyFat ? session?.user.dailyFat : 100}
                            lipidValue={totalLipids}
                        />
                    </div>
                    <div className="">
                        <NutritionAdvice />
                    </div>
                </div>
            </Container>
        </ClientOnly>
    )
}
export default Home;
