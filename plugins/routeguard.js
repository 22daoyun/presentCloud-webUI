import _local from '../plugins/localStorage'
import { Col } from 'element-ui';
export default ({app }) => {
  // 挂载路由导航守卫
  app.router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 代表从哪个路径跳转而来
    // next 是一个函数，表示放行
    //     next()  放行    next('/login')  强制跳转

    if (to.path === '/login'|| to.path === '/sinup'|| to.path === '/changePassword'|| to.path === '/callback') return next();
    // 获取token
    // console.log(app.$cookies.get('sid'))
    // const tokenStr = app.$cookies.get('sid')
    const tokenStr=_local.get('sid')
    // console.log("storage方法")
     console.log(tokenStr)
     console.log("--------")
    if (!tokenStr) return next("/login");
    next();
  });
};
