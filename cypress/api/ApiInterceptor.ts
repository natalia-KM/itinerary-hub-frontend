import { ApiInterceptorBase } from './ApiInterceptorBase'
import { ApiInterceptorResponse, InterceptorAlias, InterceptRequestOptions } from './types'
import { useGetUserDetailsResponses } from 'hooks/useGetUserDetails'

export class ApiInterceptor extends ApiInterceptorBase {

    interceptGetUserDetails({
        status = 201,
        responseBody = useGetUserDetailsResponses.Guest,
        manualResolution = false
    }: InterceptRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: 'http://localhost:8080/v1/users',
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_USER_DETAILS,
            responseBody,
            manualResolution
        })
    }

    interceptCreateGuestUser({
        status = 201,
        manualResolution
    }: InterceptRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: 'http://localhost:8080/v1/users/guest',
            status,
            method: 'POST',
            alias: InterceptorAlias.CREATE_GUEST_USER,
            manualResolution
        })
    }

    interceptLogout({
        status = 204,
        manualResolution
    }: InterceptRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: 'http://localhost:8080/logout',
            status,
            method: 'GET',
            alias: InterceptorAlias.LOGOUT,
            manualResolution
        })
    }

    interceptDeleteAccount({
        status = 204,
        manualResolution
    }: InterceptRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: 'http://localhost:8080/v1/users',
            status,
            method: 'DELETE',
            alias: InterceptorAlias.DELETE_ACCOUNT,
            manualResolution
        })
    }
}

export const apiInterceptor = new ApiInterceptor()