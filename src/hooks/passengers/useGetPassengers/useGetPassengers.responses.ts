import { PassengerDetails } from 'hooks/elements'
import { PASSENGER_1, PASSENGER_2, PASSENGER_3, PASSENGER_4, PASSENGER_5 } from 'testUtils/mockValues'
import { useGetPassengerResponses } from '../useGetPassenger/useGetPassenger.responses'

export const useGetPassengersResponses: PassengerDetails[] = [
    useGetPassengerResponses[PASSENGER_1],
    useGetPassengerResponses[PASSENGER_2],
    useGetPassengerResponses[PASSENGER_3],
    useGetPassengerResponses[PASSENGER_4],
    useGetPassengerResponses[PASSENGER_5],
]