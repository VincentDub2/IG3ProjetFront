import React, { useState } from 'react';
import Select from 'react-select';
import useBrands from '@/app/hooks/useBrands';
import {BrandSelectValue} from '@/app/types';
import {ValueType} from "tailwindcss/types/config";
import { CSSObject } from '@emotion/react';
import { OptionProps } from 'react-select';


interface BrandSelectProps {
    value?: BrandSelectValue;
    onChange: (value: BrandSelectValue | null) => void;
}

const BrandSelect: React.FC<BrandSelectProps> = ({ value, onChange }) => {
    const { getAll } = useBrands();
    const brands = getAll();

    const formatOptionLabel = (option: BrandSelectValue) => (
        <div className="flex flex-row items-center gap-3 z-10 opacity-80">
            <div>{option.name}</div>
        </div>
    );

    // Trouver l'option correspondante dans le tableau de marques
    const selectedBrand = brands.find(brand => brand.id === value?.id);


    const customStyles = {
        option: (provided :CSSObject , state : OptionProps<BrandSelectValue, boolean>) => ({
            ...provided,
            color: state.isSelected ? 'pink' : 'black',
            backgroundColor: state.isSelected ? 'white' : 'white',
            backdropOpacity : 1,
        }),
        menu: (provided: CSSObject) => ({
            ...provided,
            zIndex: 20
        }),
        // autres styles personnalisés ici...
    }


    return (
        <Select
            placeholder="Select a brand"
            isClearable
            options={brands}
            value={selectedBrand}
            styles={customStyles}
            onChange={(selectedValue) => {
                if (selectedValue === null) {
                    onChange(null);
                } else {
                    onChange(selectedValue as BrandSelectValue);
                }
            }}

            formatOptionLabel={formatOptionLabel}
            classNamePrefix="react-select"
            classNames={{
                option:() => 'text-lg',
                control:() => 'p-3 border-2',
                input : () => 'text-lg',
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#ffe4e6',
                },
            })}
        />
    );
};

export default BrandSelect;
