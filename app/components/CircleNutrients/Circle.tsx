'use client';
import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircleProps {
    consumed: number;
    total: number;
    color: string;
    litleCircle?: boolean;
}

const Circle : React.FC<CircleProps> = ({ consumed, total,color ,litleCircle}) => {
    const percentage = (consumed / total) * 100;

    return (
        <div className="w-50 h-50 m-2"> {/* Tailwind class for width and height */}
            <CircularProgressbar
                //value={percentage}
                value={percentage > 100 ? 100 : percentage}
                text={total-consumed<0 ? `0` : `${total-consumed} `}
                styles={buildStyles({
                    strokeLinecap: 'round',
                    textSize: '16px',
                    pathColor: color, // Equivalent to Tailwind's rose-500
                    textColor: 'black', // Equivalent to Tailwind's black
                    trailColor: '#d6d6d6',
                    backgroundColor: '#ffffff', // Equivalent to Tailwind's white
                })}
            />
        </div>
    );
};

export default Circle;
