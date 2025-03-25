import { ApiInterceptorBase } from './ApiInterceptorBase'
import { ApiInterceptorResponse, InterceptorAlias, InterceptRequestOptions, TripsRequestOptions } from './types'
import { useGetUserDetailsResponses } from 'hooks/useGetUserDetails'
import { TRIP_ID } from 'testUtils/mockValues'
import { useGetAllTripsResponses } from 'hooks/useGetAllTrips/useGetAllTrips.responses'

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

    interceptCreateTrip({
         status = 201,
         manualResolution
     }: InterceptRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: 'http://localhost:8080/v1/trips',
            status,
            method: 'POST',
            alias: InterceptorAlias.CREATE_TRIP,
            manualResolution
        })
    }

    interceptUpdateTrip({
        tripId = TRIP_ID,
        status = 204,
        manualResolution
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/trips/${tripId}`,
            status,
            method: 'PUT',
            alias: InterceptorAlias.UPDATE_TRIP,
            manualResolution
        })
    }

    interceptDeleteTrip({
        tripId = TRIP_ID,
        status = 204,
        manualResolution
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/trips/${tripId}`,
            status,
            method: 'DELETE',
            alias: InterceptorAlias.DELETE_TRIP,
            manualResolution
        })
    }

    interceptGetAllTrips({
        status = 200,
        manualResolution,
        responseBody = useGetAllTripsResponses.multipleTrips
    }: InterceptRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: 'http://localhost:8080/v1/trips',
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_ALL_TRIPS,
            manualResolution,
            responseBody
        })
    }
}

export const apiInterceptor = new ApiInterceptor()