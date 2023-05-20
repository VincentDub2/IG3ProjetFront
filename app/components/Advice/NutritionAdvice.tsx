'use client'
import { useState } from 'react';

const NutritionAdvice: React.FC = () => {
    const advices = [
        "Eat fish, especially oily fish (like sardines, mackerel, trout, salmon, herring, tuna) 2-3 times a week for omega 3 EPA & DHA intake.",
        "Limit red meat to a maximum of 500g per week. Opt for lean meats and eggs for protein. Also consider plant-based sources (like tofu, legumes...).",
        "Include vegetables in every meal, either raw or cooked, for fiber, vitamin, and mineral intake.",
        "Consume 3-4 fresh fruits a day for vitamin & mineral intake.",
        "Have legumes (lentils, chickpeas, red beans, coral lentils, split peas...) 3-4 times a week.",
        "Eat a handful of nuts a day (about 20-30g) for polyunsaturated fatty acid, protein, vitamin, and mineral intake.",
        "Vary your cooking oils daily: For cooking, prioritize olive oil, coconut oil, and sunflower oil (for high-temperature cooking). For dressing, prioritize walnut oil, canola oil, flaxseed oil, camelina oil (source of vegetable omega 3) & olive oil.",
        "Opt for semi-whole to whole starchy foods and vary the sources."
    ];

    const [currentAdvice, setCurrentAdvice] = useState(0);

    const nextAdvice = () => {
        setCurrentAdvice((currentAdvice + 1) % advices.length);
    };

    const previousAdvice = () => {
        setCurrentAdvice((currentAdvice - 1 + advices.length) % advices.length);
    };

    return (
        <div className="
        flex
        items-center
        justify-center
        bg-gray-100
        p-8
        rounded-lg
        shadow-md
        h-[400px]
        overflow-auto
        ">
            <button onClick={previousAdvice} className="text-rose-500 text-2xl font-bold px-4 hover:text-rose-700">
                &lt;
            </button>
            <div className="flex flex-col items-center">
                <h2 className="text-2xl font-bold mb-6 ">Nutrition Advice:</h2>
                <div className="text-lg mb-6 leading-relaxed">
                    {advices[currentAdvice]}
                </div>
            </div>
            <button onClick={nextAdvice} className="text-rose-500 text-2xl font-bold px-4 hover:text-rose-700">
                &gt;
            </button>
        </div>
    );
};

export default NutritionAdvice;
