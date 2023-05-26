import {User,Gender,ActivityLevel} from "@/app/types/index";

export const calculateEnergyNeeds = (user: User): number => {
    if (!user.gender || !user.weight || !user.size || !user.age || !user.activityLevel) {
        return 0;
    }

    let BMR: number;

    // calculate BMR
    if (user.gender === Gender.male) {
        BMR = 88.362 + (13.397 * user.weight) + (4.799 * user.size) - (5.677 * user.age);
    } else { // assume female
        BMR = 447.593 + (9.247 * user.weight) + (3.098 * user.size) - (4.330 * user.age);
    }

    // calculate Total Energy Expenditure
    let multiplier: number;
    switch(user.activityLevel) {
        case ActivityLevel.sedentary:
            multiplier = 1.2;
            break;
        case ActivityLevel.lightly_active:
            multiplier = 1.375;
            break;
        case ActivityLevel.moderately_active:
            multiplier = 1.55;
            break;
        case ActivityLevel.very_active:
            multiplier = 1.725;
            break;
        case ActivityLevel.extra_active:
            multiplier = 1.9;
            break;
        default:
            multiplier = 1.2;
            break;
    }

    return BMR * multiplier;
}
