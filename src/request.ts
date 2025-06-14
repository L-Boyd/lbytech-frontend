import axios from "axios";

const myAxios = axios.create({
  //区分开发和线上环境
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "http://www.lbytech.cn:8080",
  timeout: 10000,
  withCredentials: true,
});

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log(response);

    const { data } = response;
    console.log(data);
    //未登录
    if (data.code === 40100) {
      //不是获取用户信息接口，或者不是登录页面，跳转到登陆页面
      if (
        !response.request.responseURL.includes("user/current") &&
        !window.location.pathname.includes("/user/login")
      ) {
        window.location.href = `/user/login?redirect=${window.location.href}`;
      }
    }
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default myAxios;
