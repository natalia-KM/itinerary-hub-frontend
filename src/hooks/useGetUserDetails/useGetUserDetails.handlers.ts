import { http, HttpResponse, RequestHandler } from 'msw'
import { useGetUserDetailsResponses } from './useGetUserDetails.responses'
import { UserDetails } from './types'
import { BASE_API_PATH } from 'config/envConfig'

interface handlerProps {
    status?: number
    response?: UserDetails
}

export const buildGetUserDetailsHandler = ({
    status,
    response = useGetUserDetailsResponses.Guest
}: handlerProps) => {
    const uri = `${BASE_API_PATH}/v1/users`

    return http.get(uri, () => {
        return HttpResponse.json(response, {
            status,
            headers: {
                'Content-Type': 'json'
            }
        })
    })
}

export const useGetUserDetailsSuccessHandler: RequestHandler[] = [
    buildGetUserDetailsHandler({
        response: useGetUserDetailsResponses.Guest
    })
]

export const useGetUserDetailsErrorHandler: RequestHandler[] = [
    buildGetUserDetailsHandler({
        status: 404
    })
]