import { useCallback } from 'react'
import webClient from 'config/clientConfig'
import { PassengerDetails } from 'hooks/elements'
import { useMutation } from '@tanstack/react-query'
import { queryKeys } from 'config/queryKeys'

export const useGetPassenger = () => {

    const getPassenger = useCallback(async (passengerId: string) => {
        const { data } = await webClient.get<PassengerDetails>(`/v1/passengers/${passengerId}`)
        return data
    }, [])

    return useMutation({
        mutationKey: [queryKeys.getPassenger],
        mutationFn: getPassenger
    })
}