import { User } from "@prisma/client";



export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
  favorite: SafeFavorite[];
};

export type SafeFavorite = {
  id: string;
  favoriteId: string;
  userId: string;
};
/*
model Food {
  id           String       @id @default(uuid()) @map("_id")
  name         String
  barcode      String?
      createdAt    DateTime     @default(now())
  updatedAt    DateTime     @updatedAt
  brand        String?
      user         User?        @relation(fields: [userId], references: [id], onDelete: SetNull)
  userId       String?
      calories     Float
  protein      Float
  fat          Float
  carbs        Float
  fiber        Float?
      salt         Float?
          servingSize  Int          @default(100) // En g or ml par defaut 100
  vitamins     String?
      minerals     String?
          allergens    String?
              foodCategory String?
                  approved     Boolean      @default(false)
  userFavori   UserFavori[]
  meal         Meal[]
}

 */
export type Food = {
    _id: string;
    name: string;
    barcode: string | null;
    createdAt: string;
    updatedAt: string;
    brand: string | null;
    user: SafeUser | null;
    userId: string | null;
    calories: number;
    protein: number;
    fat: number;
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
