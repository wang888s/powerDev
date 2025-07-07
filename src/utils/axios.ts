import axios, { type AxiosInstance, type AxiosResponse, AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { ElNotification } from 'element-plus';

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: 'https://www.demo.com',
  timeout: 3000,

});
// 请求拦截器
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // 在发送请求之前做些什么


  return config;
}, function (error: AxiosError) {

  ElNotification({
    title: 'Error',
    message: 'Request Error: ' + error.message,
    type: 'error',
  });
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use((response: AxiosResponse) => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么

  const res = response.data


  if (res.code !== 200) {
    ElNotification({
      title: 'Error',
      message: res.message,
      type: 'error',
    });
    return Promise.reject(new Error(res.message || 'Error'))
  }
  else {
    return res
  }
}, function (error: AxiosError) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么

  ElNotification({
    title: 'Error',
    message: '响应错误: ' + error.message,
    type: 'error',
  });
  // console.log(error);

  return Promise.reject(error);
});

export default service;
