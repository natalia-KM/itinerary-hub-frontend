import { afterEach, describe, expect } from 'vitest'
import { server } from 'testUtils/mockSW'
import { renderHook, waitFor } from '@testing-library/react'
import { userContextAndQueryWrapper } from 'testUtils'
import { DUMMY_URL } from 'testUtils/mockValues'
import { useLogout } from './useLogout'
import { useLogoutErrorHandler, useLogoutSuccessHandler } from './useLogout.handlers'

describe('useLogout hook', () => {
    afterEach(() => {
        server.restoreHandlers()

    })

    it('should return 204 on success', async () => {
        server.use(...useLogoutSuccessHandler)

        const { result } = renderHook(() => useLogout(), {
            wrapper: userContextAndQueryWrapper
        })

        expect(window.location.href).toEqual(DUMMY_URL)
        await result.current.mutateAsync()

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })

        expect(window.location.href).toEqual('/login')
    })

    it('should expect isError to be true and not redirect when request failed', async () => {
        server.use(...useLogoutErrorHandler)

        const { result } = renderHook(() => useLogout(), {
            wrapper: userContextAndQueryWrapper
        })

        expect(window.location.href).toEqual(DUMMY_URL)
        try {
            await result.current.mutateAsync()
        } catch {
            // Expected error, do nothing
        }

        await waitFor(() => {
            expect(result.current.isError).toBe(true)
        })

        expect(window.location.href).toEqual(DUMMY_URL)
    })
})