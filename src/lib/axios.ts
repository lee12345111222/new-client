import axios from 'axios'

const axiosInstance = axios.create({
    baseURL:
        process.env.NODE_ENV === 'production'
            ? process.env.REACT_APP_API_BASE_URL_PROD
            :'https://mock.apifox.cn/m1/2059601-0-default/',
})

// http request拦截器 添加一个请求拦截器
axiosInstance.interceptors.request.use(function (config: any) {
    let token = window.localStorage.getItem("Authorization")
    console.log(token,'token')
    if (token) {
        config.headers.Authorization =  "Bearer" + token;
      
        return config;
    }
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});


// 添加响应拦截器
axiosInstance.interceptors.response.use(
    function (response) {
        // 对响应数据做点什么
        return response;
    },
    function (error) {
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);


export default axiosInstance
