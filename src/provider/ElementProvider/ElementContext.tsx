import { createContext, useContext } from 'react'

export type ElementContextType = {
    elementId: string
    baseElementId: string
    optionId: string
    otherAccommElementId?: string
}

export const ElementContext = createContext<ElementContextType | null>(null)

export const useElementContext = () => useContext(ElementContext) as ElementContextType