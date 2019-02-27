import Vue from 'vue'
import VueRouter from 'vue-router'
import {routers} from './routers'
import iView from 'iview'
import Util from '../libs/util'
import Cookies from  'js-cookie'

Vue.use(VueRouter)

export const router= new VueRouter({
    routes:routers,
    // mode: 'history'
})
const LOGIN_PAGE_NAME='login'
router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    // console.log(!Cookies.get('isLogin'))
    if (Cookies.get('isLogin')==530 && to.name !== LOGIN_PAGE_NAME) { // 判断是否已经登录且前往的页面不是登录页
        alert('请登录啊啊啊啊')
        next({
            replace: true,
            name: 'login'   
        });
    } else if (Cookies.get('isLogin')==530 && to.name === LOGIN_PAGE_NAME) { // 判断是否已经登录且前往的是登录页
        Util.title();
        next({
            replace: true,
            name: 'index'
        });
    }
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

export default router