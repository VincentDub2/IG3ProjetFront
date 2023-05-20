import axios from "axios";
import {Session} from "@/app/types"

export default async function getCurrentUser()  {
  try {

    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, { withCredentials: true });
    if (response.status !== 200) {
      console.error('Error: Cannot get current user');
      return null;
    }

    return response.data;
  } catch (error) {
    return null;
  }
}
