import { ApiInterceptorBase } from './ApiInterceptorBase'
import { ApiInterceptorResponse, InterceptorAlias, InterceptRequestOptions, TripsRequestOptions } from './types'
import { useGetUserDetailsResponses } from 'hooks/useGetUserDetails'
import { ACCOMMODATION_1, ACTIVITY_1, S1_OPTION_1_ID, SECTION_1_ID, TRANSPORT_1, TRIP_ID } from 'testUtils/mockValues'
import { useGetAllTripsResponses } from 'hooks/trips/useGetAllTrips/useGetAllTrips.responses'
import { useGetTripResponses } from 'hooks/trips'
import { useGetTripDetailsResponses } from 'hooks/trips/useGetTripDetails/useGetTripDetails.responses'
import { useGetSectionResponses, useGetSectionsResponses } from 'hooks/sections'
import { useGetOptionResponses, useGetOptionsResponses } from 'hooks/options'
import {
    AccommodationType,
    ElementType,
    useGetAccommodationElementPairResponses,
    useGetActivityElementResponses,
    useGetTransportElementResponses
} from 'hooks/elements'
import { useGetPassengersResponses } from 'hooks/passengers/useGetPassengers/useGetPassengers.responses'

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

    interceptUpdateUserDetails({
        status = 201,
        manualResolution
    }: InterceptRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: 'http://localhost:8080/v1/users',
            status,
            method: 'PUT',
            alias: InterceptorAlias.UPDATE_USER_DETAILS,
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

    interceptGetTrip({
        status = 200,
        manualResolution,
        responseBody = useGetTripResponses[TRIP_ID],
        tripId = TRIP_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/trips/${tripId}`,
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_TRIP,
            manualResolution,
            responseBody
        })
    }

    interceptGetTripDetails({
        status = 200,
        manualResolution,
        responseBody = useGetTripDetailsResponses[TRIP_ID],
        tripId = TRIP_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/trips/${tripId}`,
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_TRIP_DETAILS,
            manualResolution,
            responseBody
        })
    }

    interceptGetSection({
        status = 200,
        manualResolution,
        responseBody = useGetSectionResponses[SECTION_1_ID],
        tripId = TRIP_ID,
        sectionId = SECTION_1_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/trips/${tripId}/sections/${sectionId}`,
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_SECTION,
            manualResolution,
            responseBody
        })
    }

    interceptGetSections({
        status = 200,
        manualResolution,
        responseBody = useGetSectionsResponses[TRIP_ID],
        tripId = TRIP_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/trips/${tripId}/sections`,
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_SECTIONS,
            manualResolution,
            responseBody
        })
    }

    interceptCreateSection({
        status = 200,
        manualResolution,
        tripId = TRIP_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/trips/${tripId}/sections`,
            status,
            method: 'POST',
            alias: InterceptorAlias.CREATE_SECTION,
            manualResolution
        })
    }

    interceptUpdateSection({
        status = 200,
        manualResolution,
        tripId = TRIP_ID,
        sectionId = SECTION_1_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/trips/${tripId}/sections/${sectionId}`,
            status,
            method: 'PUT',
            alias: InterceptorAlias.UPDATE_SECTION,
            manualResolution
        })
    }

    interceptDeleteSection({
        status = 200,
        manualResolution,
        tripId = TRIP_ID,
        sectionId = SECTION_1_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/trips/${tripId}/sections/${sectionId}`,
            status,
            method: 'DELETE',
            alias: InterceptorAlias.DELETE_SECTION,
            manualResolution
        })
    }

    interceptUpdateSectionOrder({
        status = 200,
        manualResolution,
        tripId = TRIP_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/trips/${tripId}/sections`,
            status,
            method: 'PUT',
            alias: InterceptorAlias.UPDATE_SECTION_ORDER,
            manualResolution
        })
    }

    interceptGetOption({
        status = 200,
        manualResolution,
        responseBody = useGetOptionResponses[S1_OPTION_1_ID],
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}`,
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_OPTION,
            manualResolution,
            responseBody
        })
    }

    interceptGetOptions({
        status = 200,
        manualResolution,
        responseBody = useGetOptionsResponses[SECTION_1_ID],
        sectionId = SECTION_1_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options`,
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_OPTIONS,
            manualResolution,
            responseBody
        })
    }

    interceptUpdateOption({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}`,
            status,
            method: 'PUT',
            alias: InterceptorAlias.UPDATE_OPTION,
            manualResolution
        })
    }

    interceptUpdateOptionOrders({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options`,
            status,
            method: 'PUT',
            alias: InterceptorAlias.UPDATE_OPTION_ORDER,
            manualResolution
        })
    }

    interceptCreateOption({
        status = 200,
        manualResolution,
        tripId = TRIP_ID,
        sectionId = SECTION_1_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/trips/${tripId}/sections/${sectionId}/options`,
            status,
            method: 'POST',
            alias: InterceptorAlias.CREATE_OPTION,
            manualResolution
        })
    }

    interceptDeleteOption({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}`,
            status,
            method: 'DELETE',
            alias: InterceptorAlias.DELETE_OPTION,
            manualResolution
        })
    }

    interceptCreateTransportElement({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID,
        responseBody = useGetTransportElementResponses[TRANSPORT_1]
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}/elements/transport`,
            status,
            method: 'POST',
            alias: InterceptorAlias.CREATE_TRANSPORT_ELEMENT,
            responseBody,
            manualResolution
        })
    }

    interceptCreateActivityElement({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID,
        responseBody = useGetActivityElementResponses[ACTIVITY_1]
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}/elements/activity`,
            status,
            method: 'POST',
            alias: InterceptorAlias.CREATE_ACTIVITY_ELEMENT,
            responseBody,
            manualResolution
        })
    }

    interceptCreateAccommElement({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID,
        responseBody = useGetAccommodationElementPairResponses[ACCOMMODATION_1]
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}/elements/accommodation`,
            status,
            method: 'POST',
            alias: InterceptorAlias.CREATE_ACCOMM_ELEMENT,
            responseBody,
            manualResolution
        })
    }

    interceptBulkElementOrderUpdate({
        status = 204,
        manualResolution
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: 'http://localhost:8080/v1/elements',
            status,
            method: 'PUT',
            alias: InterceptorAlias.BULK_UPDATE_ELEMENT_ORDER,
            manualResolution
        })
    }

    interceptGetElement({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID,
        elementId = TRANSPORT_1,
        responseBody = [
            useGetTransportElementResponses[elementId]
        ]
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}/elements/${elementId}`,
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_ELEMENT,
            responseBody,
            manualResolution
        })
    }

    interceptGetElements({
        status = 200,
        manualResolution,
        optionId = S1_OPTION_1_ID,
        responseBody = [
            useGetTransportElementResponses[TRANSPORT_1],
            useGetAccommodationElementPairResponses[ACCOMMODATION_1][0],
            useGetActivityElementResponses[ACTIVITY_1],
            useGetAccommodationElementPairResponses[ACCOMMODATION_1][1]
        ]
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/options/${optionId}/elements`,
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_ELEMENTS,
            responseBody,
            manualResolution
        })
    }

    interceptGetTransportElement({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID,
        elementId = TRANSPORT_1,
        responseBody = useGetTransportElementResponses[TRANSPORT_1]
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}/elements/${elementId}/transport`,
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_TRANSPORT_ELEMENT,
            responseBody,
            manualResolution
        })
    }

    interceptGetActivityElement({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID,
        elementId = ACTIVITY_1,
        responseBody = useGetActivityElementResponses[ACTIVITY_1]
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}/elements/${elementId}/activity`,
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_ACTIVITY_ELEMENT,
            responseBody,
            manualResolution
        })
    }

    interceptGetAccommodationElement({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID,
        elementId = ACCOMMODATION_1,
        responseBody = useGetAccommodationElementPairResponses[ACCOMMODATION_1][0],
        accommType = AccommodationType.CHECK_IN
    }: TripsRequestOptions): ApiInterceptorResponse {
        const requestParam = `?type=${accommType}`

        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}/elements/${elementId}/accommodation${requestParam}`,
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_ACCOMM_ELEMENT,
            responseBody,
            manualResolution
        })
    }

    interceptUpdateTransportElement({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID,
        elementId = TRANSPORT_1,
        responseBody = useGetTransportElementResponses[TRANSPORT_1]
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}/elements/${elementId}/transport`,
            status,
            method: 'PUT',
            alias: InterceptorAlias.UPDATE_TRANSPORT_ELEMENT,
            responseBody,
            manualResolution
        })
    }

    interceptUpdateActivityElement({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID,
        elementId = ACTIVITY_1,
        responseBody = useGetActivityElementResponses[ACTIVITY_1]
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}/elements/${elementId}/activity`,
            status,
            method: 'PUT',
            alias: InterceptorAlias.UPDATE_ACTIVITY_ELEMENT,
            responseBody,
            manualResolution
        })
    }

    interceptUpdateAccommodationElementPair({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID,
        elementId = ACCOMMODATION_1,
        responseBody = useGetAccommodationElementPairResponses[ACCOMMODATION_1]
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}/elements/${elementId}/accommodation`,
            status,
            method: 'PUT',
            alias: InterceptorAlias.UPDATE_ACCOMM_ELEMENT,
            responseBody,
            manualResolution
        })
    }

    interceptDeleteElement({
        status = 200,
        manualResolution,
        sectionId = SECTION_1_ID,
        optionId = S1_OPTION_1_ID,
        elementId = TRANSPORT_1,
        elementType = ElementType.TRANSPORT
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/sections/${sectionId}/options/${optionId}/elements/${elementId}?type=${elementType}`,
            status,
            method: 'DELETE',
            alias: InterceptorAlias.DELETE_ELEMENT,
            manualResolution
        })
    }

    interceptGetPassengers({
        status = 200,
        manualResolution,
        responseBody = useGetPassengersResponses
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: 'http://localhost:8080/v1/passengers',
            status,
            method: 'GET',
            alias: InterceptorAlias.GET_PASSENGERS,
            responseBody,
            manualResolution
        })
    }

    interceptCreatePassenger({
        status = 201,
        manualResolution
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: 'http://localhost:8080/v1/passengers',
            status,
            method: 'POST',
            alias: InterceptorAlias.CREATE_PASSENGER,
            manualResolution
        })
    }

    interceptUpdatePassenger({
        status = 200,
        manualResolution,
        passengerId
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/passengers/${passengerId}`,
            status,
            method: 'PUT',
            alias: InterceptorAlias.UPDATE_PASSENGER,
            manualResolution
        })
    }

    interceptDeletePassenger({
        status = 200,
        manualResolution,
        passengerId
    }: TripsRequestOptions): ApiInterceptorResponse {
        return apiInterceptor.interceptRequest({
            url: `http://localhost:8080/v1/passengers/${passengerId}`,
            status,
            method: 'DELETE',
            alias: InterceptorAlias.DELETE_PASSENGER,
            manualResolution
        })
    }
}

export const apiInterceptor = new ApiInterceptor()