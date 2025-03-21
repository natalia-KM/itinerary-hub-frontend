import { BASE_API_PATH } from 'config/envConfig'
import { http, HttpResponse, RequestHandler } from 'msw'

export const buildUseLogoutHandler = ({
    status = 204
}) => {
    const uri = `${BASE_API_PATH}/logout`

    return http.get(uri, () => {
        return new HttpResponse(null, {
            status
        })
    })
}

export const useLogoutSuccessHandler: RequestHandler[] = [
    buildUseLogoutHandler({ })
]

export const useLogoutErrorHandler: RequestHandler[] = [
    buildUseLogoutHandler({ status: 404 })
]