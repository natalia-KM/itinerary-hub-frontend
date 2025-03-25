import webClient from 'config/clientConfig'
import { GetAllTripsResponse } from './types'
import { useQuery } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'
import { useCallback } from 'react'

export const useGetAllTrips = () => {

    const getAllTrips = useCallback(async () => {
        const { data } = await webClient.get<GetAllTripsResponse>('/v1/trips')
        return data
    }, [])

    return useQuery({
        queryKey: [queryKeys.getAllTrips],
        queryFn: getAllTrips
    })
}