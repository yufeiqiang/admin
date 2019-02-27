<style>
    .spin_table_box{
        position: relative;
        height: 520px;
    }
    .spin_box{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }
    .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-col{
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>
<template>
    <div class="spin_box" v-if="isspin" :isspin='isspin'>
        <Spin fix>
            <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin>
    </div>
</template>
<script>
    export default {
        props:{
            isspin:{
                type:Boolean,
                default:true
            }
        }
    }
</script>