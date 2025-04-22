import { PassengerDetails } from 'hooks/elements'
import { PASSENGER_1, PASSENGER_2, PASSENGER_3, PASSENGER_4, PASSENGER_5 } from 'testUtils/mockValues'

export const useGetPassengerResponses: Record<string, PassengerDetails> = {
    [PASSENGER_1]: {
        passengerId: PASSENGER_1,
        firstName: 'John',
        lastName: 'Doe',
        avatar: 'default'
    },
    [PASSENGER_2]: {
        passengerId: PASSENGER_2,
        firstName: 'Alice',
        lastName: 'Smith',
        avatar: 'default'
    },
    [PASSENGER_3]: {
        passengerId: PASSENGER_3,
        firstName: 'Bob',
        lastName: 'Johnson',
        avatar: 'default'
    },
    [PASSENGER_4]: {
        passengerId: PASSENGER_4,
        firstName: 'Clara',
        lastName: 'Nguyen',
        avatar: 'default'
    },
    [PASSENGER_5]: {
        passengerId: PASSENGER_5,
        firstName: 'Ethan',
        lastName: 'Brown',
        avatar: 'default'
    }
}