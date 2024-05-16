import axios from 'axios'

const myAxios = axios.create({
    baseURL: 'http://localhost:3002',
    timeout: 5000,
    // headers:{
    //     'token':JSON.parse(sessionStorage.getItem('user') as string).token
    // }
})

myAxios.interceptors.request.use(
    config => {
        return config
    },
    err => {
        Promise.reject(err);
    }
)

myAxios.interceptors.response.use(
    res => {
        return Promise.resolve(res);
    },
    err => {
        Promise.reject(err);
    }
)

export default myAxios;

