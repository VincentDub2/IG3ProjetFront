
export default function sanitizeUserInput(input: Record<string, any>): Record<string, any> {
    const numericFields = [
        "weight",
        "size",
        "age",
        "targetWeight",
        "dailyCalories",
        "dailyProtein",
        "dailyFat",
        "dailyCarbs",
        "percentageProtein",
        "percentageFat",
        "percentageCarbs",
        "gender",
        "activityLevel",
        "goal",
    ];

    const result: Record<string, any> = {};
    for (const key in input) {
        if (input.hasOwnProperty(key)) {
            if (numericFields.includes(key)) {
                // Convert to number if it's one of the numeric fields
                const value = input[key];
                result[key] = value !== null && value !== '' ? Number(value) : undefined;
            } else {
                // Otherwise leave it as is
                result[key] = input[key];
            }
        }
    }
    return result;
}
