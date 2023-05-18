import { useState } from 'react';
import Modal from './Modal';
import Button from '../Button';
import Select from 'react-select';
import moment from "moment";
import axios from "axios";
import {toast} from "react-hot-toast";
import useLoginModal from "@/app/hooks/useLoginModal";
import Input from "@/app/components/inputs/Input";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {FieldValues,SubmitHandler, useForm} from "react-hook-form";
import Heading from "@/app/components/Heading";
import {number} from "prop-types";
import {Food} from "@/app/types";
import useDate from "@/app/hooks/useDate";
import {useSession} from "next-auth/react";

type FoodType = {
    food :Food;
    isOpen: boolean;
    onClose: () => void;
    userId: string | undefined;
};

const AddFoodModal: React.FC<FoodType> = ({ food, isOpen, onClose ,userId}) => {
    const [grams, setGrams] = useState('');
    const [meal, setMeal] = useState('');
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {data: session} = useSession();


    const mealOptions  = [
        { value: 'breakfast', label: 'Breakfast' },
        { value: 'lunch', label: 'Lunch' },
        { value: 'dinner', label: 'Dinner' },
        { value: 'snack', label: 'Snack' },
    ];

    const date = useDate();

    const handleSubmit = () => {

        if (!userId) {
            toast('Please login first');
            loginModal.onOpen();
            return;
        }

        console.log(food);

        if(!food._id){
            toast('Something went wrong');
            return;
        }
        // Handle form submission logic here
        const data ={
            foodId: food._id,
            mealType : meal,
            userId: userId,
            quantity: Number(grams),
            date: date
        }

        setIsLoading(true);

        axios.post('http://localhost:8080/meal/add', data,{ headers: {
                Authorization: `Eattrack-Auth-${session?.user.sessionToken}`}})
            .then(() => {
                toast.success('Food added!');

            })
            .catch((error) => {
                toast.error(error.message);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContent = (
            <div className="flex flex-col gap-4">
                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">Grams</label>
                    <input
                        type="number"
                        value={grams}
                        onChange={(e) => setGrams(e.target.value)}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 p-2 hover:border-gray-700 transition duration-150"
                    />
                </div>

                <div className="my-4">
                    <label className="block text-sm font-medium text-gray-700">Meal</label>
                    <Select
                        options={mealOptions}
                        onChange={(selectedOption) => setMeal(selectedOption!.value)}
                        isSearchable={false}
                        className="mt-1 block w-full rounded-md shadow-sm border-gray-300 p-2 "
                    />
                </div>
            </div>
    );


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            litle={true}
            disabled={isLoading}
            onSubmit={()=>handleSubmit()}
            title="Confirm Food"
            actionLabel="Add"
            body={bodyContent}
            footer={
                <div className="text-center text-gray-600 text-xs">
                    Please select the meal and enter the quantity in grams
                </div>
            }
        />
    );
};

export default AddFoodModal;
