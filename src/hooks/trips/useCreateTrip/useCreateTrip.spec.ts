import { afterEach, beforeEach, describe, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { userContextAndQueryWrapper } from 'testUtils'
import { server } from 'testUtils/mockSW'
import { useCreateTripErrorHandler, useCreateTripSuccessHandler } from './useCreateTrip.handlers'
import { useCreateTrip } from './useCreateTrip'
import { useCreateTripRequests } from './useCreateTrip.requests'

describe('useCreateTrip hook', () => {

    beforeEach(() => {
        server.use(...useCreateTripSuccessHandler)
    })

    afterEach(() => {
        server.restoreHandlers()
    })

    it('should expect isSuccess to be true', async () => {
        const { result } = renderHook(() => useCreateTrip(), {
            wrapper: userContextAndQueryWrapper
        })

        await result.current.mutateAsync(useCreateTripRequests.validRequest)

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })
    })

    it('should not redirect if the request failed', async () => {
        server.use(...useCreateTripErrorHandler)

        const { result } = renderHook(() => useCreateTrip(), {
            wrapper: userContextAndQueryWrapper
        })

        try {
            await result.current.mutateAsync(useCreateTripRequests.validRequest)
        } catch {
            // Expected error, do nothing
        }

        await waitFor(() => {
            expect(result.current.isError).toBe(true)
        })

    })
})