import { BASE_API_PATH } from 'config/envConfig'
import { http, HttpResponse, RequestHandler } from 'msw'

export const buildCreateTripHandler = ({
    status = 201
}) => {
    const uri = `${BASE_API_PATH}/v1/trips`

    return http.post(uri, () => {
        return new HttpResponse(null, {
            status
        })
    })
}

export const useCreateTripSuccessHandler: RequestHandler[] = [
    buildCreateTripHandler({})
]

export const useCreateTripErrorHandler: RequestHandler[] = [
    buildCreateTripHandler({ status: 404 })
]