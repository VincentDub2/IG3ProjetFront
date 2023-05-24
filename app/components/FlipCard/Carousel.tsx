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
            title: "Grilled Chicken and Vegetables",
            description: "Grilled chicken served with a selection of seasonal vegetables.",
            recipe: "Recipe 3",
            protein: 35, // in grams
            carbohydrates: 30, // in grams
            fats: 15, // in grams
            calories: 400 // in kcal
        },
        {
            image: "https://images.unsplash.com/photo-1623428187425-873f16e10554?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsYWRlJTIwcXVpbm9hfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
            title: "Quinoa Salad",
            description: "Quinoa salad with tomatoes, cucumber, and feta.",
            recipe: "Recipe 4",
            protein: 15, // in grams
            carbohydrates: 45, // in grams
            fats: 10, // in grams
            calories: 350 // in kcal
        },
        {
            image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
            title: "Vegetable Pasta",
            description: "Whole wheat pasta served with a vegetable sauce.",
            recipe: "Recipe 5",
            protein: 20, // in grams
            carbohydrates: 55, // in grams
            fats: 10, // in grams
            calories: 450 // in kcal
        },
        {
            image: "https://images.unsplash.com/photo-1652346637902-37c7b51e35fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8b21lbGV0dGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
            title: "Vegetable Omelette",
            description: "Vegetable omelette served with toasted bread.",
            recipe: "Recipe 6",
            protein: 25, // in grams
            carbohydrates: 15, // in grams
            fats: 15, // in grams
            calories: 300 // in kcal
        },
        {
            image: "https://images.unsplash.com/photo-1512852939750-1305098529bf",
            title: "Roasted Vegetable Salad",
            description: "Roasted vegetable salad with quinoa and a lemon dressing.",
            recipe: "Recipe 7",
            protein: 12, // in grams
            carbohydrates: 45, // in grams
            fats: 10, // in grams
            calories: 350 // in kcal
        },
        {
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
            title: "Teriyaki Chicken",
            description: "Teriyaki Chicken served with brown rice and sautéed vegetables.",
            recipe: "Recipe 8",
            protein: 40, // in grams
            carbohydrates: 50, // in grams
            fats: 15, // in grams
            calories: 500 // in kcal
        },
        {
            image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759",
            title: "Mushroom Risotto",
            description: "Creamy mushroom risotto with grated parmesan.",
            recipe: "Recipe 9",
            protein: 15, // in grams
            carbohydrates: 60, // in grams
            fats: 20, // in grams
            calories: 450 // in kcal
        },
        {
            image: "https://images.unsplash.com/photo-1620418029653-f708dd37096a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c291cGUlMjBsZWd1bWV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
            title: "Vegetable Soup",
            description: "Hot vegetable soup with fresh herbs.",
            recipe: "Recipe 10",
            protein: 8, // in grams
            carbohydrates: 35, // in grams
            fats: 10, // in grams
            calories: 250 // in kcal
        },
        {
            image: "https://images.unsplash.com/photo-1662116802109-9dce63857aab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGJ1Z2VyJTIwdmVnZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=900&q=60",
            title: "Vegetarian Burger",
            description: "Vegetarian burger with sweet potato fries.",
            recipe: "Recipe 11",
            protein: 15, // in grams
            carbohydrates: 55, // in grams
            fats: 20, // in grams
            calories: 500 // in kcal
        },
        {
            image: "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2",
            title: "Smoothie Bowl",
            description: "Fruit smoothie bowl with chia seeds.",
            recipe: "Recipe 12",
            protein: 10, // in grams
            carbohydrates: 70, // in grams
            fats: 15, // in grams
            calories: 450 // in kcal
        },
        {
            image: "https://images.unsplash.com/photo-1478144592103-25e218a04891",
            title: "Fish Tacos",
            description: "Fish tacos with a cabbage salad and a creamy sauce.",
            recipe: "Recipe 13",
            protein: 30, // in grams
            carbohydrates: 50, // in grams
            fats: 15, // in grams
            calories: 500 // in kcal
        },
        {
            image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBhdGUlMjB2ZWdldGFibGV8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=900&q=60",
            title: "Butternut Squash Pasta",
            description: "Butternut squash pasta with goat cheese.",
            recipe: "Recipe 14",
            protein: 20, // in grams
            carbohydrates: 60, // in grams
            fats: 15, // in grams
            calories: 500 // in kcal
        },
        {
            image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9",
            title: "Avocado Toast",
            description: "Avocado toast with scrambled eggs.",
            recipe: "Recipe 15",
            protein: 15, // in grams
            carbohydrates: 40, // in grams
            fats: 20, // in grams
            calories: 400 // in kcal
        },
        {
            image: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cXVpbm9hfGVufDB8fDB8fHww&auto=format&fit=crop&w=900&q=60",
            title: "Quinoa and Vegetable Bowl",
            description: "Quinoa and roasted vegetable bowl with a tahini dressing.",
            recipe: "Recipe 16",
            protein: 15, // in grams
            carbohydrates: 55, // in grams
            fats: 20, // in grams
            calories: 500 // in kcal
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
