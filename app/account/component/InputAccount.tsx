'use client'
import React, {useEffect, useState} from "react";
import {Control, FieldErrors, FieldValues, UseFormRegister, UseFormWatch, useWatch} from "react-hook-form";

interface InputProps {
    id: string;
    label: string;
    type?: string;
    disabled?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: FieldErrors;
    control: Control<FieldValues>;
    watch: UseFormWatch<FieldValues>;
}

const InputAccount: React.FC<InputProps> = ({
                                                id,
                                                label,
                                                type = "text",
                                                disabled,
                                                register,
                                                errors,
                                            control,
                                                watch,

                                            }) => {

    // Regarder la valeur du champ.
    const watchValue = useWatch({
        control,
        name: id,
    });

    const [isFocused, setFocus] = useState(false);
    const [hasValue, setValue] = useState(false);

    const fieldValue = watch(id);

    useEffect(() => {
        setValue(fieldValue !== undefined && fieldValue !== "");
    }, [fieldValue]);




    const handleFocus = () => {
        setFocus(true);
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        setFocus(false);
        setValue(event.target.value !== "");
    };

    return (
        <div className="h-8 flex-col flex w-full relative mb-6">
            <input
                id={id}
                disabled={disabled}
                {...register(id)}
                placeholder=" "
                type={type}
                className={`
          focus:outline-none 
          focus:border-rose-500 
          w-full 
          py-2 
          px-3 
          text-grey-darker
           border-b-2 
           border-gray-300
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
            <label
                htmlFor={id}
                className={`
            absolute
          text-sm
          duration-150 
          transform 
          top-5 
          z-10 
          origin-[0]
          ${hasValue || isFocused ? "scale-75 -translate-y-8" : "scale-100 translate-y-0"}
          ${errors[id] ? "text-rose-500" : "text-gray-700"}
        `}
            >
                {label}
            </label>
        </div>
    );
};

export default InputAccount;
