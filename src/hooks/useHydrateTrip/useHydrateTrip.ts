import { useQueryClient } from '@tanstack/react-query'
import { useGetTrip } from '../trips'
import { normalizeTripData, useTripId } from 'utils'
import { useEffect, useState } from 'react'

export const useHydrateTrip = () => {
    const { tripId } = useTripId()
    const [isInitializing, setIsInitializing] = useState(false)
    const { data, isLoading, isError } = useGetTrip({ tripId: tripId })
    const queryClient = useQueryClient()

    useEffect(() => {
        if (!data) return

        setIsInitializing(true)

        const normalized = normalizeTripData(data)

        queryClient.setQueryData(['trip', tripId], normalized.trip)
        queryClient.setQueryData(['tripDetails', tripId], normalized.trip.tripDetails)
        queryClient.setQueryData(['sectionIds', tripId], normalized.trip.sectionIds)

        Object.entries(normalized.sections).forEach(([id, section]) => {
            queryClient.setQueryData(['sectionDetails', id], section.sectionDetails)
            queryClient.setQueryData(['sectionOptionIds', id], section.optionIds)
        })

        Object.entries(normalized.options).forEach(([id, option]) => {
            queryClient.setQueryData(['optionDetails', id], option.optionDetails)
            queryClient.setQueryData(['optionElementIds', id], option.elementIds)
        })

        Object.entries(normalized.elements).forEach(([id, element]) => {
            queryClient.setQueryData(['element', id], element)
        })

        setIsInitializing(false)

    }, [data, queryClient, tripId])

    return { trip: data, isPending: isLoading || isInitializing, isError }

}