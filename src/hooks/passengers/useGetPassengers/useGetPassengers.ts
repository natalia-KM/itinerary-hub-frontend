import webClient from 'config/clientConfig'
import { PassengerDetails } from 'hooks/elements'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useGetPassengers = () => {

    const getAllPassengers = async () => {
        const { data } = await webClient.get<PassengerDetails[]>('/v1/passengers')
        return data
    }

    return useQuery({
        queryKey: [queryKeys.getAllPassengers],
        queryFn: getAllPassengers
    })
}