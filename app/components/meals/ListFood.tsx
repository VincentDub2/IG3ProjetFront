'use client';
import {Food, MealType} from "@/app/types";

interface ListFoodProps {
    foods: MealType[];
}

const ListFood: React.FC<ListFoodProps> = ({ foods }) => {
    return (
        <div className="pr-3">
            {foods.map((item) => (
                <div key={item.id} className="flex flex-col space-y-1 p-2">
                    <div className="text-sm text-gray-700 font-light">{item.name}</div>
                    <div className="flex flex-row justify-between text-gray-500 text-xs">
                        <div>
                            {item.quantity} g
                        </div>
                        <div>
                             {item.quantity * item.calories/100} kcal
                        </div>
                    </div>
                    <hr className="border-gray-200 mt-2"/>
                </div>
            ))}
        </div>
    );
};

export default ListFood;
