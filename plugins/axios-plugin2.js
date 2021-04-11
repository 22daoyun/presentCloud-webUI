import axios from 'axios'

//开启浏览器端cookie传递

axios.defaults.withCredentials=true

const EDU_SERVER_API='http://localhost:8080';

let options = {};

options.baseURL = EDU_SERVER_API

let ax = { options:options, get: (req,url) => { options.headers = { "Cookie": req.headers.cookie+";" }

url=options.baseURL+url;
console.log("请求拦截器");

return axios.get(url,options); }}

// 为了在 asyncData 方法中使用

export default ({ app }, inject) => {

// Set the function directly on the context.app object

app.$global = {

ax:ax

}

};
