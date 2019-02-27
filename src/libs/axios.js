import axios from 'axios'
import Cookies from 'js-cookie';
import { router } from '../router/index'

axios.defaults.withCredentials = true
class HttpRequest {
  constructor (baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig () {
    const config = {
      baseURL: this.baseUrl,
      headers: {
        // 'Content-Type':'application/x-www-form-urlencoded'
      }
    }
    return config
  }
  distroy (url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }
  interceptors (instance, url) {
    // 请求拦截
    // debugger
    instance.interceptors.request.use(config => {
      // 添加全局的loading...
      // console.log(config)
      if (!Object.keys(this.queue).length) {
        // Spin.show() // 不建议开启，因为界面不友好
      }
      this.queue[url] = true
      return config
    }, error => {
      return Promise.reject(error)
    })
    // 响应拦截
    instance.interceptors.response.use(res => {
      // Cookies('isLogin',res)
      // console.log(res)
      this.distroy(url)
      const { data, status } = res
      return { data, status }
    }, error => {
      // JSON.stringify(error)
      //状态码等于530未登录 跳转到登录页
      if(error.response.status==530){
        // console.log(router)
        router.replace({
          name: 'login',
          query: { redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
        })
      }
      this.distroy(url)
      return Promise.reject(error)
    })
  }
  request (options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

// const baseUrl ='http://192.168.0.126:8080/weaving/'
// const baseUrl ='http://192.168.0.126:8081/'
// const baseUrl ='http://www.weaving-comm.com:8081'
const baseUrl ='weaving/'

const http = new HttpRequest(baseUrl)

export default http

// import HttpRequest from '@/libs/axios'
// import config from '@/config'
// const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

// const axios = new HttpRequest(baseUrl)
// export default axios
