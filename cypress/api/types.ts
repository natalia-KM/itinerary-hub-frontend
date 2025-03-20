export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'

export interface InterceptOptions {
    url?: string
    method?: HttpMethod
    status?: number
    responseBody?: any
}

export interface InterceptRequestOptions extends InterceptOptions {
    alias: InterceptorAlias
}

export enum InterceptorAlias {
    GET_USER_DETAILS = 'getUserDetails'
}