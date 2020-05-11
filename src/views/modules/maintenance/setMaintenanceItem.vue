<!--  -->
<template>
  <el-dialog
    :close-on-click-modal="false"
    :show-close="false"
    :fullscreen="true"
    :modal="false"
    :visible.sync="visible"
  >
    <!-- 维保各项情况表 -->
    <div class=" dialog_headslot" slot="title">
      <span>选择维保内容</span>
      <el-button  @click="handleBack" type="add">完成</el-button>
    </div>
    <el-table 
     :data="dataList"
     ref="multipleTable" 
     border style="width: 100%"
     @selection-change="handleSelectionChange"
     :row-key="getRowKey"
      v-loading="loading">
      <el-table-column type="selection" align="center"  :selectable="rowSelectable" :reserve-selection="true"  width="50" :disabled="true"></el-table-column>
      <el-table-column type="index" align="center" label="序号" width="50"></el-table-column>
      <el-table-column prop="content" align="center" label="维保项目"></el-table-column>
      <el-table-column prop="demand" align="center" label="维保基本要求"></el-table-column>
    </el-table>
   
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
   
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      ids:'',//旧id
      visible: false,
      dialogVisible: false,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
      totalCount: 0,
      formData: {},
      itemFormData: {
        content: "", //维保内容
        demand: "" //要求
      },
      dataList: [],
      selectDataList:[],
      rules: {
        content: [
          {
            required: true,
            message: "维保内容不能为空"
          }
        ],
        demand: [
          {
            required: true,
            message: "保养要求不能为空"
          }
        ]
      }
    };
  },
  components: {},
  created() {},
  methods: {
    init(ids) {
      console.log("init获取数据",ids);
      this.visible = true;
       if (ids) {
        if(ids.indexOf(',')>-1){
          this.ids = ids.split(',')
        }else {
          let arr = []
          arr.push(ids)
          this.ids = arr;
        }
      }
      this.getDataList();
    },
    scrollbackSelect(data) {
      // 回显选择
      console.log("回显选择",data);
      data.forEach(item => {
        if (this.ids.indexOf(item.id) > -1) {
          this.$nextTick(()=>{
           this.$refs.multipleTable.toggleRowSelection(item, true);
          })
        }
      });
    },
    getDataList() {
      this.loading = true;
      this.$http({
        url: this.$http.adornUrl("/maintenancecontent/maintenancecontent/list"),
        method: "get",
        params: this.$http.adornParams({
          limit: this.pageSize,
          page: this.pageIndex
        })
      }).then(({ data }) => {
        if (data && data.code == 0) {
          console.log(data.page);
          this.loading = false;
          this.totalCount = data.page.totalCount;
          this.dataList = data.page.list;
           if(this.ids){
            this.scrollbackSelect(data.page.list);
          }
        }
      });
    },
    rowSelectable(row,index){
      // console.log(row);
      return row.isedit == 1;
    },
    getRowKey(row){
      // console.log(row.id);
      return row.id;
    },
    // handleAddItem() {
    //   console.log("添加项目");
    //   this.dialogVisible = true;
    // },
    // // 删除
    //  handleDeleteItem() {
    //   var ids =  this.selectDataList.map(item => {
    //         return item.id;
    //       });
    //   this.$confirm(`确定删除?`, "提示", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning"
    //   }).then(() => {
    //     this.$http({
    //       url: this.$http.adornUrl("/maintenancecontent/maintenancecontent/delete"),
    //       method: "post",
    //       data: this.$http.adornData(ids, false)
    //     }).then(({ data }) => {
    //       if (data && data.code == 0) {
    //         console.log('删除成功')
    //         this.getDataList();
    //       } else {
    //       }
    //     });
    //   });
    // },
    handleBack() {
      this.visible = false;
      let ids = this.selectDataList.map(item=>item.id);
      this.$emit("back",ids.join(','));
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getDataList();
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val;
      this.getDataList();
    },
    handleSelectionChange(val){
      console.log('选择改变',val);
      this.selectDataList = val;
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(
              "/maintenancecontent/maintenancecontent/save"
            ),
            method: "post",
            data: this.$http.adornData(this.itemFormData)
          }).then(({ data }) => {
            if (data && data.code === 0) {
              this.$message({
                message: "保存成功",
                type: "success",
                duration: 1500,
                onClose: () => {
                  this.dialogVisible = false;
                 this.getDataList();
                }
              });
            } else {
              this.$message.error(data.error);
            }
          });
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.button_wraper {
  margin: 20px 0;
  text-align: center;
}
</style>