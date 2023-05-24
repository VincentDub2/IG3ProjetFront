// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import Swiper core and required modules
import SwiperCore, { EffectCards } from 'swiper';

// install Swiper modules
SwiperCore.use([EffectCards]);

const NutritionAdvice: React.FC = () => {
    const advices = [
        "Eat fish, especially oily fish (like sardines, mackerel, trout, salmon, herring, tuna) 2-3 times a week for omega 3 EPA & DHA intake.",
        "Limit red meat to a maximum of 500g per week. Opt for lean meats and eggs for protein. Also consider plant-based sources (like tofu, legumes...).",
        "Include vegetables in every meal, either raw or cooked, for fiber, vitamin, and mineral intake.",
        "Consume 3-4 fresh fruits a day for vitamin & mineral intake.",
        "Have legumes (lentils, chickpeas, red beans, coral lentils, split peas...) 3-4 times a week.",
        "Eat a handful of nuts a day (about 20-30g) for polyunsaturated fatty acid, protein, vitamin, and mineral intake.",
        "Vary your cooking oils daily: For cooking, prioritize olive oil, coconut oil, and sunflower oil .",
        "For dressing, prioritize walnut oil, canola oil, flaxseed oil, camelina oil (source of vegetable omega 3) & olive oil.",
        "Opt for semi-whole to whole starchy foods and vary the sources."
    ];

    return (
        <div className="advice-container">
            <div className="advice-card-container">
                <Swiper
                    effect={"cards"}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper nutrition-advice-carousel"
                >
                    {advices.map((advice, index) => (
                        <SwiperSlide key={index} className="nutrition-advice-slide">
                            <div className="swiper-content">
                                {advice}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};


export default NutritionAdvice;
