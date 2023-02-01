import { message } from 'antd';
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_API_BASE_URL_PROD
            : process.env.REACT_APP_API_BASE_URL_DEV,
});

// http request拦截器 添加一个请求拦截器
axiosInstance.interceptors.request.use(
    function (config: any) {
        let token = sessionStorage.getItem('Authorization');
        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        } else {
            // window.location.href =
            //     'landingPage?' + sessionStorage.getItem('session');
        }
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// 添加响应拦截器
axiosInstance.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response;
    },
    function (error) {
        if (error.config.url === 'login') {
            return Promise.reject(error);
        }
        if (
            error.response.status === 401 &&
            error.response.statusText === 'Unauthorized'
        ) {
            sessionStorage.removeItem('Authorization');
            window.location.href =
                'landingPage?' + sessionStorage.getItem('session');
        }
        // 对响应错误做点什么
        return Promise.reject(error);
    },
);

export default axiosInstance;
