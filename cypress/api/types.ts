export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface InterceptOptions {
    url?: string
    method?: HttpMethod
    status?: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    responseBody?: any
}

export interface InterceptRequestOptions extends InterceptOptions {
    alias?: string
    manualResolution?: boolean
}

export enum InterceptorAlias {
    GET_USER_DETAILS = 'getUserDetails',
    CREATE_GUEST_USER = 'createGuestUser',
    LOGOUT = 'logout',
    DELETE_ACCOUNT = 'deleteAccount'
}

export type CypressThenable = (
    thenableOrResult?: (void | PromiseLike<void>) | undefined
) => void

export type ApiPromise = CypressThenable | undefined

export interface ApiInterceptorResponse {
    resolve?: ApiPromise
    alias: string
}