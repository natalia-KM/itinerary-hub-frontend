import { http, HttpResponse, RequestHandler } from 'msw'
import { BASE_API_PATH } from 'config/envConfig'

export const buildSignUpAsGuestHandler = ({
    status = 201
}) => {
    const uri = `${BASE_API_PATH}/v1/users/guest`

    return http.post(uri, () => {
        return new HttpResponse(null, {
            status
        })
    })
}

export const useSignUpAsGuestSuccessHandler: RequestHandler[] = [
    buildSignUpAsGuestHandler({})
]

export const useSignUpAsGuestErrorHandler: RequestHandler[] = [
    buildSignUpAsGuestHandler({ status: 404 })
]