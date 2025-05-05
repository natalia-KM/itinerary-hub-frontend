import { createContext, useContext } from 'react'

export type SelectedOptionsMap = { [sectionId: string]: string }

export const TripStateContext = createContext<{
    selectedOptions: SelectedOptionsMap
    setSelectedOption: (sectionId: string, optionId: string) => void
} | undefined>(undefined)

export const useTripStateContext = () => {
    const context = useContext(TripStateContext)
    if (!context) throw new Error('useTripStateContext must be used within TripStateProvider')
    return context
}
