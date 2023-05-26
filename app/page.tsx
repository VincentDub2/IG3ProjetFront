'use client'

//page.tsx

import Container from "@/app/components/Container";
import ClientOnly from "./components/ClientOnly";
import MealsMenu from "@/app/components/meals/MealsMenu";
import CircleNutrients from "@/app/components/CircleNutrients/CircleNutrients";
import NutritionAdvice from "@/app/components/Advice/NutritionAdvice";
import useMeal from "@/app/hooks/useMeal";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";

import useEditFoodModal from '@/app/hooks/useEditFoodModal';
import Carousel from "@/app/components/FlipCard/Carousel";
import useUser from "@/app/hooks/useUser";
import {number} from "prop-types";

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

    const {user, updateUser, error} = useUser(userId, sessionToken);

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

    console.log(session?.user);

    const daylyLipidGram = ()=> {
        if (user?.dailyCalories && user?.percentageFat) {
            return Number((user?.dailyCalories*user?.percentageFat/9/100).toFixed(0));
        }
        return 40
    }
    const daylyProteinGram = ()=> {
        if (user?.dailyCalories && user?.percentageProtein) {
            return Number((user?.dailyCalories*user?.percentageProtein/4/100).toFixed(0));
        }
        return 120;
    }
    console.log(daylyLipidGram())

    const daylyCarbohydratesGram = ()=> {
        if (user?.dailyCalories && user?.percentageCarbs) {
            return Number((user?.dailyCalories*user?.percentageCarbs/4/100).toFixed(0));
        }
        return 150;
    }


    return (
        <ClientOnly>
            <Container>
                <div
                    className="
            pt-12
            grid
            grid-cols-1
            sm:grid-cols-1
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-4
            2xl:grid-cols-5
            gap-9
          ">
                    <div className="
                    md:col-span-2
                    xl:col-span-2
                    h-full
                    lg:pl-14
                    ">
                        <MealsMenu meals={foods}/>
                    </div>

                    <div className="
                    md:col-span-1
                    lg:col-span-2
                    lg:w-2/4
                    lg:h-2/4
                    md:w-full
                    md:h-full
                    sm:w-2/4
                    sm:mx-auto
                    sm:h-2/4
                    justify-center
                    flex
                    ">
                        <CircleNutrients
                            consumed={totalCalories} total={user?.dailyCalories || 2700}
                            proteinTarget={daylyProteinGram()}
                            proteinValue={Number((totalProtein/4).toFixed(0))}
                            carbohydrateTarget={daylyCarbohydratesGram()}
                            carbohydrateValue={Number((totalCarbohydrates/4).toFixed(0))}
                            lipidTarget={daylyLipidGram()}
                            lipidValue={Number((totalLipids/9).toFixed(0))}
                        />
                    </div>
                    <div className="
                    col-span-full
                    xl:pr-24
                    xl:pl-24
                    lg:pr-24
                    lg:pl-24
                    lg:pt-14
                    2xl:pr-24
                    2xl:pl-24
                    rounded-md
                    h-full
                    border-rose-500
                    sm:pt-10
                    ">
                        <Carousel />
                    </div>
                </div>
            </Container>
        </ClientOnly>
    );
}
export default Home;
