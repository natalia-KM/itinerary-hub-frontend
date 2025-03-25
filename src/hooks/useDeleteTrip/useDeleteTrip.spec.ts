import { afterEach, describe, expect } from 'vitest'
import { server } from 'testUtils/mockSW'
import { renderHook, waitFor } from '@testing-library/react'
import { userContextAndQueryWrapper } from 'testUtils'
import { TRIP_ID } from 'testUtils/mockValues'
import { useDeleteTripErrorHandler, useDeleteTripSuccessHandler } from './useDeleteTrip.handlers'
import { useDeleteTrip } from './useDeleteTrip'

describe('useDeleteTrip hook', () => {
    afterEach(() => {
        server.restoreHandlers()
    })

    it('should return 204 on success', async () => {
        server.use(...useDeleteTripSuccessHandler)

        const { result } = renderHook(() => useDeleteTrip(), {
            wrapper: userContextAndQueryWrapper
        })

        await result.current.mutateAsync(TRIP_ID)

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })
    })

    it('should expect isError to be true', async () => {
        server.use(...useDeleteTripErrorHandler)

        const { result } = renderHook(() => useDeleteTrip(), {
            wrapper: userContextAndQueryWrapper
        })

        try {
            await result.current.mutateAsync(TRIP_ID)
        } catch {
            // Expected error, do nothing
        }

        await waitFor(() => {
            expect(result.current.isError).toBe(true)
        })
    })
})