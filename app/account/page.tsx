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
import {calculateEnergyNeeds} from "@/app/service/calculateInputEnergie";
import Button from "@/app/components/Button";
import useLoginModal from "@/app/hooks/useLoginModal";

import { useRouter } from "next/navigation";


const Account = () => {

    const { data: session } = useSession();



    const userId = session?.user?.id ?? '';const sessionToken = session?.user?.sessionToken ?? '';



    const { user, updateUser,error } = useUser(userId, sessionToken);
    const [isLoading, setIsLoading] = useState(false);


    const {
        register,
        handleSubmit,
        formState: {errors},
        setValue,
        control,
        watch,
    } = useForm<FieldValues>();

    useEffect(() => {
        if (user) {
            setValue("name", user.name || '');
            setValue("email", user.email || '');
            setValue("size", user.size || '');
            setValue("weight", user.weight || '');
            setValue("age", user.age || '');
            setValue("gender",user.gender || '');
            setValue("activityLevel",user.activityLevel || '');
            setValue("targetWeight",user.targetWeight || '');
            setValue("targetDate",user.percentageProtein || '');
            setValue("percentageProtein",user.percentageProtein || '');
            setValue("percentageCarbs",user.percentageCarbs || '');
            setValue("percentageFat",user.percentageFat || '');
            setValue("dailyCalories",user.dailyCalories || '');


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

    const onClickCalcule = () => {
        const formValues = watch();
        const user : User = {
            name: formValues.name,
            email: formValues.email,
            size: formValues.size,
            weight: formValues.weight,
            age: formValues.age,
            id: userId,
            image: '',
            activityLevel: formValues.activityLevel,
            hashedPassword: '',
            emailVerified: '',
            createdAt: '',
            updatedAt: '',
            gender : formValues.gender,
            targetWeight : formValues.targetWeight,
           goalType : formValues.goalType,
            dailyCalories : formValues.dailyCalories,
            percentageProtein : formValues.percentageProtein,
            dailyCarbs : formValues.dailyCarbs,
            percentageCarbs : formValues.percentageCarbs,
            dailyFat : formValues.dailyFat,
            percentageFat : formValues.percentageFat,
            dailyProtein : formValues.dailyProtein,
        };
        const energyNeeds = calculateEnergyNeeds(user);
        if (energyNeeds === 0) {
            toast.error("Somme values are missing.");
            return;
        }
        toast.success("Your daily calories are calculated. You can now save your profile.");

        //On transforme les valeurs en entier
        setValue("dailyCalories",Math.round(energyNeeds));
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
                control={control}
                watch={watch}
            />
            <InputAccount
                id="email"
                label="Email"
                disabled={false}
                register={register}
                errors={errors}
                control={control}
                watch={watch}
            />
            <InputAccount
                id="age"
                label="Age"
                disabled={false}
                type="number"
                register={register}
                errors={errors}
                control={control}
                watch={watch}
            />
            <Select
                id="gender"
                label="Gender"
                options={["male","female"]}
                register={register}
                errors={errors}
                defaultValue={user?.gender || ''}
                control={control}
            />
            <InputAccount
                id="weight"
                label="Weight"
                type="number"
                disabled={false}
                register={register}
                errors={errors}
                control={control}
                watch={watch}
            />
            <InputAccount
                id={"targetWeight"}
                label={"Target Weight"}
                register={register}
                errors={errors}
                control={control}
                watch={watch}
            />
            <InputAccount
                id="size"
                label="Size"
                disabled={false}
                register={register}
                errors={errors}
                control={control}
                watch={watch}
            />
            <Select
                id="goal"
                label="Goal"
                options={["lose_weight", "gain_weight", "maintain_weight"]}
                register={register}
                errors={errors}
                defaultValue={user?.goalType || ''}
                control={control}
            />
            <Select
                id="activityLevel"
                label="Activity Level"
                options={["sedentary", "lightly_active", "moderately_active", "very_active", "extra_active"]}
                register={register}
                errors={errors}
                defaultValue={user?.activityLevel || ''}
                control={control}
            />
            <InputAccount
                id="targetWeight"
                label="target weight"
                type="number"
                disabled={false}
                register={register}
                errors={errors}
                control={control}
                watch={watch}
            />
            <InputAccount
                id={"dailyCalories"}
                label={"daily calories"}
                register={register}
                errors={errors}
                control={control}
                watch={watch}
            />

            <InputAccount
                id="percentageFat"
                label="percentage lipide"
                type="number"
                disabled={false}
                register={register}
                errors={errors}
                control={control}
                watch={watch}
            />
            <InputAccount
                id="percentageProtein"
                label="percentage protein"
                type="number"
                disabled={false}
                register={register}
                errors={errors}
                control={control}
                watch={watch}
            />
            <InputAccount
                id="percentageCarbs"
                label="percentage carbs"
                type="number"
                disabled={false}
                register={register}
                errors={errors}
                control={control}
                watch={watch}
            />

            <div className="flex flex-row space-x-4">
                <Button label={"Update"} onClick={()=>onSubmit}/>

                <Button label={"Calcule"} type={"button"} onClick={()=>onClickCalcule()} outline={true}/>
            </div>

        </form>
                            </div>
                        </div>
                    </div>
                </div>
        </ClientOnly>
    );
}

export default Account;
