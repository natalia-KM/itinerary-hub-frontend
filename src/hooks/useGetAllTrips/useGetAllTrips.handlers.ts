import { http, HttpResponse, RequestHandler } from 'msw'
import { BASE_API_PATH } from 'config/envConfig'
import { useGetAllTripsResponses } from './useGetAllTrips.responses'
import { GetAllTripsResponse } from './types'

interface handlerProps {
    status?: number
    response?: GetAllTripsResponse
}

export const buildGetAllTripsHandler = ({
   status,
   response = useGetAllTripsResponses.multipleTrips
}: handlerProps) => {
    const uri = `${BASE_API_PATH}/v1/trips`

    return http.get(uri, () => {
        return HttpResponse.json(response, {
            status,
            headers: {
                'Content-Type': 'json'
            }
        })
    })
}

export const useGetAllTripsSuccessHandler: RequestHandler[] = [
    buildGetAllTripsHandler({
        response: useGetAllTripsResponses.multipleTrips
    })
]

export const useGetAllTripsErrorHandler: RequestHandler[] = [
    buildGetAllTripsHandler({
        status: 404
    })
]