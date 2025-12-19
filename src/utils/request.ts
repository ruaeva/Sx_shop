// src/utils/request.ts
import axios, {
    type AxiosRequestConfig,
    type AxiosResponse,
    type AxiosError,
    type InternalAxiosRequestConfig
} from 'axios';

// 创建axios实例
const service = axios.create({
    baseURL: import.meta.env.VITE_APP_API_URL as string, // 使用 import.meta.env 替代 process.env
    timeout: 10000, // 增加超时时间
    headers: {
        'Content-Type': 'application/json'
    }
});

// 请求拦截器
service.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 可以在这里添加认证token等
        const token = uni.getStorageSync('token'); // 如果有使用uni-app的存储
        if (token) {
            config.headers!['Authorization'] = `Bearer ${token}`;
        }
        console.log('Request config:', config);
        return config;
    },
    (error: AxiosError) => {
        console.error('Request error:', error);
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log('Response:', response);
        const { data, status } = response;
        // 检查业务状态码
        if (status >= 200 && status < 300) {
            // 如果API有统一的业务状态码，可以根据需要处理
            // 例如：if (data.code === 200) return data.data; else throw new Error(data.message);
            return data;
        } else {
            console.error('Response status error:', status);
            return Promise.reject(new Error(`Response status: ${status}`));
        }
    },
    (error: AxiosError) => {
        console.error('Response error:', error);
        // 统一错误处理
        if (error.response) {
            // 服务器返回错误状态码
            const { status, data } = error.response;
            switch (status) {
                case 400:
                    console.error('请求参数错误');
                    break;
                case 401:
                    console.error('未授权，请重新登录');
                    // 可以跳转到登录页
                    break;
                case 403:
                    console.error('拒绝访问');
                    break;
                case 404:
                    console.error('请求资源不存在');
                    break;
                case 500:
                    console.error('服务器内部错误');
                    break;
                default:
                    console.error(`连接错误${status}`);
            }
        } else if (error.request) {
            // 请求已发出但未收到响应
            console.error('网络连接错误:', error.message);
        } else {
            // 其他错误
            console.error('请求错误:', error.message);
        }
        return Promise.reject(error);
    }
);

// 导出request实例
export default service;