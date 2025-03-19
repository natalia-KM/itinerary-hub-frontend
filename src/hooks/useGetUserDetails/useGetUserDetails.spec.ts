import { afterEach, beforeEach, describe, expect } from 'vitest'
import { server } from 'testUtils/mockSW'
import {
    useGetUserDetailsErrorHandler,
    useGetUserDetailsSuccessHandler
} from './useGetUserDetails.handlers'
import { renderHook, waitFor } from '@testing-library/react'
import { useGetUserDetails } from './useGetUserDetails'
import { useGetUserDetailsResponses } from './useGetUserDetails.responses'
import { userContextAndQueryWrapper } from 'testUtils'
import { UserDetails } from './types'

describe('useGetUserDetails hook', () => {
    beforeEach(() => {
        server.use(...useGetUserDetailsSuccessHandler)
    })

    afterEach(() => {
        server.restoreHandlers()
    })


    it('should return valid data on success' , async () => {
        const { result } = renderHook(() => useGetUserDetails(), {
            wrapper: userContextAndQueryWrapper
        })

        await waitFor(() => {
            expect(result.current.isSuccess).toBe(true)
        })

        expect(result.current.data).toStrictEqual<UserDetails>(
            useGetUserDetailsResponses.Guest
        )
    })

    it('should expect isError to be true when request failed' , async () => {
       server.use(...useGetUserDetailsErrorHandler)

        const { result } = renderHook(() => useGetUserDetails(), {
            wrapper: userContextAndQueryWrapper
        })

        await waitFor(() => {
            expect(result.current.isError).toBe(true)
        })
    })
})