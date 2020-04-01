import axios from 'axios'

const api = axios.create({
    baseURL: 'http://192.168.27.1:4001'
})

export default api