'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo } from "react";
import { format } from 'date-fns';

import useCountries from "@/app/hooks/useCountries";

import HeartButton from "../HeartButton";
import Button from "../Button";
import ClientOnly from "../ClientOnly";



const ListingCard = () => {
    const router = useRouter();
    const { getByValue } = useCountries();

    return (
        <div>
           test
        </div>
    );
}

export default ListingCard;