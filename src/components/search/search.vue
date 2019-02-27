<template>
    <div class="form" style="margin-left: -20px;">
        <Form :model="formItem" :label-width="100" inline >
            <FormItem label="设备名称">
                <Input v-model.trim="formItem.deviceName"></Input>
            </FormItem>
            <FormItem label="设备序列号">
                <Input v-model.trim="formItem.order"></Input>
            </FormItem>
            <FormItem label="开始时间">
                <DatePicker type="date" confirm :options="options3" placeholder="选择开始时间" style="width: 160px" @on-change='formItem.starDateVal=$event'  v-model="formItem.starDateVal" :editable="false"></DatePicker>
            </FormItem>
            <FormItem label="结束时间">
                <DatePicker type="date" confirm :options="options4"  style="width: 160px" @on-change='formItem.endDateVal=$event' v-model='formItem.endDateVal' 
                 placeholder="选择结束时间" :editable="false"></DatePicker>
            </FormItem>
            <Button type="primary" icon="ios-search" @click="searchBut">搜索</Button>
        </Form>
    </div>    
</template>
<script>
export default {
    data(){
        return {
            options3: {
                disabledDate (date) {
                    return date && date.valueOf() > Date.now() - 86400000;
                }
            },
            options4: {
                disabledDate (date) {
                    return date && date.valueOf() >= Date.now()
                }
            },
            formItem:{
                order:'',
                deviceName:'',
                starDateVal:'',
                // endDateVal: getNowFormatDate(),
                endDateVal:''
            },
        }
    },
    methods:{
        searchBut(){
            let params={
                name:this.formItem.deviceName,
                beginDate:this.formItem.endDateVal,
                endDate:this.formItem.starDateVal,
                devSerial:this.formItem.order
            }
            // console.log(1245)
            this.$emit('serchParams',params)
            
        }
    },
    mounted(){
        // this.searchBut()
    }
}
</script>

