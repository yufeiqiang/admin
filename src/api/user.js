import http from '../libs/axios'
import Qs from 'qs'
//登录接口
export const login =({userName,password}) => {
    const data ={
        username:userName,
        password:password
    }
    return http.request({
        url:' manager/login.do',
        // url:'backend/login/login',
        data:Qs.stringify(data),
        // data:data,
        method:'post'
    })
}
export const Register = ({account,nickname,organize,password})=>{
    const data = {
        username:account,
        realname:nickname,
        organization:organize,
        password:password
    }
    return http.request({
        // url:'backend/login/login',
        url:'/home/regist.do',
        data:Qs.stringify(data),
        method:'post'
    })
} 

export const account = ({account})=>{
    const data = {
        account:account
    }
    return http.request({
        url:'backend/login/login',
        data:Qs.stringify(data),
        method:'post'
    })
}
// 推出登录
export const loginout = ()=>{
    return http.request({
        url:'manager/loginout.do',
        method:'post'
    })
}