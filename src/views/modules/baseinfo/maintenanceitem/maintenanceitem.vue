<!--  -->
<template>
  <div
  >
    <!-- 维保各项情况表 -->
    <!-- <div class="header" style="margin-bottom:20px" slot="title">
      <span>维保检查项目编制</span>
    </div> -->
    <el-table 
     :data="dataList"
     ref="multipleTable" 
     border style="width: 100%"
     @selection-change="handleSelectionChange"
     :row-key="getRowKey"
      v-loading="loading">
      <el-table-column type="selection"    width="50" align="center" :disabled="true"></el-table-column>
      <el-table-column type="index" label="序号" align="center" width="180"></el-table-column>
      <el-table-column prop="content" label="维护保养项目" align="center"></el-table-column>
      <el-table-column prop="demand" label="维护保养基本要求" align="center"></el-table-column>
      <!-- <el-table-column prop="wbqk" label="维保情况">
        <template slot-scope="scope">
          <el-radio-group v-model.trim="formData[scope.row]">
            <el-radio :label="1">确认正常</el-radio>
            <el-radio :label="0">调整、更换</el-radio>
            <el-radio :label="-1">需维修</el-radio>
          </el-radio-group>
        </template>
      </el-table-column> -->
    </el-table>
    <div class="button_wraper">
      <el-button @click="handleAddItem" style="margin-right:20px" type="add">添加项目</el-button>
      <el-button :disabled="!selectDataList.length" @click="handleDeleteItem" style="margin-left:20px" type="danger">删除项目</el-button>
    </div>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <el-dialog
      :close-on-click-modal="false"
      :show-close="false"
      :modal="false"
      width="90%"
      :visible.sync="dialogVisible"
    >
      <div slot="title">增加维保内容</div>
      <el-form
        ref="form"
        :model="itemFormData"
        class="form"
        style="margin-left:10px"
        label-width="auto"
        :rules="rules"
      >
        <el-row :gutter="50">
          <el-col :span="9">
            <el-form-item label="维保内容" prop="content">
              <el-input v-model.trim="itemFormData.content"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="维保基本要求" prop="demand">
              <el-input v-model.trim="itemFormData.demand"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="是否可编辑" prop="isedit">
               <el-select v-model.trim="itemFormData.isedit" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog_footer">
        <el-button type="primary" @click="dataFormSubmit" style="margin-right:20px">确认</el-button>
        <el-button @click="dialogVisible =false" style="margin-left:20px">取消</el-button>
      </div>
    </el-dialog>
  </div>
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
        demand: "", //要求
        isedit:''
      },
      dataList: [],
      selectDataList:[],
       options: [
        {
          value: "0",
          label: "否"
        },
        {
          value: "1",
          label: "是"
      }],
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
            message: "维保基本要求不能为空"
          }
        ],
        isedit:[{
          required:true,
          message:'请选择是否可编辑'
        }]
      }
    };
  },
  components: {},
  activated() {
    this.getDataList();
  },
  methods: {
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
    handleAddItem() {
      console.log("添加项目");
      this.dialogVisible = true;
      this.$nextTick(()=>{
        this.$refs['form'].resetFields();
      })
    },
    // 删除
     handleDeleteItem() {
      var ids =  this.selectDataList.map(item => {
            return item.id;
          });
      this.$confirm(`确定删除?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl("/maintenancecontent/maintenancecontent/delete"),
          method: "post",
          data: this.$http.adornData(ids, false)
        }).then(({ data }) => {
          if (data && data.code == 0) {
            console.log('删除成功')
            this.$message({
              type:'success',
              message:'删除成功',
              duration:1500
            })
            this.getDataList();
          } else {
          }
        });
      });
    },
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