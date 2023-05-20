'use client'


import React, { useEffect, useState } from 'react';

import FoodList from './FoodList';
import useLoginModal from "@/app/hooks/useLoginModal";

import {useRouter} from "next/navigation";

import {useSession} from "next-auth/react";


import {toast} from "react-hot-toast";
import useFood from "@/app/hooks/useFood";

import {Box, Container, Heading,Text} from "@chakra-ui/react";

import Button from "@/app/components/Button";

import useAddProductModal from "@/app/hooks/useAddProductModal";


import { ChakraProvider } from '@chakra-ui/react';
import EditFoodModal from "@/app/myFood/EditFoodModal";
import {Food} from "@/app/types";
import useEditFoodModal from "@/app/hooks/useEditFoodModal";
const MyFood = () => {

    const loginModal = useLoginModal();

    const AddFoodModal = useAddProductModal();

    const editFoodModal = useEditFoodModal();

    const onTogle = () => {
        AddFoodModal.onOpen();
    }
    const router = useRouter();

    const { data: session } = useSession();

    setTimeout(() => {}, 1000); // On a timer to avoid a warning

    if (!session?.user) {

        router.push('/');

        setTimeout(() => {
            toast("You must be logged in to view this page.");
            loginModal.onOpen();
        }, 1000);
    }

    const userId = session?.user?.id ?? '';
    const sessionToken = session?.user?.sessionToken ?? '';

    const { deleteFood,updateFood,getAllFoodFromThisUser, foods } = useFood(userId, sessionToken)

    useEffect(() => {
        const updateFoods = () => {
            getAllFoodFromThisUser();
        };

        window.addEventListener('foodUpdated', updateFoods);

        return () => {
            // clean up
            window.removeEventListener('foodUpdated', updateFoods);
        };
    }, [getAllFoodFromThisUser]);


    return (
            <ChakraProvider>
                <EditFoodModal
                    isOpen={editFoodModal.isOpen}
                    food={editFoodModal.currentFood}
                    onClose={editFoodModal.onClose}
                    updateFood={updateFood}
                />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="100vh"
                bgGradient="linear(to-r, rose-500, pink-500)"
            >
                <Container maxW="container.md">
                    <Box
                        borderRadius="lg"
                        bg="white"
                        p={6}
                        boxShadow="xl"
                        textAlign="center"
                    >
                        <Heading as="h1" size="2xl" mb={6} color="gray.700">
                            Your Foods
                        </Heading>

                        {foods.length === 0 ? (
                            <Text color="gray.500">You have no foods yet...</Text>
                        ) : (
                            <FoodList foods={foods} handleRemove={deleteFood} handleEdit={()=> {}}/>
                        )}
                        <div className="pt-14">
                            <Button label="Add a food" onClick={onTogle}/>
                        </div>
                    </Box>
                </Container>
            </Box>
            </ChakraProvider>
    );
};

export default MyFood;