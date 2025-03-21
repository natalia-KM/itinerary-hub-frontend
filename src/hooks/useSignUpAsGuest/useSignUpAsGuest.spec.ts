import { beforeEach, describe, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { userContextAndQueryWrapper } from 'testUtils'
import { useSignUpAsGuest } from './useSignUpAsGuest'
import { server } from 'testUtils/mockSW'
import { useSignUpAsGuestErrorHandler, useSignUpAsGuestSuccessHandler } from './useSignUpAsGuest.handlers'
import { DUMMY_URL } from 'testUtils/mockValues'

describe('useSignUpAsGuest hook', () => {

    beforeEach(() => {
        server.use(...useSignUpAsGuestSuccessHandler)
    })

    it('should redirect on success', async () => {
        const { result } = renderHook(() => useSignUpAsGuest(), {
            wrapper: userContextAndQueryWrapper
        })

        await result.current.mutateAsync({ firstName: 'John', lastName: 'Doe' })

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })
    })

    it('should not redirect if the request failed', async () => {
        server.use(...useSignUpAsGuestErrorHandler)

        const { result } = renderHook(() => useSignUpAsGuest(), {
            wrapper: userContextAndQueryWrapper
        })

        try {
            await result.current.mutateAsync({ firstName: '', lastName: '' })
        } catch {
            // Expected error, do nothing
        }

        await waitFor(() => {
            expect(result.current.isError).toBe(true)
        })

        expect(window.location.href).toEqual(DUMMY_URL)
    })
})