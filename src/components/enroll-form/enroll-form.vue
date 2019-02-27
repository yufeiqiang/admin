<template>
    <Form ref="formInline" :model="formInline" :rules="ruleInline" :label-width='80'>
        <FormItem label="账号" prop="account">
            <Input v-model="formInline.account" placeholder="账号可以输入手机号码"></Input>
        </FormItem>
        <FormItem label="昵称" prop="nickname">
            <Input v-model="formInline.nickname" placeholder="可以字母数字组合"></Input>
        </FormItem>
        <FormItem label="组织名称" prop="organize">
            <Input v-model="formInline.organize" placeholder="公司或者组织"></Input>
        </FormItem>
        <FormItem label="密码" prop="password">
            <Input v-model="formInline.password" type="password" placeholder="只能是数字或字母至少六位"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwords">
            <Input v-model="formInline.passwords" type="password" placeholder="再次输入"></Input>
        </FormItem>
        <Button @click="handleSubmit('formInline')" type="primary"  long style="margin-left: 0px;">注册</Button>
    </Form>
</template>
<script>
import {account} from '../../api/user'
    export default {
        data () {
            // 失焦判断账号是否重复
            // const validateUsername = (rule, value, callback) => {
            //     account({value}).then(res=>{
            //         callback()
            //         console.log(res+':请输入正确的号码')
            //     }).catch(err=>{
            //         callback(new Error('请输入正确的手机号'))
            //     })
            // }
            const validatePassword = (rule,value,callbacks) =>{
                const password = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
                if(!password.test(value)){
                callbacks(new Error('密码中必须包括字母和数字'))
                }else {
                callbacks()
                }
            }
            const validatePasswords = (rule,value,callbacks) =>{
                if(value != this.formInline.password){
                callbacks(new Error('两次密码不同，请重新输入'))
                }else {
                callbacks()
                }
            }
            return {
                formInline: {
                    account: '',
                    nickname: '',
                    organize: '',
                    password: '',
                    passwords: '',
                },
                ruleInline: {
                    account: [
                        { required: true, message: '请填写账号', trigger: 'blur' },
                        { required:true, message:'账号不少于3位', min:3, trigger:'blur'},
                        // { required: true, trigger: 'blur',validator:validateUsername}
                    ],
                    nickname: [
                        { required: true, message: '请填写昵称', trigger: 'blur' },
                        { requires: true, message: '昵称不少于三位', min:3,trigger: 'blur' }
                    ],
                    organize: [
                        { required: true, message: '请填写公司或组织名称', trigger: 'blur' },
                    ],
                    password: [
                        { required: true,  message: '请输入密码', trigger: 'change' },
                        {type: 'string', min: 6, max: 10, message: '密码只能6到10位', trigger: 'blur'},
                        { required: true,  trigger: 'blur', validator:validatePassword }
                    ],
                    passwords: [
                        { required: true, message: '请再次输入密码', trigger: 'blur' },
                        { required: true, trigger:'blur',validator:validatePasswords}
                    ]
                }
            }
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$emit('on-success-register',{
                            account:  this.formInline.account,
                            nickname: this.formInline.nickname,
                            organize: this.formInline.organize,
                            password: this.formInline.password
                        })
                    } 
                })
            }
        }
    }
</script>
