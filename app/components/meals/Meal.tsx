'use client';
import ListFood from "@/app/components/meals/ListFood";
import { IconType } from "react-icons";
import useMeal from "@/app/hooks/useMeal";
import {MealType} from "@/app/types";

interface MealProps {
    label: string;
    icon: IconType;
    foods: MealType[];
}

const Meal: React.FC<MealProps> = ({ label, icon: Icon, foods }) => {
    return (
        <div className="relative flex bg-white shadow-sm rounded-lg p-4 mx-auto mb-4 flex-col min-w-full ">
            <div className="flex flex-row items-center space-x-2 text-gray-700 text-sm font-semibold">
                <Icon size={18} className="text-neutral-600 text-rose-500" />
                <div className="text-2xl">{label}</div>
            </div>
            <hr className="border-gray-200 my-2"/>
            <ListFood foods={foods} />
        </div>
    );
};

export default Meal;
