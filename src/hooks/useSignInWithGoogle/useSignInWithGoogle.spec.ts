import { renderHook } from '@testing-library/react'
import { useSignInWithGoogle } from './useSignInWithGoogle'
import { expect } from 'vitest'
import { userContextAndQueryWrapper } from 'testUtils'
import { DUMMY_URL } from 'testUtils/mockValues'

describe('useSignInWithGoogle hook', () => {
  it('should redirect to google oauth page', async () => {
      const { result } = renderHook(() => useSignInWithGoogle(), {
          wrapper: userContextAndQueryWrapper
      })

      await result.current.mutateAsync()

      expect(window.location.href).toEqual(`${DUMMY_URL}/oauth2/authorization/google`)
  })
})