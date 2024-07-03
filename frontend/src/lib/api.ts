import axios from 'axios'
import { getCookie } from 'cookies-next'

export const API_URL: string =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:9999'

const axiosInstance = axios.create()

axiosInstance.interceptors.request.use(config => {
  const token = getCookie('token')

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`
  }

  return config
})

export default axiosInstance
