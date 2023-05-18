'use client';

import axios from 'axios';
import { toast } from 'react-hot-toast';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation';
import { useMemo, useState } from "react";


import Modal from "./Modal";
import CategoryInput from '../inputs/CategoryInput';
import { categories } from '../navbar/Categories';
import Input from '../inputs/Input';
import Heading from '../Heading';
import { useSession } from "next-auth/react";

import useAddProductModal from "@/app/hooks/useAddProductModal";
import BrandSelect from "@/app/components/inputs/BrandSelect";
import getCurrentUser from "@/app/actions/getCurrentUser";
import brandSelect from "@/app/components/inputs/BrandSelect";



enum STEPS {
    NAME = 0,
    BRAND = 1,
    CATEGORY = 2,
    NUTRIENTS = 3,
    OPTIONAL_NUTRIENTS = 4,
}

const AddProductModal = () => {
    const { data: session } = useSession();

    const router = useRouter(); // Inutile
    const addProductModal = useAddProductModal();

    const [isLoading, setIsLoading] = useState(false);

    const [step, setStep] = useState(STEPS.NAME);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            barcode: '',
            calories: 0,
            protein: 0,
            fat: 0,
            carbs: 0,
            sugar: 0,
            fiber: 0,
            salt: 0,
            servingSize: 100,
            vitamins: 0,
            minerals: 0,
            allergens: 0,
            foodCategory: 'Divers',
        }
    });

    const brandName = watch('brandName');
    const calories = watch('calories');
    const protein = watch('protein');
    const fat = watch('fat');
    const carbs = watch('carbs');
    const sugar = watch('sugar');
    const fiber = watch('fiber');
    const salt = watch('salt');
    const servingsSize = watch('servingsSize');
    const vitamins = watch('vitamins');
    const minerals = watch('minerals');
    const allergens = watch('allergens');
    const foodCategory = watch('foodCategory');
    const brandSelected = watch('brandSelected');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    }

    const onNext = () => {
        setStep((value) => value + 1);
    }

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if (step !== STEPS.OPTIONAL_NUTRIENTS) {
            return onNext();
        }
        console.log("Summiting data :");

        if (!session?.user) {
            toast.error('You must be logged in to create a listing.');
            return;
        }
        console.log(session.user);

        setIsLoading(true);
        const brandToUse = data.brandName || data.brandSelected.name;

        // Convertir les valeurs en nombres
        const numericalData = {
            ...data,
            calories: Number(data.calories),
            protein: Number(data.protein),
            fat: Number(data.fat),
            carbs: Number(data.carbs),
            sugar: Number(data.sugar),
            fiber: Number(data.fiber),
            salt: Number(data.salt),
            servingSize: Number(data.servingSize),
            vitamins: Number(data.vitamins),
            minerals: Number(data.minerals),
            allergens: Number(data.allergens),
            brandName : brandToUse,
        }

        console.log(data);
        console.log("Le sessions token est : ",session?.user.sessionToken);
        axios.post('http://localhost:8080/food/add', numericalData, { headers: {
                Authorization: `Eattrack-Auth-${session?.user.sessionToken}`,

            }, })
            .then(() => {
                toast.success('Listing created!');
                router.refresh();
                reset();
                setStep(STEPS.NAME);
            })
            .catch((error) => {
                if (error.response) {
                    // La requête a été faite et le serveur a répondu avec un statut d'erreur
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // La requête a été faite mais aucune réponse n'a été reçue
                    console.log(error.request);
                } else {
                    // Quelque chose s'est mal passé lors de la mise en place de la requête
                    console.log('Error', error.message);
                }
                console.log(error.config);
                toast.error('Something went wrong.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    const actionLabel = useMemo(() => {
        if (step === STEPS.OPTIONAL_NUTRIENTS) {
            return 'Create'
        }

        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.NAME) {
            return undefined
        }

        return 'Back'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-8">
            <Heading
                title="What's name of your food?"
                subtitle="Pick a category"
            />
            <Input
                id="name"
                label="Name"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    if (step === STEPS.BRAND) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="Who makes it?"
                    subtitle="Pick a brand"
                />
                <BrandSelect
                    value={brandSelected}
                    onChange={(value) => setCustomValue('brandSelected', value)}
                />
                <div className="flex justify-center"> Or </div>
                <Input id="brandName"
                       label="Add a brand"
                       register={register}
                       errors={errors}
                       onChange={() => setCustomValue('brandSelected', null)}
                       />
            </div>
        );
    }
    if (step === STEPS.CATEGORY) {
        bodyContent = (
            <div className="flex flex-col gap-8">
                <Heading
                    title="What category is it?"
                    subtitle="Pick a category"
                />
                <div
                    className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
                >
                    {categories.map((item) => (
                        <div key={item.label} className="col-span-1">
                            <CategoryInput
                                onClick={(foodCategory) =>
                                    setCustomValue('foodCategory', foodCategory)}
                                selected={foodCategory === item.label}
                                label={item.label}
                                icon={item.icon}
                            />
                        </div>
                    ))}
                </div>
            </div>
        );
    };
    if (step === STEPS.NUTRIENTS) {
        bodyContent = (
            <div className="flex flex-col gap-3">
                <Heading
                    title="Share some basics about your meal"
                    subtitle="What nutrients contain your meal " //Nutrients
                />
                <Input id="calories" label="Calories" register={register} errors={errors} type="number" required/>
                <hr />
                <Input id="protein" label="Proteins" errors={errors} register={register} type="number" required/>
                <hr />
                <Input id="fat" label="Lipides" errors={errors} register={register} type="number" required/>
                <hr />
                <Input id="carbs" label="Carbs" errors={errors} register={register} type="number" required/>
                <hr />
                <Input id="sugar" label="Sugars" errors={errors} register={register} type="number" required/>
            </div>
        )
    }
    if (step === STEPS.OPTIONAL_NUTRIENTS){
        bodyContent = (
            <div className="flex flex-col gap-3">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenitis do you have?"
                />
                <Input id="servingSize" label="ServingSize" register={register} errors={errors} type="number"/>
                <hr />
                <Input id="minerals" label="Minerals" errors={errors} register={register} />
                <hr />
                <Input id="allergens" label="Allergens" errors={errors} register={register}/>
                <hr />
                <Input id="vitamins" label="Vitamins" errors={errors} register={register}/>
            </div>
        )
    }
    return (
        <Modal
            disabled={isLoading}
            isOpen={addProductModal.isOpen}
            title="Your health is our priority"
            actionLabel={actionLabel}
            onSubmit={handleSubmit(onSubmit)}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.NAME ? undefined : onBack}
            onClose={addProductModal.onClose}
            body={bodyContent}
        />
    );
}

export default AddProductModal ;