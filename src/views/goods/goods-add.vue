<template>
    <div style="width:400px">
        <Form ref="formInline" :model="formInline" :rules="ruleInline"  label-position="left" :label-width="90">
            <FormItem prop="head" label="产品标题">
                <Input type="text" v-model="formInline.head" placeholder="标题">
                </Input>
            </FormItem>
            <FormItem prop="optionVal" label="产品类型">
                <Select v-model="formInline.optionVal"  placeholder="请选择产品类型">
                    <Option :value="tiem.productType" v-for="tiem in select" :key="tiem.productType">{{tiem.productTypeZh}}</Option>
                </Select>
            </FormItem>
            <FormItem label="上传封面" prop="imgpath">
                <UpLoadimg @changeImgpath='changeImgpath' :imgpathCome='formInline.imgpath'></UpLoadimg>
                <p style="color:#e22c2c">注意：图片上传尺寸300*210px</p>
            </FormItem>
            <FormItem label="产品内容" prop="content">
                <div>
                    <editor @editorData='changeData' :contentCome='formInline.content'></editor>
                </div>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import UpLoadimg from '../../components/upload-img/upload-img'
import {newAdd, goodsTypes,goodsAdd} from '../../api/app.js'
import  Editor  from '../../components/editor/editor.vue'
export default {
    components:{
        UpLoadimg,
        Editor
    },
    data () {
        return {
            formInline: {
                head: '',
                imgpath:'',
                content:'你好！',
                optionVal:'',
                id:''
            },
            select:[],
            defaultSelect:'',
            ruleInline: {
                head: [
                    { required: true, message: '标题是必填', trigger: 'blur' }
                ],
                imgpath:[
                    { required: true,  message: '请上传图片', trigger: 'blur' }
                ],
                optionVal:[
                    { required: true, message: '产品类型是必填', trigger: 'blur' }
                ],
                content:[
                    { required: true, message: '产品内容是必填', trigger: 'blur' }
                ]
            }
        }
    },
    methods:{
        // 保存添加新闻信息
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                // console.log(this.xiala)
                if (valid) {
                    this.goodsAdd()
                } else {
                    this.$Message.error('请填写完整信息');
                }
            })
        },
        // 添加封面图传回来的数据
        changeImgpath(val){
            this.formInline.imgpath=val
        },
        // 接收富文本传回来的数据
        changeData(val){
            // console.log(val)
            this.formInline.content = val
        },
        // 请求产品列表类型
        goodsTypes(){
            goodsTypes({}).then((res)=>{
                const data=res.data
                if(data.code==200){
                    // this.$Message.success(res.data.desc);
                    this._selectData(data)
                }else if(data.code==530){
                    alert('未登录，请登录')
                    let redirect = decodeURIComponent(this.$route.query.redirect || '/login');
                    this.$router.replace({
                        path: '/login'
                    })
                }else{
                    this.$Message.error(res.data.desc);
                }
            })
        },
        goodsAdd(){
            let params={
                productTitle:this.formInline.head,
                productImage:this.formInline.imgpath,
                productType:this.formInline.optionVal,
                productInfo :this.formInline.content,
                id :this.formInline.id,
            } 
            goodsAdd(params).then((res)=>{
                const data=res.data
                if(data.code==200){
                    this.$router.push({
                        name:'goods-list'
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
        // 整理数据
        _selectData(val){
            let data=val.pojo
            let arr=[]
            // console.log(data)
            data.forEach(el => {
                let obj={}
                obj.productType=el.id
                obj.productTypeZh=el.productTypeZh
                arr.push(obj)
            });
            this.select=arr
            // console.log(this.formInline.select)
        },
    },
    created () {
        // console.log(this.$route.query)
        let routeParams=this.$route.query
        // 判断导航入口
        if(JSON.stringify(routeParams) != "{}"){
            console.log(routeParams)
            this.formInline.head=routeParams.row.productTitle
            this.formInline.imgpath=routeParams.row.productImage
            this.formInline.content=routeParams.row.productInfo
            this.formInline.optionVal=routeParams.row.productTypeId
            this.formInline.id=routeParams.row.id
        }
        this.goodsTypes()
    },
}
</script>