'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import {

    GiMeat,
    GiChickenLeg,

    GiFriedFish,
    GiCroissant,
    GiSaucepan,
    GiBanana,
    GiMilkCarton,
    GiWaterBottle,
    GiSlicedBread,
    GiBroccoli,
    GiCupcake, GiButter, GiHamburger, GiCheeseWedge
} from 'react-icons/gi';
import { BiBowlRice } from 'react-icons/bi';

import {FaCandyCane, FaUtensils} from 'react-icons/fa';



import Container from './Container';

import CategoryBox from "@/app/components/CategoryBox";
import {CiWheat} from "react-icons/all";


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
        label: 'Sauce',
        icon: GiSaucepan,
        description: ''
    },
    {
        label: 'Fruit',
        icon: GiBanana,
        description: ''
    },
    {
        label: 'Yogurt',
        icon: GiMilkCarton,
        description: ''
    },
    {
        label: 'Soda',
        icon: GiWaterBottle,
        description: ''
    },
    {
        label: 'Bread',
        icon: GiSlicedBread,
        description: ''
    },
    {
        label: 'Pasta',
        icon: FaUtensils,
        description: ''
    },
    {
        label: 'Cereal',
        icon: CiWheat,
        description: ''
    },
    {
        label: 'Vegetables',
        icon: GiBroccoli,
        description: ''
    },
    {
        label: 'Cake',
        icon: GiCupcake,
        description: ''
    },
    {
        label: 'fat and oil',
        icon: GiButter,
        description: ''
    },
    {
        label: 'Candy',
        icon: FaCandyCane,
        description: ''
    },
    {
        label: 'Fast food',
        icon: GiHamburger,
        description: ''
    },
    {
        label: 'Cheese',
        icon: GiCheeseWedge,
        description: ''
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