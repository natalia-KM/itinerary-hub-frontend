import '@testing-library/jest-dom'
import { beforeEach, vi } from 'vitest'

const dummyUrl = 'http://dummy.com'
import.meta.env.VITE_API_URL = dummyUrl

beforeAll(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'warn').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
})

beforeEach(() => {
    // eslint-disable-next-line no-global-assign
    window = Object.create(window)
    Object.defineProperty(window, 'location', {
        value: {
            href: dummyUrl
        },
        writable: true
    })
})

