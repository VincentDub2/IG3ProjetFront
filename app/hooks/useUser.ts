// useUser.ts
import { useEffect, useState } from 'react';
import { User } from '../types';
import axios from "axios";


type UseUserResponse = {
    user: User | null;
    error: string | null;
    isLoading: boolean;
    updateUser: (updatedUser: User) => Promise<User | void>;
};

const useUser = (userId: string, sessionToken: string): UseUserResponse => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const getUser = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/actual`, {
                headers: {
                    'Authorization': `Eattrack-Auth-${sessionToken}`,
                },
            });

            if (!response.ok) {
                setError('Failed to get user');
                return;
            }

            const data = await response.json();
            setError(null);
            setUser(data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    const updateUser = async (updatedUser: User) : Promise<User | void> => {
        setIsLoading(true);
        try {
            const response  = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/${userId}`, updatedUser,{ withCredentials: true, headers: {
                    Authorization: `Eattrack-Auth-${sessionToken}`
            }});
            if (response.status !== 200) {
                setError('Failed to update user');
                return;

            }
            console.log("Response", response.data);

            setUser(response.data);
            setError(null);
            return response.data;

        } catch (error) {
            console.log(error);
        }finally {
            setIsLoading(false);
        }{
        }
    };



    useEffect(() => {
        getUser();
    }, [userId]);

    return { user, error, isLoading, updateUser};
};

export default useUser;
