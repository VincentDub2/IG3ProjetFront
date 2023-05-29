// FlipCard.tsx
'use client'
import React from 'react'
import ReactCardFlip from 'react-card-flip';
import Image from "next/image";

interface FlipCardProps {
    image: string,
    title: string,
    description: string,
    recipe: string,
    protein: number,
    carbohydrates: number,
    fats: number,
    calories: number
}

const FlipCard: React.FC<FlipCardProps> = ({ image, title, description, recipe, protein, carbohydrates, fats, calories }) => {
    const [isFlipped, setIsFlipped] = React.useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div onClick={handleClick} className="w-64 h-96 bg-white rounded-lg shadow-xl overflow-hidden cursor-pointer">
            <div className="relative w-full h-48">
                <Image
                    src={image || '/images/placeholder.jpg'}
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    alt={title}
                />
            </div>
                <div className="p-6 h-52">
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-700">{description}</p>
                </div>
            </div>

            <div onClick={handleClick} className="w-64 h-96 bg-white rounded-lg shadow-xl p-6 flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-2">Recipe</h2>
                    <p>{description}</p>
                </div>
                <div>
                    <h2 className="text-xl font-bold mb-2">Nutritional Information</h2>
                    <p>Protein: {protein}g</p>
                    <p>Carbohydrates: {carbohydrates}g</p>
                    <p>Fats: {fats}g</p>
                    <p>Calories: {calories}kcal</p>
                </div>
            </div>
        </ReactCardFlip>
    )
}

export default FlipCard
