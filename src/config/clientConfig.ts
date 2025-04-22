import axios from 'axios'
import { BASE_API_PATH } from 'config/envConfig'

const webClient = axios.create({
    baseURL: BASE_API_PATH,
    withCredentials: true,
})

webClient.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default webClient