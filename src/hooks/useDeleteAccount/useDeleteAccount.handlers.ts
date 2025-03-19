import { BASE_API_PATH } from 'config/envConfig'
import { http, HttpResponse, RequestHandler } from 'msw'

export const buildUseDeleteAccountHandler = ({
    status = 204
}) => {
    const uri = `${BASE_API_PATH}/v1/users`

    return http.delete(uri, () => {
        return new HttpResponse(null, {
            status
        })
    })
}

export const useGetDeleteAccountSuccessHandler: RequestHandler[] = [
    buildUseDeleteAccountHandler({ })
]

export const useGetDeleteAccountErrorHandler: RequestHandler[] = [
    buildUseDeleteAccountHandler({ status: 404 })
]