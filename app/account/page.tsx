'use client';

import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import { toast } from "react-hot-toast";
import InputAccount from "./component/InputAccount";
import useUser from "../hooks/useUser";
import {User} from "@/app/types";
import {useSession} from "next-auth/react";
import ClientOnly from "@/app/components/ClientOnly";
import {useEffect, useState} from "react";
import Select from "@/app/account/component/Select";
import sanitizeUserInput from "@/app/service/sanatizeUserInput";

import useLoginModal from "@/app/hooks/useLoginModal";

import { useRouter } from "next/navigation";


const Account = () => {
    const loginModal = useLoginModal();
    const router = useRouter();

    const { data: session } = useSession();

    useEffect(() => {
        if (!session) {
            router.push('/');
            toast("You must be logged in to view this page.");
            loginModal.onOpen();
        }
    }, [session]);


    const userId = session?.user?.id ?? '';const sessionToken = session?.user?.sessionToken ?? '';



    const { user, updateUser,error } = useUser(userId, sessionToken);
    const [isLoading, setIsLoading] = useState(false);


    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue
    } = useForm<FieldValues>();

    useEffect(() => {
        if (user) {
            setValue("name", user.name);
            setValue("email", user.email);
            setValue("size", user.size);
            setValue("weight", user.weight);
        }
    }, [user, setValue]);

    const onSubmit: SubmitHandler<Partial<User>> = async (data) => {
        setIsLoading(true);
        try {
            const sanitizedData = sanitizeUserInput(data);
            await updateUser(sanitizedData as User);
            if(error===null){
                toast.success("Your account information was updated!");
            }else {
                toast.error("There was an error updating your account.");
            }
        } catch (error) {
            toast.error("There was an error updating your account.");
        }finally {
            setIsLoading(false);
        }
    }

    return (
        <ClientOnly>
            <div className=" relative h-auto sm:pl-[60px] sm:pr-[60px] bg-gray-100 py-6 flex flex-col justify-center sm:py-12 overflow-hidden">
                <div className="relative py-3 sm:max-w-xl mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-r from-rose-200 to-rose-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                    <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                        <div className="max-w-md mx-auto">
                            <div>
                                <h1 className="text-2xl font-semibold">Hi { user?.name ?? 'Anonyme'},</h1>
                                <p className="text-gray-500">You can update your profile here:</p>
                            </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10 max-w-lg mx-auto">
            <InputAccount
                id="name"
                label="Name"
                disabled={false}
                register={register}
                errors={errors}
            />
            <InputAccount
                id="email"
                label="Email"
                disabled={false}
                register={register}
                errors={errors}
            />
            <InputAccount
                id="age"
                label="Age"
                disabled={false}
                type="number"
                register={register}
                errors={errors}
            />
            <Select
                id="gender"
                label="Gender"
                options={["male","female"]}
                register={register}
                errors={errors}
            />
            <InputAccount
                id="weight"
                label="Weight"
                type="number"
                disabled={false}
                register={register}
                errors={errors}
            />
            <InputAccount
                id="size"
                label="Size"
                disabled={false}
                register={register}
                errors={errors}
            />
            <Select
                id="goal"
                label="Goal"
                options={["lose_weight", "gain_weight", "maintain_weight"]}
                register={register}
                errors={errors}
            />
            <Select
                id="activityLevel"
                label="Activity Level"
                options={["sedentary", "lightly_active", "moderately_active", "very_active", "extra_active"]}
                register={register}
                errors={errors}
            />
            <InputAccount
                id="targetWeight"
                label="target weight"
                type="number"
                disabled={false}
                register={register}
                errors={errors}
            />
            <InputAccount
                id="percentageFat"
                label="percentage lipide"
                type="number"
                disabled={false}
                register={register}
                errors={errors}
            />
            <InputAccount
                id="percentageProtein"
                label="percentage protein"
                type="number"
                disabled={false}
                register={register}
                errors={errors}
            />
            <InputAccount
                id="percentageCarbs"
                label="percentage carbs"
                type="number"
                disabled={false}
                register={register}
                errors={errors}
            />

            {/* Add more inputs as needed... */}
            <button type="submit" className="btn btn-primary hover:text-rose-500">Update Account</button>
        </form>
                            </div>
                        </div>
                    </div>
                </div>
        </ClientOnly>
    );
}

export default Account;
