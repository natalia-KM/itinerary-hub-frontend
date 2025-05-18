import { createContext, useContext } from 'react'
import { AccommodationType, ElementType } from 'hooks/elements'

export type ElementContextType = {
    elementId: string
    baseElementId: string
    elementType: ElementType
    optionId: string
    otherAccommElementId?: string
    accommodationType?: AccommodationType
}

export const ElementContext = createContext<ElementContextType | null>(null)

export const useElementContext = () => useContext(ElementContext) as ElementContextType