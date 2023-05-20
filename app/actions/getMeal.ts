// Action/getBrands.js
import axios from "axios";

import moment from "moment/moment";
import {MealType} from "@/app/types";

export async function getFoodEeatToDay(userId : String ,token:String): Promise<MealType[]>{
    //const date = moment().utc().format('YYYY-MM-DDTHH:mm:ssZ');
    const date = moment().format('YYYY-MM-DD');

    try {
        const response = await axios.get(`http://localhost:8080/meals/${userId}/${date}`, { withCredentials: true, headers: {
                Authorization: `Eattrack-Auth-${token}`
            }});
        if (response.status !== 200) {
            console.error('Error: Cannot get meals');
            [];
        }

        return response.data;
    } catch (error) {
        console.error('Error fetching meals:', error);
        return [];
    }
};
