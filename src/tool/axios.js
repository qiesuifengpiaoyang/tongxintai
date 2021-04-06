import axios from 'axios';
import { Dialog } from 'vant';
const instance = axios.create({
    timeout: 0,
    withCredentials: false, // request with cookie
    headers: {
        // 'Content-Type': 'applicasettion/json'
    },
    baseURL:'/apis',
    validateStatus(status) {
        return status >= 200 && status <= 500; // default
    }
});
//请求勾子
instance.interceptors.request.use(function (config) {
    return config;
}, function (error) {
    return Promise.reject(error);
});

//响应勾子
instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    Dialog({ message: error+'' });
    return Promise.reject(error);
});
export default instance;