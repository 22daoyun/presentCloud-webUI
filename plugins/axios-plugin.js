import _local from '@/plugins/localStorage'
import { Message } from "element-ui";
export default({app,store, route, redirect, $axios}) => {

  $axios.onRequest(config => {
       console.log("请求拦截器")
  if (process.client) {
    const tokenStr=_local.get('sid')
    // 请求头添加token
     if (tokenStr) {
      console.log("添加token");
     config.headers.Authorization = tokenStr;
     }
    // 用户端
     
  }

    if (process.server) {
      // 服务端
      }
      return config
  })

  $axios.onResponse(response => {
      console.log('响应拦截器：', response)
      return response
  })

  $axios.onError(error => {
      console.log('响应异常')
      const code = parseInt(error.response && error.response.status)      
    // switch (code) 分情况处理.
    switch (code) {
              
              case 403:
                error.message = "拒绝访问";
                redirect("/errors/Error403");
                break;
              case 404:
                error.message = "请求错误,未找到该资源";
                redirect("/errors/Error404");
                break;
              case 500:
                error.message = "服务器端出错";
                redirect("/errors/Error500");
                break;
            }
  })


}


// import axios from "axios";
// import _local from '../plugins/localStorage'
// import { Message } from "element-ui";

// const baseUrl = "http://localhost:8080";


// var instance = axios.create({
//   timeout: 5000,
//   baseUrl
// });


// // 添加请求拦截器
// instance.interceptors.request.use(
//   function(config) {
//     const tokenStr=_local.get('sid')
//     // 请求头添加token
//      if (tokenStr) {
//        config.headers.Authorization = tokenStr;
//      }
//     return config;
//   },
//   function(error) {
//     return Promise.reject(error);
//   }
// );

// // 响应拦截器即异常处理
// instance.interceptors.response.use(
//   response => {
//     return response.data;
//   },
//   err => {
//     if (err && err.response) {
//       switch (err.response.status) {
//         case 400:
//           err.message = "请求出错";
//           break;
//         case 401:
//           Message.warning({
//             message: "授权失败，请重新登录"
//           });
//           // store.commit("LOGIN_OUT");
//           setTimeout(() => {
//             window.location.reload();
//           }, 1000);

//           return;
//         case 403:
//           err.message = "拒绝访问";
//           break;
//         case 404:
//           err.message = "请求错误,未找到该资源";
//           break;
//         case 500:
//           err.message = "服务器端出错";
//           break;
//       }
//     } else {
//       err.message = "连接服务器失败";
//     }
//     Message.error({
//       message: err.message
//     });
//     return Promise.reject(err.response);
//   }
// );

