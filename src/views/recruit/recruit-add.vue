<template>
    <!-- 发布招聘 -->
    <div style="width:1000px">
        <Form ref="formInline" :model="formInline" :rules="ruleInline"  label-position="left" :label-width="90">
             <FormItem prop="title" label="岗位类型">
                <Input type="text" v-model="formInline.title" placeholder="如：Java开发">
                </Input>
            </FormItem>
            <FormItem>
                <div>
                    <vue-editor v-model="contentCome" useCustomImageHandler
                    @imageAdded="handleImageAdded" ></vue-editor>
                </div>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit" style="margin-top:20px">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import {recruit,recruitList} from '../../api/app.js'
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
export default {
    data () {
        return {
            contentCome:'<h3>hello</h3>',
            id:'',
            formInline: {
                title: ''
            },
            ruleInline: {
                title: [
                    { required: true, message: '请填写招聘职位', trigger: 'blur' }
                ]
            },
        }
    },
    components: {
      VueEditor
    },
    methods:{
        // 保存添加新闻信息
        handleSubmit() {
            this.recruit()
        },
        recruit(){
            let params={
                id:this.id,
                recruitInfo :this.contentCome,
                title:this.formInline.title
            } 
            recruit(params).then((res)=>{
                const data=res.data
                if(data.code==200){
                   this.$Message.success('保存成功');
                   this.$router.push({
                        name: 'recruit-list'
                    })
                }else if(data.code==530){
                    alert('未登录，请登录')
                    let redirect = decodeURIComponent(this.$route.query.redirect || '/login');
                    this.$router.replace({
                        path: '/login'
                    })
                }else{
                    alert('系统异常')
                }
            })
        },
        //图片上传及回显
        handleImageAdded: function(file, Editor, cursorLocation) {
            var formData = new FormData();
            formData.append('fileInfo', file)
            axios({
              url: 'http://www.weaving-comm.com:8888/fileUploadService/upload/imageUpload.do',
              method: 'POST',
              data: formData
            })
            .then((result) => {
                // console.log(result.data.pojo)
              let url = result.data.pojo // Get url from response
              Editor.insertEmbed(cursorLocation, 'image', url);
            })
            .catch((err) => {
                console.log(err);
            })
        },

    },
    created () {
        let _this = this;
        let routeParams=_this.$route.query;
        if(JSON.stringify(routeParams) != "{}"){
            _this.formInline.title=routeParams.row.title;
            _this.id=routeParams.row.id;
            _this.contentCome = routeParams.row.recruitInfo
        }
    },
  
    mounted() {
    },
}
</script>