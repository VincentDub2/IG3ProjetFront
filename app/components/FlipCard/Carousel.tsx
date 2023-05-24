// Carousel.tsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import FlipCard from './FlipCard';
import "./swiper.css";

// install Swiper modules
SwiperCore.use([Navigation]);

const Carousel: React.FC = () => {
    const recipes = [
        {
            image: "https://images.unsplash.com/photo-1505935428862-770b6f24f629",
            title: "Poulet grillé et légumes",
            description: "Poulet grillé servi avec une sélection de légumes de saison.",
            recipe: "Recette 3",
            protein: 35, // en grammes
            carbohydrates: 30, // en grammes
            fats: 15, // en grammes
            calories: 400 // en kcal
        },
        {
            image: "https://images.unsplash.com/photo-1623428187425-873f16e10554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsYWRlJTIwcXVpbm9hfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
            title: "Salade de quinoa",
            description: "Salade de quinoa avec des tomates, du concombre et de la feta.",
            recipe: "Recette 4",
            protein: 15, // en grammes
            carbohydrates: 45, // en grammes
            fats: 10, // en grammes
            calories: 350 // en kcal
        },
        {
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
            title: "Pâtes aux légumes",
            description: "Pâtes de blé entier servies avec une sauce aux légumes.",
            recipe: "Recette 5",
            protein: 20, // en grammes
            carbohydrates: 55, // en grammes
            fats: 10, // en grammes
            calories: 450 // en kcal
        },
        {
            image: "https://images.unsplash.com/photo-1652346637902-37c7b51e35fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b21lbGV0dGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
            title: "Omelette aux légumes",
            description: "Omelette aux légumes servie avec du pain grillé.",
            recipe: "Recette 6",
            protein: 25, // en grammes
            carbohydrates: 15, // en grammes
            fats: 15, // en grammes
            calories: 300 // en kcal
        },{
            image: "https://images.unsplash.com/photo-1512852939750-1305098529bf",
            title: "Salade de légumes rôtis",
            description: "Salade de légumes rôtis avec du quinoa et une vinaigrette au citron.",
            recipe: "Recette 7",
            protein: 12, // en grammes
            carbohydrates: 45, // en grammes
            fats: 10, // en grammes
            calories: 350 // en kcal
        },
        {
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
            title: "Poulet Teriyaki",
            description: "Poulet Teriyaki servi avec du riz brun et des légumes sautés.",
            recipe: "Recette 8",
            protein: 40, // en grammes
            carbohydrates: 50, // en grammes
            fats: 15, // en grammes
            calories: 500 // en kcal
        },
        {
            image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759",
            title: "Risotto aux champignons",
            description: "Risotto crémeux aux champignons avec du parmesan râpé.",
            recipe: "Recette 9",
            protein: 15, // en grammes
            carbohydrates: 60, // en grammes
            fats: 20, // en grammes
            calories: 450 // en kcal
        },
        {
            image: "https://images.unsplash.com/photo-1620418029653-f708dd37096a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c291cGUlMjBsZWd1bWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
            title: "Soupe de légumes",
            description: "Soupe de légumes chauds avec des herbes fraîches.",
            recipe: "Recette 10",
            protein: 8, // en grammes
            carbohydrates: 35, // en grammes
            fats: 10, // en grammes
            calories: 250 // en kcal
        },
        {
            image: "https://images.unsplash.com/photo-1662116802109-9dce63857aab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJ1Z2VyJTIwdmVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
            title: "Burger végétarien",
            description: "Burger végétarien avec des frites de patates douces.",
            recipe: "Recette 11",
            protein: 15, // en grammes
            carbohydrates: 55, // en grammes
            fats: 20, // en grammes
            calories: 500 // en kcal
        },
        {
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2",
            title: "Smoothie Bowl",
            description: "Smoothie Bowl aux fruits avec des graines de chia.",
            recipe: "Recette 12",
            protein: 10, // en grammes
            carbohydrates: 70, // en grammes
            fats: 15, // en grammes
            calories: 450 // en kcal
        },
        {
            image: "https://images.unsplash.com/photo-1478144592103-25e218a04891",
            title: "Tacos de poisson",
            description: "Tacos de poisson avec une salade de chou et une sauce crémeuse.",
            recipe: "Recette 13",
            protein: 30, // en grammes
            carbohydrates: 50, // en grammes
            fats: 15, // en grammes
            calories: 500 // en kcal
        },
        {
            image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhdGUlMjB2ZWdldGFibGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
            title: "Pâtes à la courge butternut",
            description: "Pâtes à la courge butternut avec du fromage de chèvre.",
            recipe: "Recette 14",
            protein: 20, // en grammes
            carbohydrates: 60, // en grammes
            fats: 15, // en grammes
            calories: 500 // en kcal
        },
        {
            image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
            title: "Tartine d'avocat",
            description: "Tartine d'avocat avec des œufs brouillés.",
            recipe: "Recette 15",
            protein: 15, // en grammes
            carbohydrates: 40, // en grammes
            fats: 20, // en grammes
            calories: 400 // en kcal
        },
        {
            image: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVpbm9hfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
            title: "Bowl de quinoa et légumes",
            description: "Bowl de quinoa et légumes rôtis avec une vinaigrette à la tahini.",
            recipe: "Recette 16",
            protein: 15, // en grammes
            carbohydrates: 55, // en grammes
            fats: 20, // en grammes
            calories: 500 // en kcal
        }

    // ajoutez plus de recettes si nécessaire...
    ];

    return (
        <Swiper
            navigation={true}
            slidesPerView={'auto'}  // Default to 'auto' slide per view
            slidesPerGroup={1}  // Default to 1 slide per group
            spaceBetween={50}
            loop={true}
            pagination={{
                clickable: true,
            }}
            breakpoints={{
                640: {
                    slidesPerView: 2,  // 2 slides per view for screens >= 640px
                    slidesPerGroup: 2,  // 2 slides per group for screens >= 640px
                },
                1024: {
                    slidesPerView: 3,  // 3 slides per view for screens >= 1024px
                    slidesPerGroup: 3,  // 3 slides per group for screens >= 1024px
                },
                1280: {
                    slidesPerView: 4,  // 4 slides per view for screens >= 1280px
                    slidesPerGroup: 4,  // 4 slides per group for screens >= 1280px
                },
            }}
            className="mySwiper recetteCoursel bg-white"  // Add justify-center to center slides
        >
            {recipes.map((recipe, index) => (
                <SwiperSlide key={index} className="justify-center">
                    <FlipCard
                        image={recipe.image}
                        title={recipe.title}
                        description={recipe.description}
                        recipe={recipe.recipe}
                        protein={recipe.protein}
                        carbohydrates={recipe.carbohydrates}
                        fats={recipe.fats}
                        calories={recipe.calories}
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )


}

export default Carousel;
