import { BASE_API_PATH } from 'config/envConfig'
import { http, HttpResponse, RequestHandler } from 'msw'
import { TRIP_ID } from 'testUtils/mockValues'

export const buildUseDeleteTripHandler = ({
   status = 204,
   tripId = TRIP_ID
}) => {
    const uri = `${BASE_API_PATH}/v1/trips/${tripId}`

    return http.delete(uri, () => {
        return new HttpResponse(null, {
            status
        })
    })
}

export const useDeleteTripSuccessHandler: RequestHandler[] = [
    buildUseDeleteTripHandler({ })
]

export const useDeleteTripErrorHandler: RequestHandler[] = [
    buildUseDeleteTripHandler({ status: 404 })
]