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

    const { getAllMealFood} = useMeal(session?.user.id, session?.user.sessionToken);

    const [meals, setMeals] = useState<MealType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [consumed, setConsumed] = useState(0);
    const [totalCalories, setTotalCalories] = useState(0);
    const [totalProtein, setTotalProtein] = useState(0);
    const [totalCarbohydrates, setTotalCarbohydrates] = useState(0);
    const [totalLipids, setTotalLipids] = useState(0);

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

    useEffect(() => {
        let calories = 0;
        let protein = 0;
        let carbs = 0;
        let fat = 0;

        meals.forEach(meal => {
            calories += meal.calories * meal.quantity/100;
            protein += meal.protein * meal.quantity/100;
            carbs += meal.carbs * meal.quantity/100;
            fat += meal.fat * meal.quantity/100;
        });

        setTotalCalories(calories);
        setTotalProtein(protein);
        setTotalCarbohydrates(carbs);
        setTotalLipids(fat);
        setConsumed(calories);  // Supposant que "consommé" est le total des calories
    }, [meals]);


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
                    <MealsMenu meals={meals}/>
                </div>
                    <div className="">
                        <CircleNutrients
                            consumed={consumed} total={session?.user.dailyCalories ? session?.user.dailyCalories : 2700}
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
