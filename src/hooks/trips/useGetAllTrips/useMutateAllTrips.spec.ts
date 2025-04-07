import { afterEach, expect } from 'vitest'
import { server } from 'testUtils/mockSW'
import { useGetAllTripsErrorHandler, useGetAllTripsSuccessHandler } from './useGetAllTrips.handlers'
import { renderHook, waitFor } from '@testing-library/react'
import { useMutateAllTrips } from './useMutateAllTrips'
import { userContextAndQueryWrapper } from 'testUtils'
import { TRIP_ID, TRIP_ID_2 } from 'testUtils/mockValues'
import { TripDetails } from 'utils'

describe('useMutateAllTrips hook', () => {
    afterEach(() => {
        server.restoreHandlers()
    })

    it('should return formatted trips', async () => {
        server.use(...useGetAllTripsSuccessHandler)

        const { result } = renderHook(() => useMutateAllTrips(), {
            wrapper: userContextAndQueryWrapper
        })

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        const formattedTripOne: TripDetails = {
            tripId: TRIP_ID,
            tripName: 'Paris Trip',
            createdAt: new Date('2025-03-22T00:00:00'),
            imageRef: 'trip-1',
            startDate: new Date('2025-03-24T00:00:00'),
            endDate: new Date('2025-03-28T00:00:00')
        }

        const formattedTripTwo: TripDetails = {
            tripId: TRIP_ID_2,
            tripName: 'London Trip',
            createdAt: new Date('2025-03-15T00:00:00'),
            imageRef: 'default',
            startDate: undefined,
            endDate: undefined
        }

        const expectedResponse = [formattedTripOne, formattedTripTwo]

        expect(result.current.trips).toStrictEqual<TripDetails[]>(
            expectedResponse
        )
        expect(result.current.isError).toBe(false)
    })

    it('should return an empty array on request failure', async () => {
        server.use(...useGetAllTripsErrorHandler)

        const { result } = renderHook(() => useMutateAllTrips(), {
            wrapper: userContextAndQueryWrapper
        })

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false)
        })

        expect(result.current.isError).toBe(true)
        expect(result.current.trips).toEqual([])
    })
})