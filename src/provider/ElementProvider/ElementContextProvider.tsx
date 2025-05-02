import { ElementContext } from './ElementContext'
import { ReactNode } from 'react'

interface ElementContextProviderProps {
    elementId: string
    baseElementId: string
    optionId: string
    otherAccommElementId?: string
    children: ReactNode
}

export const ElementContextProvider = ({
    elementId,
    baseElementId,
    optionId,
    otherAccommElementId,
    children
}: ElementContextProviderProps) => {

    return (
        <ElementContext.Provider
            value={{
                elementId,
                baseElementId,
                optionId,
                otherAccommElementId
            }}
        >
            {children}
        </ElementContext.Provider>
    )
}