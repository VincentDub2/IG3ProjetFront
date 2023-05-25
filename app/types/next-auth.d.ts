import NextAuth from "next-auth";


declare module "next-auth" {
    interface Session {
        user: {
            id: string,
            email:string,
            emailVerified: boolean,
            name: string,
            salt: string,
            sessionToken: string
            image: string,
            weight: number,
            size: number,
            hashedPassword : string,
            createdAt: string,
            updatedAt:string,
            age: string,
            gender:string,
            goalType: string,
            activityLevel: string,
            targetWeight: number,
            dailyCalories: number,
            dailyProtein: number,
            dailyFat: number,
            dailyCarbs: number,
            percentageProtein: number,
            percentageFat: number,
            percentageCarbs: number,
        };
    }
    interface Session {
        user: {
            id: string;
            email: string;
            emailVerified: boolean;
            name: string;
            salt: string;
            sessionToken: string;
            image: string;
            weight: number;
            size: number;
            hashedPassword: string;
            createdAt: string;
            updatedAt: string;
            age: string;
            gender: string;
            goalType: string;
            activityLevel: string;
            targetWeight: number;
            dailyCalories: number;
            dailyProtein: number;
            dailyFat: number;
            dailyCarbs: number;
            percentageProtein: number;
            percentageFat: number;
            percentageCarbs: number;
        };
    }
}