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
        image: "https://www.galbani.fr/wp-content/uploads/2020/04/AdobeStock_157570276-2.jpeg",
            title: "Salade",
            description: "Salade césard",
            recipe: "Recette 1"
    },
    {
        image: "https://lacuisinedegeraldine.fr/wp-content/uploads/2021/02/DSC01554-1-scaled.jpg",
        title: "Salade Choux Rouge",
        description: "Description 2",
        recipe: "Recette 2"
    },{
            image: "https://lacuisinedegeraldine.fr/wp-content/uploads/2021/02/DSC01554-1-scaled.jpg",
            title: "Salade Choux Rouge",
            description: "Description 2",
            recipe: "Recette 2"
        },{
            image: "https://lacuisinedegeraldine.fr/wp-content/uploads/2021/02/DSC01554-1-scaled.jpg",
            title: "Salade Choux Rouge",
            description: "Description 2",
            recipe: "Recette 2"
        },{
            image: "https://lacuisinedegeraldine.fr/wp-content/uploads/2021/02/DSC01554-1-scaled.jpg",
            title: "Salade Choux Rouge",
            description: "Description 2",
            recipe: "Recette 2"
        },{
            image: "https://lacuisinedegeraldine.fr/wp-content/uploads/2021/02/DSC01554-1-scaled.jpg",
            title: "Salade Choux Rouge",
            description: "Description 2",
            recipe: "Recette 2"
        },{
            image: "https://lacuisinedegeraldine.fr/wp-content/uploads/2021/02/DSC01554-1-scaled.jpg",
            title: "Salade Choux Rouge",
            description: "Description 2",
            recipe: "Recette 2"
        },{
            image: "https://lacuisinedegeraldine.fr/wp-content/uploads/2021/02/DSC01554-1-scaled.jpg",
            title: "Salade Choux Rouge",
            description: "Description 2",
            recipe: "Recette 2"
        },{
            image: "https://lacuisinedegeraldine.fr/wp-content/uploads/2021/02/DSC01554-1-scaled.jpg",
            title: "Salade Choux Rouge",
            description: "Description 2",
            recipe: "Recette 2"
        },

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
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    )


}

export default Carousel;
