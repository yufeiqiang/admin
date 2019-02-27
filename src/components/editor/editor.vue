<template>
  <div style="width:1000px">
    <div>
      <vue-editor v-model="content" useCustomImageHandler
      @imageAdded="handleImageAdded" ></vue-editor>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
export default {
    components: {
      VueEditor
    },
    data() {
        return {
            content:"<h3>hello</h3>",//富文本的内容
        }
    },
    props:{
      contentCome:{
        type:String,
        default:''
      }
    },
    methods: {
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
    watch: {
        content(val){
          this.$emit('editorData',val)
        }
    },
    mounted() {
      this.content=this.contentCome
    },
};
</script>
<style>
.demo-upload-list {
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
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
  margin-right: 4px;
}
.demo-upload-list img {
  width: 100%;
  height: 100%;
}
.demo-upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
.demo-upload-list:hover .demo-upload-list-cover {
  display: block;
}
.demo-upload-list-cover i {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  margin: 0 2px;
}
</style>

