export interface UpdateTripRequestValues {
    tripName?: string
    startDate?: string
    endDate?: string
    imageRef?: string
}

export interface UpdateTripRequest {
    tripId: string
    request: UpdateTripRequestValues
}