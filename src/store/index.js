import Vue from 'vue'
import Vuex from 'vuex'
import {login,Register} from '../api/user'
import Cookies from 'js-cookie';
import {appRouter} from '../router/routers'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //
    userName:'未登录',
    menuList: []
  },
  mutations: {
    logout(){
      Cookies.remove('isLogin')
    },
    setUserName(state,name){
      state.userName=name
    },
    updateMenulist (state){
      state.menuList=appRouter
    }
  },
  actions: {
    handleLogin({commit},{userName,password}){
      // username = username.trim()
      return new Promise((resolve,reject)=>{
        login({
            userName,
            password
          }).then(res=>{
            const data=res.data
            resolve(res)
          }).catch(err=>{
            reject(err)
          })
        })
    },
    handleRegister({commit},{account,nickname,organize,password}){
      return new Promise((resolve,reject)=>{
        Register({
          account,
          nickname,
          organize,
          password
        }).then(res=>{
          resolve(res)
        }).catch(err=>{
          reject(err)
        })
      })
    }
  },
  getters: {
      getUserName(state){
        return state.userName
      }
  }
})