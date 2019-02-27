<style>
myid {
  display: none;
}
.spin_table_box {
  position: relative;
  height: 520px;
}
</style>

<template>
  <div>
    <Table border :columns="columns1" :data="entryList"></Table>
    <Page :total="totalCount" show-total @on-change="queryList"></Page>
  </div>
</template>
<script>
import { queryUserApply, handleUserApply } from "../../api/app.js";
import { timeChang } from "../../libs/timeChang.js";
export default {
  data() {
    return {
      totalCount: 0, //总条数
      pageNum: 1, //当前页码
      columns1: [
        {
          title: "用户名",
          key: "username"
        },
        {
          title: "电话号码",
          key: "phone"
        },
        {
          title: "申请时间",
          key: "applyTime"
        },
        {
          title: "处理时间",
          key: "handleTime"
        },
        {
          title: "是否处理",
          key: "status"
        },
        {
          title: "处理",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.handle(params);
                    }
                  }
                },
                "处理"
              )
            ]);
          }
        }
      ],
      entryList: []
    };
  },

  methods: {
    /**
     * 查询列表
     */
    queryList(pageNum) {
      let _data = this.$data;
      _data.pageNum = pageNum;
      queryUserApply(pageNum).then(res => {
        const data = res.data;
        if (data.resultState) {
          let result = data.pojo;
          _data.totalCount = data.pojo.totalCount;
          _data.entryList = result.entryList;
          _data.entryList.forEach(element => {
            element.applyTime = timeChang(element.applyTime);
            element.handleTime = timeChang(element.handleTime);
            if (0 == element.status) {
              element.status = "未处理";
            } else {
              element.status = "已处理";
            }
          });
        } else {
          alert("请求失败。。。");
        }
      });
    },

    //处理
    handle(params) {
      let _this = this;
      let oParams = params.row.id;
      if ("已处理" == params.row.status) {
        this.$Notice.error({
          title: "请不要重复操作",
          desc: "此消息已经处理过"
        });
      } else {
        try {
          handleUserApply(oParams).then(res => {
            if (res.data.resultState) {
              _this.queryList(_this.pageNum);
              this.$Notice.success({
                title: "处理成功",
                desc: "此消息处理成功.",
                render: h => {
                  return h("span", ["此消息处理成功 "]);
                }
              });
            } else {
              this.$Notice.error({
                title: "处理失败",
                desc: "此消息处理失败.",
                render: h => {
                  return h("span", ["此消息处理失败 "]);
                }
              });
            }
          });
        } catch (error) {}
      }
    }
  },
  mounted() {
    let _this = this;
    _this.queryList(_this.pageNum);
  }
};
</script>



