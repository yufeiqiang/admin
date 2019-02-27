
<template>
    <!-- 新闻列表 -->
    <div>
        <Table border :columns="columns1" :data="data"></Table>
        <Modal
            v-model="modalDele"
            @on-ok="sure"
            draggable 
            scrollable>
            <p style="text-align:center; font-size:18px">你确定要删除此条记录吗</p>
        </Modal>
        <div style="text-align:center;padding-top:16px;">
             <Page :total="total" @on-change="changePage"/>
        </div>
    </div>
</template>
<script>
import { newList, newDelete, newPage} from '../../api/app.js'
import { timeChang } from '../../libs/timeChang.js'
export default {
    data () {
        return {
            columns1: [
                {
                    title: '新闻ID',
                    key: 'id',
                    align:'center'
                },
                {
                    title: '标题',
                    key: 'newsTitle',
                    align:'center'
                },
                {
                    title: '封面图',
                    key: 'image',
                    align:'center',
                    render:(h,params) =>{
                        return h('div',[
                            h('img',{
                            attrs:{
                                src:params.row.image
                            },
                            style:{
                                width:'80px',
                                height:'60px',
                                padding:'10px 0 4px'
                            }
                            })
                        ])
                    }
                },
                {
                    title:'创建时间',
                    key:'createTime',
                    align:'center'
                },
                {
                    title: 'Action',
                    key: 'action',
                    align:'center',
                    width: 150,
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
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.modalDele=true
                                        this.params=params
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data: [],
            modalDele:false,
            params:'',
            total:null,
            pageNum:1,
        }
    },
    methods: {
        // 请求新闻列表
        newList(pageNum){
            newList({pageNum}).then((res)=>{
            const data=res.data
            if(data.code==200){
                let oData=data.pojo
                this.strucData(oData)
                // console.log(oData)
                this.total=oData.totalCount
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
        strucData(val){
            let data=val.entryList
            let arr=[]
            // console.log(data)
            data.forEach(el => {
                let obj={}
                obj.id=el.id
                obj.newsTitle=el.newsTitle
                obj.image=el.image
                obj.createTime=timeChang(el.createTime)
                obj.newsInfor = el.newsInfor 
                arr.push(obj)
            });
            this.data=arr
        },
        //点击修改
        revise(params){
            let data=params.row
            // console.log(data)
            this.$router.push({
                name:'journalism-add',
                query:{
                    row:data
                }
            })
        },
        // 点击删除
        remove(){
            // console.log(params.row.id)
            let id =this.params.row.id
            newDelete({id}).then((res)=>{
                const data=res.data
                console.log(res)
                if(data.code==200){
                    this.newList()
                    console.log('删除成功')
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
        //点击分页
        changePage(e){
            this.newList(e)
        },
        newPage(){

        },
        sure(params){
            this.remove()
        },
        newDelete(par){
            
        }

    },
    mounted () {
        this.newList(this.pageNum)
    }
}
</script>


