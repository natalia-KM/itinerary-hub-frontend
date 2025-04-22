import { createContext, useContext } from 'react'

export type SectionContextType = {
    openOptionId?: string
    setOpenOptionId: (value?: string) => void
}

export const SectionContext = createContext<SectionContextType | null>(null)

export const useSectionContext = () => useContext(SectionContext) as SectionContextType