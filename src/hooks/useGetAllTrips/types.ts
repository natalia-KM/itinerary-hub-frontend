export interface TripDetailsResponse {
    tripId: string
    tripName: string
    createdAt: string
    imageRef: string
    startDate?: string
    endDate?: string
}

export type GetAllTripsResponse = TripDetailsResponse[]