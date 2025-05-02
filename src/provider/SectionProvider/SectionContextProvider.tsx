import React, { useState } from 'react'
import { SectionContext } from './SectionContext'

interface SectionContextProviderProps {
    children: React.ReactNode,
    sectionId: string
}

export const SectionContextProvider = ({
    children,
    sectionId
}:SectionContextProviderProps) => {
    const [openOptionId, setOpenOptionId] = useState<string | undefined>(undefined)

    return (
        <SectionContext.Provider value={{ openOptionId, setOpenOptionId, sectionId }}>
            {children}
        </SectionContext.Provider>
    )
}