'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import {
    GiBarn,
    GiBoatFishing,
    GiCactus,
    GiCastle,
    GiCaveEntrance,
    GiForestCamp,
    GiIsland, GiMeat, GiChickenLeg,
    GiWindmill, GiFriedFish, GiCroissant
} from 'react-icons/gi';
import { BiBowlRice } from 'react-icons/bi';

import { FaSkiing } from 'react-icons/fa';
import { BsSnow } from 'react-icons/bs';
import { IoDiamond } from 'react-icons/io5';


import Container from './Container';

import CategoryBox from "@/app/components/CategoryBox";


export const categories = [
    {
        label: 'Meat',
        icon: GiMeat,
        description: '',
    },
    {
        label: 'Chicken',
        icon: GiChickenLeg,
        description: '',
    },
    {
        label: 'Rice',
        icon: BiBowlRice,
        description: ''
    },
    {
        label: 'Fish',
        icon: GiFriedFish,
        description: ''
    },
    {
        label: 'Pastries and Viennoiseries',
        icon: GiCroissant,
        description: ''
    },
    {
        label: 'Pools',
        icon: TbPool,
        description: 'This is property has a beautiful pool!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description: 'This property is on an island!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description: 'This property is near a lake!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This property has skiing activies!'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description: 'This property is an ancient castle!'
    },
    {
        label: 'Caves',
        icon: GiCaveEntrance,
        description: 'This property is in a spooky cave!'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description: 'This property offers camping activities!'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This property is in arctic environment!'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This property is in the desert!'
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description: 'This property is in a barn!'
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description: 'This property is brand new and luxurious!'
    }
]

const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();
    const isMainPage = pathname === '/';
    if (!isMainPage) return null;

    return (
        <div>
            <Container >
                <div className="
                pt-4
                flex
                flex-row
                items-center
                justify-between
                overflow-x-auto
                ">
                    {categories.map((items) => (
                        <CategoryBox
                            key={items.label}
                            label={items.label}
                            selected={category === items.label}
                            icon={items.icon}
                        />
                        ))}
                </div>
            </Container>

        </div>
    )
}
export default Categories;


/*
-Baby food: Alimentation pour bébé
-Alcoholic beverages: Boissons alcoolisées
-Non-alcoholic beverages: Boissons non-alcoolisées
-Chocolate: Chocolat
-Dietary supplements: Compléments alimentaires
-Ice cream desserts: Desserts glacés
-Miscellaneous: Divers
-Fast food and restaurants: Fast-food et restaurants
-Herbs and spices: Fines herbes et épices
-Sweets: Friandises
-Cheeses: Fromages
-Fruits: Fruits
-Oils and fats: Huiles et matières grasses
-Baking ingredients: Ingrédients pour la pâtisserie
-Vegetables: Légumes
-Legumes: Légumineuses
-Nuts and seeds: Noix et graines
-Bread: Pain
-Dishes: Plats
-Pasta dishes: Plats à base de pâtes
-Fish: Poisson
-Cereal products: Produits céréaliers
-Potato products: Produits de pomme de terre
-Vegan and soy-based products: Produits végans et à base de soja
-Tartlet dough and jam: Pâte à tartelette et confiture
-Pastries and viennoiseries: Pâtisseries et viennoiseries
-Rice: Riz
-Sauces and dressings: Sauces et vinaigrettes
-Meat: Viande
-Poultry: Volaille
-Yogurt and dairy products: Yaourt et produits laitiers
 */