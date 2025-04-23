import React, { useState } from 'react'
import { SectionContext } from './SectionContext'

interface SectionContextProviderProps {
    children: React.ReactNode
}

export const SectionContextProvider = ({
    children
}:SectionContextProviderProps) => {
    const [openOptionId, setOpenOptionId] = useState<string | undefined>(undefined)

    return (
        <SectionContext.Provider value={{ openOptionId, setOpenOptionId }}>
            {children}
        </SectionContext.Provider>
    )
}