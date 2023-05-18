import { useState, useEffect } from 'react';
import { fetchBrands } from '@/app/actions/getBrands';
import {BrandSelectValue} from "@/app/types";



const useBrands = () => {
    // Utiliser l'état pour stocker les marques récupérées
    const [brands, setBrands] = useState<BrandSelectValue[]>([]);

    // Utiliser useEffect pour récupérer les marques lors de l'initialisation du composant
    useEffect(() => {
        // Définir une fonction asynchrone pour récupérer et définir les marques
        const fetchAndSetBrands = async () => {
            const fetchedBrands = await fetchBrands();
            setBrands(fetchedBrands);
        };

        // Appeler la fonction asynchrone pour récupérer les marques
        fetchAndSetBrands().then();
    }, []); // Le tableau vide indique que cet effet ne doit être exécuté qu'une fois lors du montage du composant

    // Fonction pour obtenir toutes les marques
    const getAll = () => brands;

    // Fonction pour obtenir une marque spécifique par sa valeur
    const getById = (id: string) => {
        return brands.find((item) => item.id === id);
    };

    // Retourner les fonctions pour être utilisées dans d'autres composants
    return {
        getAll,
        getById,
    };
};

// Exporter le hook useBrands pour être utilisé dans d'autres composants
export default useBrands;
