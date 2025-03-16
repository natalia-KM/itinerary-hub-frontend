import axios from 'axios'
import { BASE_API_PATH } from "./envConfig"

const webClient = axios.create({
    baseURL: BASE_API_PATH,
    withCredentials: true,
})

webClient.interceptors.response.use(
    (response) => {
        // if(window.location.pathname === '/login') {
        //     window.location.href = '/dashboard'
        // }
        return response
    },
    (error) => {
        const status = error.response?.status

        if (status === 401 || status === 302) {
            console.warn('Unauthorized! Redirecting to login...')
            if(window.location.pathname !== '/login') {
                window.location.href = '/login'
            }

        }
        console.log(error)
        return Promise.reject(error)
    }
)

export default webClient