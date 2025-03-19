import { BASE_API_PATH } from 'config/envConfig'
import { http, HttpResponse, RequestHandler } from 'msw'
import { useGetUserDetailsResponses } from 'hooks/useGetUserDetails'

export const buildUpdateUserDetailsHandler = ({
    status = 200,
    response = useGetUserDetailsResponses.Guest
}) => {
    const uri = `${BASE_API_PATH}/v1/users`

    return http.put(uri, () => {
        return HttpResponse.json(response, {
            status,
            headers: {
                'Content-Type': 'json'
            }
        })
    })
}

export const useUpdateUserDetailsSuccessHandler: RequestHandler[] = [
    buildUpdateUserDetailsHandler({
        response: useGetUserDetailsResponses.Guest
    })
]

export const useUpdateUserDetailsErrorHandler: RequestHandler[] = [
    buildUpdateUserDetailsHandler({ status: 404 })
]