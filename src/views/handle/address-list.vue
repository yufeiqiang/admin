
<template>
    <!-- 楼宇列表 -->
    <div>
        <Table border :columns="columns1" :data="data"></Table>
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
import { floorList, floorDelet} from '../../api/app.js'
import { timeChang } from '../../libs/timeChang.js'
export default {
    data () {
        return {
            columns1: [
                {
                    title: '楼宇ID',
                    key: 'id',
                    align:'center'
                },
                {
                    title: '楼宇名称',
                    key: 'areolaName',
                    align:'center'
                },
                {
                    title: "地区",
                    key: "str"
                },
                {
                    title: '楼宇广告',
                    key: 'buildImage',
                    align:'center',
                    render:(h,params) =>{
                        return h('div',[
                            h('img',{
                            attrs:{
                                src:params.row.buildImage
                            },
                            style:{
                                width:'70px',
                                height:'64px',
                                padding:'10px 0 4px'
                            }
                            })
                        ])
                    }
                },
                {
                    title: '类型',
                    key: 'userTypeZh',
                    align:'center'
                },
                {
                    title:'创建时间',
                    key:'createTime',
                    align:'center'
                },
                {
                    title: '操作',
                    key: 'createTime',
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
            params:''
        }
    },
    methods: {
        // 请求产品列表
        floorList(){
            floorList().then((res)=>{
                const data=res.data
                var str='';
                data.pojo.entryList.forEach(el=>{
                    str=el.province+'/'+el.city+'/'+el.area
                    el.str=str
                })
                if(data.code==200){
                    let oData=data.pojo.entryList
                    this.data=oData
                    this.changeTime()
                    this.floorType()
                }else if(data.code==530){
                    alert('未登录，请登录')
                    let redirect = decodeURIComponent(this.$route.query.redirect || '/login');
                    this.$router.replace({
                        path: '/login'
                    })
                }else{
                    alert('系统异常')
                }
            }).catch((res)=>{

            })
        },
        // 转换时间戳
        changeTime(){
            let data=this.data
            data.forEach(el=>{
                el.createTime = timeChang(el.createTime)
            })
        },
        //楼宇类型转换
        floorType(){
            let data=this.data
            data.forEach(el=>{
                if(el.userType=='personal'){
                    el.userTypeZh = '家庭客户'
                }else if(el.userType=='business'){
                    el.userTypeZh = '商业客户'
                }
            })
        },

        //点击修改
        revise(params){
            let data=params.row
            // console.log(data)
            this.$router.push({
                name:'address-add',
                query:{
                    row:data
                }
            })
        },
        // 点击删除
        remove(){
            // console.log(params.row.id)
            let id =this.params.row.id
            floorDelet(id).then((res)=>{
                const data=res.data
                console.log(res)
                if(data.code==200){
                    this.floorList()
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
        sure(params){
            this.remove()
        },
        floorDelet(par){
            
        }

    },
    mounted () {
        // console.log(this.floorList({}))
        this.floorList()
    }
}
</script>