import { BASE_API_PATH } from 'config/envConfig'
import { http, HttpResponse, RequestHandler } from 'msw'
import { TRIP_ID } from 'testUtils/mockValues'

export const buildUpdateTripDetailsHandler = ({
  tripId = TRIP_ID,
  status = 200,
}) => {
    const uri = `${BASE_API_PATH}/v1/trips/${tripId}`

    return http.put(uri, () => {
        return new HttpResponse(null, {
            status
        })
    })
}

export const useUpdateTripDetailsSuccessHandler: RequestHandler[] = [
    buildUpdateTripDetailsHandler({})
]

export const useUpdateTripDetailsErrorHandler: RequestHandler[] = [
    buildUpdateTripDetailsHandler({ status: 404 })
]