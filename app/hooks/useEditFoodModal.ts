// useEditFoodModal.js
import { useCallback, useState } from 'react';
import { Food } from '@/app/types';

const useEditFoodModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentFood, setCurrentFood] = useState<Food | undefined>(undefined);

    const onOpen = useCallback((food: Food) => {
        console.log("Food in modal", food);
        setCurrentFood(food);
        console.log("Current food in modal", currentFood)
        setIsOpen(true);
    }, []);

    const onClose = useCallback(() => {
        setCurrentFood(undefined);
        setIsOpen(false);
    }, []);

    return {
        isOpen,
        currentFood,
        onOpen,
        onClose,
    };
};

export default useEditFoodModal;
