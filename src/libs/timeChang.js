// 时间戳转变成普通的时间
export const timeChang=(obj)=>{
        if(obj==null){
            return null
        }
        let date = new Date(obj);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

// 获取当前时间
export const getNowFormatDate=()=>{
    let date = new Date();
    let seperator1 = "-";
    let seperator2 = ":";
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
        " " + date.getHours() + seperator2 + date.getMinutes() +
        seperator2 + date.getSeconds();
    return currentdate;
}

// 点击详情共有方法
export const revise = (index,routePath) => {
    let data=index.row
    this.$router.push({
      name: routePath,
      query: {
          row:data
      }
    })
  }