<style lang="less">
    @import './login.less';

    .TabButton {
        padding: 0;
        list-style: none;
        margin-bottom: 20px;
        padding-bottom: 10px;

    }

    .TabButton li {
        float: left;
        width: 50%;
        text-align: center;
        font-size: 20px;
        cursor: pointer;
        font-weight: bold;
        border-bottom: 1px solid #b1b1b1;
    }

    .TabButton li.currTabBut {
        color: #2d8cf0;
        border-bottom: 1px solid #2d8cf0;
    }
    .slide-fadef-enter-active {
        transition: all .3s ease;
    }
    .slide-fadef-leave-active {
        // transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fadef-enter, .slide-fade-leave-to{
        transform: translateX(10px);
        opacity: 0;
    }
</style>

<template>
    <div class="login">
        <div class="login-con">
            <Card icon="log-in" :bordered="false">
                <ul class="TabButton clearfix">
                    <li :class="{currTabBut:ison}" @click="tabWay">登录</li>
                    <li :class="{currTabBut:!ison}" @click="tabWay">注册</li>
                </ul>
                    <transition name="slide-fadef" mode="out-in">
                        <div class="form-con" v-if="ison" key="1">
                            <login-form @on-success-valid='handleSubmit' :loading="loading"></login-form>
                        </div>
                        <div v-else key='2'>
                            <enroll-form @on-success-register='registerSubmit'></enroll-form>
                        </div>
                    </transition>
            </Card>
        </div>
    </div>
</template>

<script>
    import LoginForm from '../../components/login-form'
    import EnrollForm from '../../components/enroll-form/enroll-form.vue'
    import { login,test} from '../../api/user'
    import Cookies from 'js-cookie';
    import { mapActions,mapMutations} from 'vuex'
    export default {
        components: {
            LoginForm,
            EnrollForm
        },
        data() {
            return {
                ison: true,
                view: 'LoginForm',
                loading:false
            }
        },
        mounted() {

        },
        methods: {
            ...mapActions([
              'handleLogin',
              'handleRegister'
            ]),
            ...mapMutations([
                "setUserName"
            ]),
            tabWay() {
                this.ison == true ? this.ison = false : this.ison = true;
                this.view =='LoginForm' ? this.view='EnrollForm':this.view='LoginForm'
            },
            handleSubmit({userName,password}){
                this.loading=true
                this.handleLogin({
                    userName,
                    password
                }).then(res => {
                    if(res){
                        if(res.data.resultState){
                            let username=res.data.pojo.username
                            // console.log(res.data.pojo)
                            this.loading=false
                            this.setUserName(username)
                            Cookies('realname',res.data.pojo.realname)
                            Cookies('isLogin',res.status)
                            Cookies('user',res.data.pojo.username)
                            this.$Message.success('登录成功!');
                            let redirect = decodeURIComponent(this.$route.query.redirect || '/banner-list');
                            this.$router.replace({
                                path: redirect
                            })
                        }else{
                            this.loading=false
                            this.$Message.success('用户名或密码错误!');
                        }
                    }
                })
            },
            registerSubmit({account,nickname,organize,password}){
                this.handleRegister({
                    account,
                    nickname,
                    organize,
                    password
                }).then(res => {
                    if(res){
                        this.$Message.success('注册成功!');
                        Cookies('user',account)
                        Cookies('password',password)
                        let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                        this.$router.replace({
                            path: redirect
                        })
                    }
                })
            },


        }
    }
</script>

<style>

</style>