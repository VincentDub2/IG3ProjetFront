// useEditFoodModal.js
import { useCallback, useState } from 'react';
import { Food } from '@/app/types';

const useEditFoodModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentFood, setCurrentFood] = useState<Food | undefined>(undefined);

    const onOpen = useCallback((food: Food) => {
        setCurrentFood(food);
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
