import { useUpdateUserDetailsErrorHandler, useUpdateUserDetailsSuccessHandler } from './useUpdateUserDetails.handlers'
import { server } from 'testUtils/mockSW'
import { renderHook, waitFor } from '@testing-library/react'
import { useUpdateUserDetails } from './useUpdateUserDetails'
import { expect } from 'vitest'
import { useGetUserDetailsResponses } from 'hooks/useGetUserDetails'
import { userContextAndQueryWrapper } from 'testUtils'
import { UserDetails } from 'hooks/useGetUserDetails/types'

describe('useUpdateUserDetails hook', () => {
    it('should return updated user details on success', async () => {
        server.use(...useUpdateUserDetailsSuccessHandler)

        const { result } = renderHook(() => useUpdateUserDetails(), {
            wrapper: userContextAndQueryWrapper
        })

        await result.current.mutateAsync({ firstName: 'John', lastName: 'Doe' })

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })

        expect(result.current.data).toStrictEqual<UserDetails>(
            useGetUserDetailsResponses.Guest
        )
    })

    it('should expect isError to be true if the request fails', async () => {
        server.use(...useUpdateUserDetailsErrorHandler)

        const { result } = renderHook(() => useUpdateUserDetails(), {
            wrapper: userContextAndQueryWrapper
        })

        try {
            await result.current.mutateAsync({ firstName: 'John', lastName: 'Doe' })
        } catch {
            // error
        }
        await waitFor(() => {
            expect(result.current.isError).toBe(true)
        })
    })
})