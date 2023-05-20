'use client'
import React, { useState } from 'react';
import { FieldValues, UseFormRegister } from "react-hook-form";

interface SelectProps {
    id: string;
    label: string;
    options: string[];
    disabled?: boolean;
    register: UseFormRegister<FieldValues>;
    errors: any;
}

const Select: React.FC<SelectProps> = ({ id, label, options, disabled, register, errors }) => {
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelectionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(event.target.value);
    };

    return (
        <div className="w-full mb-6 relative">
            <div className="inline-block w-full relative">
                <select
                    id={id}
                    {...register(id)}
                    value={selectedOption}
                    onChange={handleSelectionChange}
                    className={`block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline ${errors[id] ? 'border-red-500' : ''}`}
                    disabled={disabled}
                >
                    <option value="">{label}</option>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M0 6l10 9 10-9-2-2-8 7-8-7-2 2z"/>
                    </svg>
                </div>
            </div>
            {errors[id] && (
                <div className="text-red-500 text-xs italic mt-2">{errors[id].message}</div>
            )}
        </div>
    );
};

export default Select;

