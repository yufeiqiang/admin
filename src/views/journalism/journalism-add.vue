<template>
    <!-- 新闻添加 -->
    <div style="width:400px">
        <Form ref="formInline" :model="formInline" :rules="ruleInline"  label-position="left" :label-width="90">
            <FormItem prop="head" label="新闻标题">
                <Input type="text" v-model="formInline.head" placeholder="标题">
                </Input>
            </FormItem>
            <FormItem label="上传封面" prop="imgpath">
                <UpLoadimg @changeImgpath='changeImgpath' :imgpathCome='formInline.imgpath'></UpLoadimg>
                <p style="color:#e22c2c">注意：图片上传尺寸500*350px</p>
            </FormItem>
            <FormItem prop="content" label="新闻内容">
                <div>
                    <editor @editorData='changeData' :contentCome.sync='formInline.content'></editor>
                </div>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import { newAdd } from '../../api/app.js'
import  Editor  from '../../components/editor/editor.vue'
import  UpLoadimg  from '../../components/upload-img/upload-img.vue'
export default {
    data () {
        return {                                                                              
            formInline: {
                head: '',
                imgpath:'',
                content:'你好！',
                id:'',
            },
            ruleInline: {
                head: [
                    { required: true, message: '标题是必填', trigger: 'blur' }
                ],
                imgpath:[
                    { required: true, type:'string', message: '请上传新闻封面', trigger: 'blur' }
                ],
                // content:[
                //     { required: true,  message: '新闻内容是必填', trigger: 'blur' }
                // ]
            },
            visible: false
        }
    },
    components:{
        Editor,
        UpLoadimg
    },
    methods: {
        // 保存添加新闻信息
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // console.log(this.formInline.imagepath)
                    this.newAdd()
                } else {
                    this.$Message.error('请填写完整信息');
                }
            })
        },
        // 添加封面图传回来的数据
        changeImgpath(val){
            this.formInline.imgpath=val
            // console.log(val)
        },
        // 接收富文本传回来的数据
        changeData(val){
            // console.log(val)
            this.formInline.formInline = val
        },
        // 保存新闻
        newAdd(){
            let image = this.formInline.imgpath,
                newsTitle = this.formInline.head,
                newsInfor = this.formInline.formInline,
                id = this.formInline.id
            newAdd({image,newsTitle,newsInfor,id}).then((res)=>{
                const data=res.data
                    if(data.code==200){
                        this.$router.push({
                            name:'journalism-list'
                        })
                        this.$Message.success(res.data.desc);
                    }else if(data.code==530){
                        alert('未登录，请登录')
                        let redirect = decodeURIComponent(this.$route.query.redirect || '/login');
                        this.$router.replace({
                            path: '/login'
                        })
                    }else{
                        // alert('系统异常')
                        this.$Message.error(res.data.desc);
                    }
            }).catch((err)=>{

            })
        }
    },
    created () {
        let newAdd=this.$route.query
        // 判断导航入口
        if(JSON.stringify(newAdd) != "{}"){
            console.log(typeof this.formInline.imgpath)
            this.formInline.head=newAdd.row.newsTitle
            this.formInline.imgpath=newAdd.row.image
            this.formInline.content=newAdd.row.newsInfor
            this.formInline.id=newAdd.row.id
        }
    },
    mounted () {
       
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
