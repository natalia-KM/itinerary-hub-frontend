import { server } from 'testUtils/mockSW'
import { renderHook, waitFor } from '@testing-library/react'
import { expect } from 'vitest'
import { userContextAndQueryWrapper } from 'testUtils'
import { useUpdateTripDetailsErrorHandler, useUpdateTripDetailsSuccessHandler } from './useUpdateTrip.handlers'
import { useUpdateTrip } from './useUpdateTrip'
import { TRIP_ID } from 'testUtils/mockValues'
import { useUpdateTripRequests } from './useUpdateTrip.requests'

describe('useUpdateTrip hook', () => {

    const request = {
        tripId: TRIP_ID,
        request: useUpdateTripRequests.validRequest
    }

    it('should return 200 on success', async () => {
        server.use(...useUpdateTripDetailsSuccessHandler)

        const { result } = renderHook(() => useUpdateTrip(), {
            wrapper: userContextAndQueryWrapper
        })

        await result.current.mutateAsync(request)

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })
    })

    it('should expect isError to be true if the request fails', async () => {
        server.use(...useUpdateTripDetailsErrorHandler)

        const { result } = renderHook(() => useUpdateTrip(), {
            wrapper: userContextAndQueryWrapper
        })

        try {
            await result.current.mutateAsync(request)
        } catch {
            // error
        }
        await waitFor(() => {
            expect(result.current.isError).toBe(true)
        })
    })
})