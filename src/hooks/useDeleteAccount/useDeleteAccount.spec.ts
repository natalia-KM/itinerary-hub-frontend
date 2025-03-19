import { afterEach, describe, expect } from 'vitest'
import { server } from 'testUtils/mockSW'
import { renderHook, waitFor } from '@testing-library/react'
import { userContextAndQueryWrapper } from 'testUtils'
import { useDeleteAccount } from './useDeleteAccount'
import { useGetDeleteAccountErrorHandler, useGetDeleteAccountSuccessHandler } from './useDeleteAccount.handlers'
import { DUMMY_URL } from 'testUtils/mockValues'

describe('useDeleteAccount hook', () => {
    afterEach(() => {
        server.restoreHandlers()

    })

    it('should return 204 on success', async () => {
        server.use(...useGetDeleteAccountSuccessHandler)

        const { result } = renderHook(() => useDeleteAccount(), {
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
        server.use(...useGetDeleteAccountErrorHandler)

        const { result } = renderHook(() => useDeleteAccount(), {
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