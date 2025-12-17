// src/utils/request.ts
import axios from 'axios'


// 创建axios实例
// src/utils/request.ts
const service = axios.create({
    baseURL: '/api',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error)
        return Promise.reject(error)
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

// 导出request实例
export default service