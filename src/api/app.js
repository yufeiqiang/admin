import http from '../libs/axios'
import Qs from 'qs'

// 存图
export const keepPictures = ({}) => {
    const data = {

    }
    return http.request({
    })
}

//两小时快速问答列表
export const queryUserApply = (pageNum) =>{
    const data = {
        pageNum:pageNum
    }
    return http.request({
        url:'firstPage/queryUserApply.do',
        method:'get',
        params:data
    })
}

//处理两小时快速问答
export const handleUserApply = (id) => {
    const data = {
        id:id
    }
    return http.request({
        url:'firstPage/handleUserApply.do',
        method:'post',
        params:data
    })
}

//即时办理列表
export const queryImmediatelyList = (pageNum) =>{
    const data = {
        pageNum:pageNum
    }
    return http.request({
        url:'immediatelyHandle/queryUserApply.do',
        method:'get',
        params:data
    })
}

//查看用户留言
export const queryApplyInfo = (id) => {
    const data = {
        id:id
    }
    return http.request({
        url:'immediatelyHandle/queryApplyInfo.do',
        method:'post',
        params:data
    })
}

//处理即时办理
export const immediatelyHandle = (id) => {
    const data = {
        id:id
    }
    return http.request({
        url:'immediatelyHandle/handleApply.do',
        method:'post',
        params:data
    })
}

// banner列表
export const bannerList = ({}) =>{
    const data = {}
    return http.request({
        url:'firstPage/imageList.do',
        method:'get',
        params:data
    })
}

// 上传banner
export const bannerAdd = ({imagepath,imageIndex,imageName,id}) =>{
    const data = {
        imagepath:imagepath,
        imageIndex:imageIndex,
        imageName:imageName,
        id:id
    }
    return http.request({
        url:'firstPage/addImage.do',
        method:'post',
        data:Qs.stringify(data),
    })
}

// 删除轮播广告
export const bannerDelete = (id) => {
    // console.log(id)
    const data = {
        id:id
    }
    return http.request({
        url:' firstPage/deleteImage.do',
        method:'post',
        params:data
    })
}
// 新闻列表
export const newList = ({pageNum}) =>{
    const data ={pageNum}
    return http.request({
        url:'news/newsList.do',
        method:'get',
        params:data
    })
}

// 新闻添加
export const newAdd = ({image,newsTitle,newsInfor,id}) => {
    const data = {
        image,
        newsTitle,
        newsInfor,
        id
    }
    return http.request({
        url:'news/addNews.do',
        method:'post',
        data:Qs.stringify(data)
    })

}


// 删除某条新闻
export const newDelete = ({id}) => {
    const data = {
        id
    }
    return http.request({
        url:'news/deleteNews.do',
        method:'get',
        params:data
    })
}
//产品分类下拉接口
export const goodsTypes = ({}) => {
    const data = {
        
    }
    return http.request({
        url:'productCenter/types.do',
        method:'post',
        data:data
    })
}
// 产品添加
export const goodsAdd = ({productTitle,productImage,productType,productInfo,id}) => {
    const data = {
        productTitle,
        productImage,
        productType,
        productInfo,
        id
    }
    return http.request({
        url:'productCenter/addProduct.do',
        method:'post',
        data:Qs.stringify(data)
    })
}
// 产品列表
export const goodsList= () => {
    const data = {

    }
    return http.request({
        url:'productCenter/queryProductList.do',
        method:'post',
        data:data
    })
}

// 删除某条产品
export const goodsDelete = ({id}) => {
    const data = {
        id
    }
    return http.request({
        url:'productCenter/deleteProduct.do',
        method:'post',
        data:Qs.stringify(data)
    })
}

// 添加楼栋
export const floorAdd = ({areolaName,userType,buildImage,id,province,city,area}) =>{
    const data ={areolaName,userType,buildImage,id,province,city,area}
    return http.request({
        url:'immediatelyHandle/addBuilding.do',
        method:'post',
        data:Qs.stringify(data)
    })
}
//楼宇列表
export const floorList = () => {
    const data ={

    }
    return http.request({
        url:'immediatelyHandle/selectBuildingList.do',
        method:'post',
        data:Qs.stringify(data)
    })
}

// 获取地区

export const queryAllArea = () =>{
    const data={}
    return http.request({
        url:'immediatelyHandle/queryAllArea.do',
        method:'post',
        data:Qs.stringify(data)
    })
}

// 删除某个楼宇
export const floorDelet = (id) =>{
    const data = {
        id
    }
    return http.request({
        url:'immediatelyHandle/deleteBuilding.do',
        method:'post',
        data:Qs.stringify(data)
    })
}


//发布招聘
export const recruit = ({id,recruitInfo,title}) => {
    const data = {id,recruitInfo,title}
    console.log(data)
    return http.request({
        url:'recruit/addRecruitInfo.do',
        method:'post',
        data:Qs.stringify(data)
    })
}

// 请求发布列表
export const recruitList = ({}) => {
    const data = {}
    return http.request({
        url:'recruit/getRecruitInfoList.do',
        method:'post',
        data:Qs.stringify(data)
    })
}

export const deleteRecruit = (id) =>{
    const data = {
        id
    }
    return http.request({
        url:'recruit/deleteRecruit.do',
        method:'post',
        data:Qs.stringify(data)
    })
}










