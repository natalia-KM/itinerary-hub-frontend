import { AccommodationType } from 'hooks/elements'

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

export interface TripsRequestOptions extends InterceptRequestOptions {
    tripId?: string
    sectionId?: string
    optionId?: string
    elementId?: string
    passengerId?: string
    accommType?: AccommodationType
}

export enum InterceptorAlias {
    GET_USER_DETAILS = 'getUserDetails',
    CREATE_GUEST_USER = 'createGuestUser',
    UPDATE_USER_DETAILS = 'updateUserDetails',
    LOGOUT = 'logout',
    DELETE_ACCOUNT = 'deleteAccount',
    CREATE_TRIP = 'createTrip',
    UPDATE_TRIP = 'updateTrip',
    DELETE_TRIP = 'deleteTrip',
    GET_ALL_TRIPS = 'getAllTrips',
    GET_TRIP = 'getTrip',
    GET_TRIP_DETAILS = 'getTripDetails',
    GET_SECTION = 'getSection',
    CREATE_SECTION = 'createSection',
    UPDATE_SECTION = 'updateSection',
    UPDATE_SECTION_ORDER = 'updateSectionOrder',
    DELETE_SECTION = 'deleteSection',
    GET_SECTIONS = 'getSections',
    GET_OPTION = 'getOption',
    GET_OPTIONS = 'getOptions',
    UPDATE_OPTION = 'updateOption',
    UPDATE_OPTION_ORDER = 'updateOptionOrder',
    DELETE_OPTION = 'deleteOption',
    CREATE_OPTION = 'createOption',
    GET_PASSENGERS = 'getPassengers',
    CREATE_PASSENGER = 'createPassenger',
    UPDATE_PASSENGER = 'updatePassenger',
    DELETE_PASSENGER = 'deletePassenger',
    GET_ELEMENTS = 'getElements',
    GET_ELEMENT = 'getElement',
    GET_TRANSPORT_ELEMENT = 'getTransportElement',
    GET_ACTIVITY_ELEMENT = 'getActivityElement',
    GET_ACCOMM_ELEMENT = 'getAccommElement',
    UPDATE_TRANSPORT_ELEMENT = 'updateTransportElement',
    UPDATE_ACTIVITY_ELEMENT = 'updateActivityElement',
    UPDATE_ACCOMM_ELEMENT = 'updateAccommElement',
    CREATE_TRANSPORT_ELEMENT = 'createTransportElement',
    CREATE_ACTIVITY_ELEMENT = 'createActivityElement',
    CREATE_ACCOMM_ELEMENT = 'createAccommElement'
}

export type CypressThenable = (
    thenableOrResult?: (void | PromiseLike<void>) | undefined
) => void

export type ApiPromise = CypressThenable | undefined

export interface ApiInterceptorResponse {
    resolve?: ApiPromise
    alias: string
}