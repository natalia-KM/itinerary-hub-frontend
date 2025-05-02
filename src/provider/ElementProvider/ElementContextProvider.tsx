import { ElementContext } from './ElementContext'
import { ReactNode } from 'react'
import { ElementType } from 'hooks/elements'

interface ElementContextProviderProps {
    elementId: string
    baseElementId: string
    optionId: string
    elementType: ElementType
    otherAccommElementId?: string
    children: ReactNode
}

export const ElementContextProvider = ({
    elementId,
    baseElementId,
    optionId,
    elementType,
    otherAccommElementId,
    children
}: ElementContextProviderProps) => {

    return (
        <ElementContext.Provider
            value={{
                elementId,
                baseElementId,
                optionId,
                elementType,
                otherAccommElementId
            }}
        >
            {children}
        </ElementContext.Provider>
    )
}