'use client'


import Circle from "@/app/components/CircleNutrients/Circle";
import LitleCircles from "@/app/components/CircleNutrients/LitleCircles";

interface CircleNutrientsProps {
    consumed: number;
    total: number;
    proteinValue: number;
    proteinTarget: number;
    carbohydrateValue: number;
    carbohydrateTarget: number;
    lipidValue: number;
    lipidTarget: number;
}


const CircleNutrients : React.FC<CircleNutrientsProps> = ({
                                                              consumed,
                                                              total,
                                                                proteinValue,
                                                                proteinTarget,
                                                                carbohydrateValue,
                                                                carbohydrateTarget,
                                                                lipidValue,
                                                                lipidTarget,

                                                          }) => {
    return (
        <div>
            <div className="mr-2 ml-2">
            <Circle consumed={consumed} total={total} color="#f43f5e"/>
             </div>
            <LitleCircles  proteinValue={proteinValue} proteinTarget={proteinTarget}
                           carbohydrateValue={carbohydrateValue} carbohydrateTarget={carbohydrateTarget}
                            lipidValue={lipidValue} lipidTarget={lipidTarget}

            />
        </div>
    )
}

export default CircleNutrients;