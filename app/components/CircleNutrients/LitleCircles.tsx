'use client'
import Circle from './Circle';
interface LittleCirclesProps {
    proteinValue: number;
    lipidValue: number;
    carbohydrateValue: number;
    proteinTarget: number;
    lipidTarget: number;
    carbohydrateTarget: number;
}

const LitleCircles : React.FC<LittleCirclesProps> = ({
    proteinValue,
    lipidValue,
    carbohydrateValue,
    proteinTarget,
    lipidTarget,
    carbohydrateTarget,
                                                     }) => {

    return (
        <div className="flex
        justify-around
        ">
            <div className="flex flex-col ">
                <Circle consumed={proteinValue} total={proteinTarget} color="#93c5fd" /> {/* Amber-500 for Protein */}
                <p className="text-center text-xs text-neutral-500">Proteins</p>
            </div>
            <div className="flex flex-col ">
                <Circle consumed={lipidValue} total={lipidTarget} color="#93c5fd" /> {/* Emerald-500 for Lipids */}
                <p className="text-center text-xs text-neutral-500">Lipide</p>
            </div>
            <div className="flex flex-col ">
                <Circle consumed={carbohydrateValue} total={carbohydrateTarget} color="#93c5fd" /> {/* Blue-500 for Carbohydrates */}
                <p className="text-center text-xs text-neutral-500">Carbs</p>
            </div>
        </div>
    );
};

export default LitleCircles;

