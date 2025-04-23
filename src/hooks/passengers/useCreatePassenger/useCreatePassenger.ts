import webClient from 'config/clientConfig'
import { PassengerDetails } from 'hooks/elements'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export interface CreatePassengerRequest {
    firstName: string
    lastName: string
    avatar: string
}

export const useCreatePassenger = () => {

    const createPassenger = async (request: CreatePassengerRequest) => {
        const { data } = await webClient.post<PassengerDetails>('/v1/passengers', request)
        return data
    }

    return useMutation({
        mutationKey: [queryKeys.createPassenger],
        mutationFn: createPassenger
    })
}