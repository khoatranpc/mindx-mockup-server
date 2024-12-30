'use client';
import React from 'react';
import { StoreProvider } from '@/src/store';

const LayoutDatabase = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <StoreProvider>
            {children}
        </StoreProvider>
    )
}

export default LayoutDatabase;