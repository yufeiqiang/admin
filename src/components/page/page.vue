<template>
    <div class="page"> 
        <Page :total="total"  @on-change="pageChange"  show-elevator/>
    </div>    
</template>
<script>
export default {
    props:{
        total:{
            type:Number,
            default:100,
        }
    },
    methods:{
        pageChange(e){
            this.$emit('changePage',e)
        },
    }
}
</script>
<style lang="less" scoped>
.page{
        padding: 14px 0;
        text-align: center;
    }
</style>

