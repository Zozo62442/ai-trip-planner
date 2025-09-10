"use client";

import React from 'react';
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Provider from "./provider";
import { ReactNode } from "react";


const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return <ConvexProvider client={convex}>
    <Provider>
        {children}
    </Provider>
  </ConvexProvider>;
}