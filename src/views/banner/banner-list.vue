<template>
  <!-- 广告图列表页 -->
  <div>
    <Table border :columns="columns"  :data="data"></Table>
    <Modal
        v-model="modalDele"
        @on-ok="sure"
        draggable 
        scrollable>
        <p style="text-align:center; font-size:18px">你确定要删除此条记录吗</p>
    </Modal>
  </div>
</template>
<script>
  import { bannerList, bannerDelete} from '../../api/app.js'
  import { timeChang } from '../../libs/timeChang.js'
  export default {
    data() {
      return {
        columns: [{
            title: '排序',
            key:'imageIndex',
            align:'center',
            width:60
          },
          {
            title: '标题',
            key: 'imageName',
            align:'center'
          },
          {
            title: '创建时间',
            key: 'createTime',
            align:'center'
          },
          {
            title: '图片',
            key: 'imagepath',
            align:'center',
            render:(h,params) =>{
              return h('div',[
                h('img',{
                  attrs:{
                    src:params.row.imagepath
                  },
                  style:{
                    width:'140px',
                    height:'60px',
                    padding:'10px 0 4px'
                  }
                })
              ])
            }
          },
          {
            title: '图片id',
            key: 'id',
            align:'center',
          },
          {
            title: '操作',
            key: 'action',
            width: 300,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.revise(params)
                    }
                  }
                }, '修改'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                  },
                  on: {
                    click: () => {
                      this.modalDele=true
                      this.params= params
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        data: [],
        modalDele:false,
        params:''
      }
    },
    methods: {
      revise(index) {
        let data=index.row
        this.$router.push({
          name: 'banner-add',
          query: {
              row:data
          }
        })
      },
      // 默认请求banner列表
      bannerList(){
         bannerList({}).then((res)=>{
            const data=res.data
           if(data.code==200){
              let oData=data.pojo
              let equiDataList=[];
              oData.forEach(el => {
                  let obj = {}
                  obj.imageIndex= el.imageIndex
                  obj.createTime= timeChang(el.createTime)
                  obj.imageName = el.imageName
                  obj.imagepath = el.imagepath
                  obj.id = el.id
                  equiDataList.push(obj)    
              })
              this.data=equiDataList
           }else if(data.code==530){
              alert('请登录')
              let redirect = decodeURIComponent(this.$route.query.redirect || '/login');
              this.$router.replace({
                  path: '/login'
              })
           }else{
              alert('系统异常')
           }
         })
      },
      sure(){
        this.remove()
      },
      // 删除列表
      remove() {
        let oParams=this.params.row.id
        console.log(oParams)
        bannerDelete(oParams).then((res)=>{
          // this.data6.splice(params.index, 1);
          this.bannerList()
        }).catch((err)=>{

        })
         
      },
    },
    mounted() {
      this.bannerList()
    },
  }
</script>
