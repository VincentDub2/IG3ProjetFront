// Action/getBrands.js
import axios from "axios";

export async function fetchBrands(){
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/brands`); // Remplacez par l'URL de votre API pour récupérer les marques

        if (response.status !== 200) {
            console.error('Error: Cannot get brands');
            return null;
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching brands:', error);
        return [];
    }
};
