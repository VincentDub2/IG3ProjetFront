
export type Food = {
    id  : string;
    name: string;
    barcode: string | null;
    createdAt: string;
    updatedAt: string;
    brand: string | null;
    brandName: string | null;
    userId: string | null;
    calories: number;
    protein: number;
    fat: number;
    sugar: number | null;
    carbs: number;
    fiber: number | null;
    salt: number | null;
    servingSize: number;
    vitamins: string | null;
    minerals: string | null;
    allergens: string | null;
    foodCategory: string | null;
    approved: boolean;

}

export type BrandSelectValue = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
};

export type MealType = {
    id: string;
    name: string;
    barcode: string;
    createdAt: string;
    updatedAt: string;
    brandId: string;
    userId: string;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    sugar: number | null;
    fiber: number | null;
    salt: number | null;
    servingSize: number;
    vitamins: string | null;
    minerals: string | null;
    allergens: string[] | null;
    foodCategory: string;
    approved: boolean;
    quantity: number;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
};

export type User = {
    name: string;
    email: string;
    id: string;
    emailVerified: string | null;
    image: string | null;
    weight: number | null;
    size: number | null;
    hashedPassword: string;
    createdAt: string;
    updatedAt: string;
    age: number | null;
    gender: string | null;
    goalType: string | null;
    activityLevel: string | null;
    targetWeight: number | null;
    dailyCalories: number | null;
    dailyProtein: number | null;
    dailyFat: number | null;
    dailyCarbs: number | null;
    percentageProtein: number;
    percentageFat: number;
    percentageCarbs: number;
};

export type Session = {
    user: User;
    expires: string;
};
