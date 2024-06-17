import axios from 'axios'

const myAxios = axios.create({
    baseURL: 'http://localhost:3002',
    timeout: 5000,
})
// 请求拦截器
myAxios.interceptors.request.use(
    config => {
        // 判断是否是需要token的请求
        if (config.url === '/webapi/login'
            || config.url === '/webapi/sign'
            || config.url === '/webapi/forget'
            || config.url === '/webapi/storeLogin'
        ) {
            return config;
        } else {
            config.headers = <any>{
                ...config.headers,
                'token': JSON.parse(sessionStorage.getItem('user') as string).token
            }
            return config;
        }
    },
    err => {
        Promise.reject(err);
    }
)
// 响应拦截器
myAxios.interceptors.response.use(
    res => {
        return Promise.resolve(res);
    },
    err => {
        Promise.reject(err);
    }
)

export default myAxios;

