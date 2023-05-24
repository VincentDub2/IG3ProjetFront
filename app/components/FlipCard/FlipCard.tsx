// FlipCard.tsx
'use client'
import React from 'react'
import ReactCardFlip from 'react-card-flip';

interface FlipCardProps {
    image: string,
    title: string,
    description: string,
    recipe: string
}

const FlipCard: React.FC<FlipCardProps> = ({ image, title, description, recipe }) => {
    const [isFlipped, setIsFlipped] = React.useState(false);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    }

    return (
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <div onClick={handleClick} className="w-64 bg-blue-300 rounded-md shadow-xl overflow-hidden cursor-pointer">
                <img src={image} alt={title} className="w-full h-48 object-cover"/>
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2">{title}</h2>
                    <p className="text-gray-700">{description}</p>
                </div>
            </div>

            <div onClick={handleClick} className="w-64 bg-blue-300 rounded-md shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-2">Recette</h2>
                <p>{recipe}</p>
            </div>
        </ReactCardFlip>
    )
}

export default FlipCard
