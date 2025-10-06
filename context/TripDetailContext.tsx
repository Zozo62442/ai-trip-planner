import React, { createContext } from 'react';
import { TripInfo } from '@/app/create-new-trip/_components/ChatBox';

    export type TripDetailContextType = {
        tripDetailInfo: TripInfo | null;
        setTripDetailInfo: React.Dispatch<React.SetStateAction<TripInfo | null>>;
    }

export const TripDetailContext = createContext<TripDetailContextType | undefined>(undefined);