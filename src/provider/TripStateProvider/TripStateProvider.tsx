import { SelectedOptionsMap, TripStateContext } from './TripStateContext'
import { useState } from 'react'

export const TripStateProvider = ({ children }: { children: React.ReactNode }) => {
    const [selectedOptions, setSelectedOptions] = useState<SelectedOptionsMap>({})

    const setSelectedOption = (sectionId: string, optionId: string) => {
        setSelectedOptions(prev => ({
            ...prev,
            [sectionId]: optionId
        }))
    }

    return (
        <TripStateContext.Provider value={{ selectedOptions, setSelectedOption }}>
            {children}
        </TripStateContext.Provider>
    )
}
