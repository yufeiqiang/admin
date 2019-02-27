<template>
    <div>
        <div class="uploadimg">
            <div class="demo-upload-list">
                <template>
                    <img :src="imgpath">
                    <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(imgpath)"></Icon>
                    </div>
                </template>
            </div>
            <Upload
                ref="upload"
                name = fileInfo
                :show-upload-list="false"
                :on-success="handleSuccess"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                multiple
                type="drag"
                action="http://www.weaving-comm.com:8888/fileUploadService/upload/imageUpload.do"
                style="display: inline-block;width:58px;">
                <div style="width: 58px;height:58px;line-height: 58px;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
                <img :src="imgName" v-if="visible" style="width: 100%">
            </Modal>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            visible: false,
            imgpath:''
        }
    },
    props: {
        imgpathCome:{
            type:String,
            default:''
        }
    },
    methods: {
        // 查看大图
        handleView (name) {
            this.imgName = name;
            this.visible = true;
        },
        // 图片上传成功
        handleSuccess (res, file) {
            this.imgpath=res.pojo
            file.url =res.pojo;
        },
    },
    watch:{
        imgpath(val){
            this.$emit('changeImgpath',val)    
        }
    },
    mounted () {
        this.imgpath=this.imgpathCome
        console.log(this.imgpath)
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


    
