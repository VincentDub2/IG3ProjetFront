'use client';

import {Food} from "@/app/types";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import {useSearchContext} from "@/app/contexts/searchContext";
import {useCallback, useEffect, useMemo, useState} from "react";
import getFoodSearch from "@/app/actions/getFoodSearch";
import {useSearchParams} from "next/navigation";
import Button from "@/app/components/Button";
import Search from "@/app/components/navbar/Search";

import useAddProductModal from "@/app/hooks/useAddProductModal";
import {MdError} from "react-icons/md";
import {AiOutlinePlus,AiOutlinePlusCircle} from "react-icons/ai";
import addFoodMealModal from "@/app/components/modals/AddFoodMealModal";
import AddFoodModal from "@/app/components/modals/AddFoodMealModal";
import {useSession} from "next-auth/react";
import {toast} from "react-hot-toast";




const SearchModalFood = () => {

    // Tout les hooks permettant la gestion d'affichage des modals
    const searchModal = useSearchModal();
    const addProductModal = useAddProductModal();

    const session = useSession();



    const [isModalOpen, setIsModalOpen] = useState(false);



    const [selectedFood , setSelectedFood] = useState<Food | null>(null)


    const handleAddFood = (food : Food | null) => {
        if (!session.data) {
            toast.error('Vous devez être connecté pour ajouter un aliment');
            return;
        }
        if (!food) {
            toast.error('Une erreur est survenue');
            return;
        }
        setSelectedFood(food);
        setIsModalOpen(true);
      return;
    };

    //ici on va recuperer l'aliment recherché via la barre de recherche
    const  params = useSearchParams();

    const term = params?.get('searchTerm');

    const [foods, setFoods] = useState<Food[]>([]);


    // Gestion d'ouverture du formulaire d'ajoute d'alimment
    // et fermeture de la modal de recherche
    const onToggle = useCallback(() => {
        if (session.status === 'unauthenticated') {
            toast.error('Vous devez être connecté pour ajouter un aliment');
            return;
        }

        addProductModal.onOpen();
        searchModal.onClose();

    }, [searchModal, addProductModal])

    const fetchData = async (term : string) => {
        const results = await getFoodSearch(term);
        if (!results) {
            setFoods([]);
            return;
        }else {
            setFoods(results);
            return;
        }
    };


    useEffect(() => {
        if (term) {
            fetchData(term);
        }
    }, [term]);

    let bodyContent = (
        <div className="flex flex-col">
            <div className="flex justify-center w-full pb-5">
                <Search/>
            </div>
            <div className="-my-2 sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                            <tr>
                                <th>Food</th>
                            </tr>
                            </thead>
                            <div className="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200">
                            {foods.length > 0 ? (
                                foods.map((food: Food, index) => (

                                    <div key={index} className="bg-white shadow-md rounded-lg w-full p-4 mb-4 mt-2 ml-2 mr-2">
                                        <div className="pl-2 pr-2 flex flex-col">
                                            <div className="flex justify-between items-center">
                                                <h2 className="font-bold text-lg mb-2">{food.name}</h2>
                                                <button onClick={() => handleAddFood(food)} className="text-rose-500 hover:text-rose-600">
                                                    <AiOutlinePlusCircle size={20} />
                                                </button>
                                            </div>
                                            <p className="text-gray-700">{food.brand}</p>
                                            <div className="flex flex-row justify-between">
                                                <p className="mt-2 text-sm text-gray-500">Category: {food.foodCategory}</p>
                                                <p className="text-sm text-gray-500">Calories: {food.calories}</p>
                                            </div>
                                            <hr className="my-2"/>
                                            <div className="flex justify-between">
                                                <p className="text-sm text-gray-500">Carbs: {food.carbs}</p>
                                                <p className="text-sm text-gray-500">Protein: {food.protein}</p>
                                                <p className="text-sm text-gray-500">Fat: {food.fat}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center p-10 text-gray-500">
                                    <MdError size={50} />
                                    <div className="mt-5 text-lg">
                                        NO RESULT
                                    </div>
                                </div>
                            )}
                                {selectedFood && (
                                    <AddFoodModal
                                        isOpen={isModalOpen}
                                        onClose={() => setIsModalOpen(false)}
                                        food={selectedFood}
                                    />
                                )}
                            </div>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <div>
            <Modal
                isOpen={searchModal.isOpen}
                onClose={searchModal.onClose}
                onSubmit={() =>{}}
                   title="Result search"
                   actionLabel ="Search"
                secondaryAction={()=>onToggle()}
                secondaryActionLabel="Add a product"
                body={bodyContent}
                />
        </div>
    );
}

export default SearchModalFood;