import { ApiInterceptorBase } from './ApiInterceptorBase'
import { InterceptOptions, InterceptorAlias } from './types'
import { useGetUserDetailsResponses } from 'hooks/useGetUserDetails'

export class ApiInterceptor extends ApiInterceptorBase {

    interceptGetUserDetails({
        status = 201,
        responseBody = useGetUserDetailsResponses.Guest
    }: InterceptOptions): Cypress.Chainable {
        return apiInterceptor.interceptRequest({
            url: 'http://localhost:8080/v1/users',
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_USER_DETAILS,
            responseBody
        })
    }
}

export const apiInterceptor = new ApiInterceptor()