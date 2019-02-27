<template>
    <!-- 楼盘添加 -->
    <div style="width:660px">
        <Form ref="formInline" :model="formInline" :rules="ruleInline"  label-position="left" :label-width="90">
            <FormItem prop="selected" label="选择地区">
                <div>
                    <area-select type='text' :level='2' v-model="formInline.selected"  :data="pcaa"></area-select>
                </div>
            </FormItem>
            <FormItem prop="custType" label="选择客户类型">
                <Select v-model="formInline.optionVal" >
                    <Option :value="tiem.productType" v-for="tiem in select" :key="tiem.productType">{{tiem.productTypeZh}}</Option>
                </Select>
            </FormItem>
            <FormItem prop="floor" label="添加楼宇">
                <Input type="text" v-model="formInline.floor" placeholder="楼宇">
                </Input>
            </FormItem>
            <FormItem label="上传楼盘广告">
                <UpLoadimg @changeImgpath='changeImgpath' :imgpathCome='formInline.imgpath'></UpLoadimg>
                <p style="color:#e22c2c">注意：图片上传尺寸600*500px</p>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formInline')">保存</Button>
            </FormItem>
        </Form>
    </div>
</template>
<script>
import UpLoadimg from '../../components/upload-img/upload-img'
import {floorAdd, queryAllArea} from '../../api/app.js'
import  Editor  from '../../components/editor/editor.vue'
import { pca, pcaa } from 'area-data';
import 'vue-area-linkage/dist/index.css';
export default {
    components:{
        UpLoadimg,
        Editor
    },
    data () {
        return {
            formInline: {
                floor: '',
                imgpath:'',
                optionVal:'',
                areaVal:'',
                id:'',
                selected:['广东省', '广州市', '天河区']
            },
            select:[{productType: "personal",productTypeZh: "家庭客户"},{productType: "business",productTypeZh: "商业客户"}],
            defaultSelect:'',
            area:'',
            ruleInline: {
                floor: [
                    { required: true, message: '楼宇是必填', trigger: 'blur' }
                ],
                sort:[
                    { required: true, type:'number', message: '请填写一个数字为banner顺序，数字越小排列越高', trigger: 'blur' }
                ],
                addressType: [
                    { required: true, message: '楼宇是必填', trigger: 'blur' }
                ]
            },
            visible: false,
            pca: pca,
            pcaa: pcaa
        }
    },
    methods:{
        // 保存添加新闻信息
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                // console.log(this.xiala)
                if (valid) {
                    this.floorAdd()
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
        floorAdd(){
            let params={
                areolaName:this.formInline.floor,
                buildImage:this.formInline.imgpath,
                userType:this.formInline.optionVal,
                id :this.formInline.id,
                province:this.formInline.selected[0],
                city:this.formInline.selected[1],
                area:this.formInline.selected[2]
            } 
            floorAdd(params).then((res)=>{
                const data=res.data
                if(data.code==200){
                    this.$Message.success(res.data.desc);
                    this.$router.push({
                        name:'address-list'
                    })
                }else if(data.code==530){
                    alert('未登录，请登录')
                    let redirect = decodeURIComponent(this.$route.query.redirect || '/login');
                    this.$router.replace({
                        path: '/login'
                    })
                }else{
                    this.$Message.error(res.data.desc)
                }
            })
        },
    },
    created () {
        // console.log(this.$route.query)
        let routeParams=this.$route.query
        // 判断导航入口
        if(routeParams.row != undefined){
            // alert(14)
            this.formInline.floor=routeParams.row.areolaName
            this.formInline.imgpath=routeParams.row.buildImage
            this.formInline.optionVal=routeParams.row.userType
            this.formInline.id=routeParams.row.id
            this.formInline.areaVal=routeParams.row.area
            this.formInline.selected=routeParams.row.str.split("/")
        }
        // this.queryAllArea()
    },
}
</script>
<style lang="" >
    .area-select .area-selected-trigger{
        padding: 0 0 0 12px !important;
    }
</style>