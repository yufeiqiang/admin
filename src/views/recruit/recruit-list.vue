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
  import { recruitList, deleteRecruit} from '../../api/app.js'
  import { timeChang } from '../../libs/timeChang.js'
  export default {
    data() {
      return {
        columns: [{
            title: '招聘职位',
            key:'title',
            align:'center',
          },
          {
            title: '发布时间',
            key: 'createTime',
            align:'center'
          }, {
            title: '操作',
            key: 'action',
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
          name: 'recruit-add',
          query: {
              row:data
          }
        })
      },
      // 默认请求banner列表
      recruitList(){
         recruitList({}).then((res)=>{
            let _this = this;
            const data=res.data
           if(data.code==200){
              _this.data = data.pojo;
              _this.data.forEach(item=>{
                  item.createTime = timeChang(item.createTime);
              })
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
        let id=this.params.row.id
        deleteRecruit(id).then((res)=>{
          this.recruitList()
        }).catch((err)=>{

        })
         
      },
    },
    mounted() {
      this.recruitList()
    },
  }
</script>
