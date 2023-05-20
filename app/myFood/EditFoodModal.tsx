'use client'


import {useState} from 'react';
import Modal from "@/app/components/modals/Modal";
import { Food } from '../types';

interface EditFoodModalProps {
    isOpen: boolean;
    onClose: () => void;
    food?:  Food;
    updateFood: (foodId : String, updatedFood: Food) => Promise<Food | void>;
}

const EditFoodModal : React.FC<EditFoodModalProps> = ({isOpen, onClose, food, updateFood}: EditFoodModalProps) => {
    const [updatedFood, setUpdatedFood] = useState<Food | undefined>(food);


    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        if(updatedFood) {
            setUpdatedFood({
                ...updatedFood,
                [e.target.name]: e.target.value
            });
        }
    }

    const handleUpdateFood = async () => {
        if (!food || !updatedFood) {
            return null;
        }
        await updateFood(food.id, updatedFood as Food);
        onClose();
    }

    const body = (
        <div className="space-y-4">
            <div>
                <label className="block text-gray-700">Food Name</label>
                <input className="block w-full mt-1 p-2 border rounded-md"
                       name="name"
                       value={updatedFood?.name || ''}
                       onChange={handleInputChange}
                />
            </div>
            {/* add more fields as needed */}
        </div>
    )

    return (
        <Modal
            title="Edit Food"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleUpdateFood}
            actionLabel="Update"
            body={body}
        />
    )
}

export default EditFoodModal;
