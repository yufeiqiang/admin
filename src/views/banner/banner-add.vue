<template>
    <div style="width:400px">
        <Form ref="formInline" :model="formInline" :rules="ruleInline"  label-position="left" :label-width="120" style=" fontSize:20px">
            <FormItem prop="user" label="标题">
                <Input type="text" v-model="formInline.user" placeholder="标题">
                </Input>
            </FormItem>
            <FormItem prop="sort" label="排序">
                <Input number v-model="formInline.sort" placeholder="排序">
                </Input>
            </FormItem>
            <FormItem label="上传轮播图：" prop='imgpath'>
                <div>
                    <UpLoadimg @changeImgpath='changeImgpath' :imgpathCome='formInline.imgpath'></UpLoadimg>
                </div>
                <p style="color:#e22c2c">注意：图片上传尺寸1920*500px</p>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import { bannerAdd } from '../../api/app.js'
import  UpLoadimg  from '../../components/upload-img/upload-img.vue'
    export default {
        components:{
            UpLoadimg
        },
        data () {
            return {                                                                              
                formInline: {
                    user: '',
                    sort: '',
                    imgpath:'',
                    id:'',
                },
                ruleInline: {
                    user: [
                        { required: true, message: '标题是必填', trigger: 'blur' }
                    ],
                    sort:[
                        { required: true, type:'number', message: '请填写一个数字为banner顺序，数字越小排列越高', trigger: 'blur' }
                    ],
                    imgpath:[
                        { required: true, type:'string', trigger: 'blur', message: 'banner为必传，请求上传banner图' }
                    ]
                },
                visible: false
            }
        },
        methods: {
            // 保持轮播数据
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        // console.log(this.formInline.imagepath)
                        this.bannerAdd()
                    } else {
                        this.$Message.error('请填写完整信息');
                    }
                })
            },

             // 添加封面图传回来的数据
            changeImgpath(val){
                this.formInline.imgpath=val
            },

            // 添加图片
            bannerAdd(){
                let data={
                    imagepath:this.formInline.imgpath,
                    imageIndex: this.formInline.sort,
                    imageName:this.formInline.user,
                    id:this.formInline.id
                }
                bannerAdd(data).then((res)=>{
                    const data=res.data
                    if(data.code==200){
                        this.$Message.success(res.data.desc);
                        this.$router.push({
                            name: 'banner-list',
                        })
                    }else if(data.code==530){
                        alert('未登录，请登录')
                        let redirect = decodeURIComponent(this.$route.query.redirect || '/login');
                        this.$router.replace({
                            path: '/login'
                        })
                    }else{
                        this.$Message.error(res.data.desc);
                        alert('系统异常')
                    }
                })
            }
        },
        created () {
            let addBanner = this.$route.query
            if(JSON.stringify(addBanner) != "{}"){
                this.formInline.user=addBanner.row.imageName
                this.formInline.sort=parseInt(addBanner.row.imageIndex)
                this.formInline.imgpath=addBanner.row.imagepath
                this.formInline.id=addBanner.row.id
            }
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 60px;
        height: 60px;
        text-align: center;
        line-height: 60px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>

