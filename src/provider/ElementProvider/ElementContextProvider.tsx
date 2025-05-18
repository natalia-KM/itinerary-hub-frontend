import { ElementContext } from './ElementContext'
import { ReactNode } from 'react'
import { AccommodationType, ElementType } from 'hooks/elements'

interface ElementContextProviderProps {
    elementId: string
    baseElementId: string
    optionId: string
    elementType: ElementType
    otherAccommElementId?: string
    accommodationType?: AccommodationType
    children: ReactNode
}

export const ElementContextProvider = ({
    elementId,
    baseElementId,
    optionId,
    elementType,
    otherAccommElementId,
    accommodationType,
    children
}: ElementContextProviderProps) => {

    return (
        <ElementContext.Provider
            value={{
                elementId,
                baseElementId,
                optionId,
                elementType,
                otherAccommElementId,
                accommodationType
            }}
        >
            {children}
        </ElementContext.Provider>
    )
}