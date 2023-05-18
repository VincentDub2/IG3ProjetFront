import axios from "axios";


export default async function getFoodSearch(term : string) {
    try {
        const response = await axios.get(`http://localhost:8080/food/search?q=${term}`);

        if (response.status !== 200) {
            console.error('Error: Cannot get food');
            return null;
        }

        return response.data;
    } catch (error) {
        console.error('Error in get food :', error);
        return null;
    }
}
