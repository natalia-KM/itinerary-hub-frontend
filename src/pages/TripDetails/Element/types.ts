export interface InformationColumnProps {
    label: string
    value: string | React.ReactNode
    testId?: string
    small?: boolean
}

export interface Passenger {
    firstName?: string
    lastName?: string
}

export interface PassengersColumnProps {
    passengers: Passenger[]
    passengerLabel: 'Passengers' | 'Guests'
}

export interface GetElementArgs {
    sectionId: string
    optionId: string
    elementId: string
    baseElementId: string
}