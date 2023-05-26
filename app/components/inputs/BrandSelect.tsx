'use client';
import React, { useState } from 'react';
import Select from 'react-select';
import useBrands from '@/app/hooks/useBrands';
import { BrandSelectValue } from '@/app/types';
import { CSSObject } from '@emotion/react';
import { OptionProps } from 'react-select';

/**
 * BrandSelect permet de sélectionner une marque.
 * c'est un menu déroulant qui affiche toutes les marques disponibles.
 */


/**
 * Propriétés du composant BrandSelect.
 */
interface BrandSelectProps {
    value?: BrandSelectValue;
    onChange: (value: BrandSelectValue | null) => void;
}

/**
 * Composant BrandSelect permettant de sélectionner une marque.
 */
const BrandSelect: React.FC<BrandSelectProps> = ({ value, onChange }) => {
    // Récupérer toutes les marques via le hook useBrands
    const { getAll } = useBrands();
    const brands = getAll();

    /**
     * Fonction de formatage de l'étiquette d'une option de sélection.
     * @param option - L'option à formater.
     * @returns Le contenu JSX de l'étiquette formatée.
     */
    const formatOptionLabel = (option: BrandSelectValue) => (
        <div className="flex flex-row items-center gap-3 z-10 opacity-80">
            <div>{option.name}</div>
        </div>
    );

    // Trouver l'option correspondante dans le tableau de marques
    const selectedBrand = brands.find((brand) => brand.id === value?.id);

    /**
     * Styles personnalisés pour les options de sélection.
     */
    const customStyles = {
        option: (provided: CSSObject, state: OptionProps<BrandSelectValue, boolean>) => ({
            ...provided,
            color: state.isSelected ? 'pink' : 'black',
            backgroundColor: state.isSelected ? 'white' : 'white',
            backdropOpacity: 1,
        }),
        menu: (provided: CSSObject) => ({
            ...provided,
            zIndex: 20,
        }),
        // autres styles personnalisés ici...
    };

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
                option: () => 'text-lg',
                control: () => 'p-3 border-2',
                input: () => 'text-lg',
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
