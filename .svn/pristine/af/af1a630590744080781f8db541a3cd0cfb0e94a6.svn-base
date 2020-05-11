<!--  -->
<template>
  <el-dialog
    :close-on-click-modal="false"
    :show-close="false"
    :lock-scroll="true"
    :fullscreen="true"
    :modal="false"
    :visible.sync="visible"
  >
    <!-- 维保各项情况表 -->
    <div class="dialog_headslot" slot="title">
      <span>自主维护内容编制</span>
      <el-button  @click="handleBack" type="add">完成</el-button>
    </div>
    <el-table 
     :data="tableData"
     ref="multipleTable" 
     border style="width: 100%"
     @selection-change="handleSelectionChange"
      v-loading="loading">
      <el-table-column type="selection" fixed   width="50"></el-table-column>
       <el-table-column prop="deviceName" label="设备名称"></el-table-column>
      <el-table-column prop="deviceArea" label="定点"></el-table-column>
      <el-table-column prop="deviceStandard" label="定标"></el-table-column>
      <el-table-column prop="deviceStatus" label="状态" width="50"></el-table-column>
      <el-table-column prop="deviceMethod" label="定法"></el-table-column>
      <el-table-column prop="technologyStandard" width="200" label="技术指导标准"></el-table-column>
      <el-table-column prop="acceptanceStandard" width="200" label="验收指导标准"></el-table-column>
      <el-table-column prop="cycle" label="周期"  width="50"></el-table-column>
      <el-table-column prop="squad" label="班别"  width="50"></el-table-column>
      <!-- <el-table-column prop="wbqk" fixed="right" label="操作"  width="430" align="center">
        <template slot-scope="scope">
          <el-radio-group
            @change="handleRadioChange(scope.row,scope.$index)"
          >
            <el-radio label="1">正常</el-radio>
            <el-radio label="2">已填写维修工单</el-radio>
            <el-radio label="3">自主修复</el-radio>
            <el-radio label="4">停产</el-radio>
          </el-radio-group>
        </template>
      </el-table-column> -->
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
      ids:'',//项目id
      visible: false,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
      totalCount: 0,
      formData: {
        list:[]
      },
      itemFormData: {
        content: "", //维保内容
        demand: "" //要求
      },
      tableData: [],
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
      this.ids = ids;
      this.getDataList();
    },
    getDataList() {
      this.loading = true;
      this.$http({
        url: this.$http.adornUrl("/selfmaintenancecontent/selfmaintenancecontent/list"),
        method: "get",
        params: this.$http.adornParams({
          limit: this.pageSize,
          page: this.pageIndex
        })
      }).then(({ data }) => {
        if (data && data.code == 0) {
          console.log('内容',data.page);
          this.loading = false;
          this.totalCount = data.page.totalCount;
          this.tableData = data.page.list;
          this.selectBack();
        }
      });
    },
    selectBack(){
      console.log('selectback')
      this.$nextTick(()=>{
        if(this.ids&&this.ids.length){
          this.tableData.forEach(item=>{
            if(this.ids.indexOf(item.id)>-1){
              console.log('138----')
              this.$refs['multipleTable'].toggleRowSelection(item,true);
            }
          })
      }
      })
     
    },
    getRowKey(row){
       return row.id;
    },
    // 删除
     handleDeleteItem() {
      var ids =  this.selectDataList.map(item => {
            return item.id;
          });
          console.log('delete',ids);
      this.$confirm(`确定删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl("/selfmaintenancecontent/selfmaintenancecontent/delete"),
          method: "post",
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code == 0) {
            console.log('删除成功')
            this.getDataList();
          } else {
          }
        }).catch(e=>{
          console.log(e);
        })
      });
    },
    handleBack() {
      this.visible = false;
      let content = this.selectDataList.map(item=> item.id);
      this.$emit("back",content);
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