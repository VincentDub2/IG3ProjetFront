import axios from "axios";

export default async function getCurrentUser() {
  try {

    const response = await axios.get('http://localhost:8080/user/actual', {
      withCredentials: true,
    });

    if (response.status !== 200) {
      console.error('Error: Cannot get current user');
      return null;
    }

    return response.data;
  } catch (error) {
    return null;
  }
}
