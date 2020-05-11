<!--  -->
<template>
  <div
  >
    <!-- 维保各项情况表 -->
     <!-- <div class="header" style="margin-bottom:20px" slot="title">
      <span>自主维护项目编制</span>
    </div> -->
    <el-table 
     :data="tableData"
     ref="multipleTable" 
     border style="width: 100%"
     @selection-change="handleSelectionChange"
     :row-key="getRowKey"
      v-loading="loading">
     >
      <el-table-column type="selection" fixed :reserve-selection="true" align="center" width="50"></el-table-column>
       <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
       <el-table-column prop="deviceName" label="设备名称" align="center"></el-table-column>
      <el-table-column prop="deviceArea" label="定点" align="center"></el-table-column>
      <el-table-column prop="deviceStandard" label="定标" align="center"></el-table-column>
      <el-table-column prop="deviceStatus" label="状态" width="50" align="center"></el-table-column>
      <el-table-column prop="deviceMethod" label="定法" align="center"></el-table-column>
      <el-table-column prop="technologyStandard" width="200" label="技术指导标准" align="center"></el-table-column>
      <el-table-column prop="acceptanceStandard" width="200" label="验收指导标准" align="center"></el-table-column>
      <el-table-column prop="cycle" label="周期"  width="50" align="center"></el-table-column>
      <el-table-column prop="squad" label="班别"  width="50" align="center"></el-table-column>
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
      :fullscreen="true"
      :visible.sync="dialogVisible"
    >
     <div  slot="title" class="dialog_headslot">
      <span>增加自主维保内容</span>
      <el-button @click="dialogVisible=false" style="margin-left:20px">返回</el-button>
    </div> 
      <el-form
        ref="form"
        :model="itemFormData"
        :full-screen="true"
        class="dialog_head_form"
        style="margin-left:10px"
        label-width="110px"
        :rules="rules"
      >
      <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="设备名称" prop="deviceName">
              <el-input v-model.trim="itemFormData.deviceName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="定点" prop="deviceArea">
              <el-input v-model.trim="itemFormData.deviceArea"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="定标" prop="deviceStandard">
              <el-input v-model.trim="itemFormData.deviceStandard"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="状态" prop="deviceStatus">
              <el-input v-model.trim="itemFormData.deviceStatus"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="定法" prop="deviceMethod">
              <el-input v-model.trim="itemFormData.deviceMethod"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="周期" prop="cycle">
              <el-input v-model.trim="itemFormData.cycle"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="技术指导标准" prop="technologyStandard">
              <el-input v-model.trim="itemFormData.technologyStandard"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="验收指导标准" prop="acceptanceStandard">
              <el-input v-model.trim="itemFormData.acceptanceStandard"></el-input>
            </el-form-item>
          </el-col>
           <el-col :span="8">
            <el-form-item label="班别" prop="squad">
              <el-input v-model.trim="itemFormData.squad"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="dialog_footer">
        <el-button type="primary" @click="dataFormSubmit" style="margin-right:20px">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
      totalCount: 0,
      formData: {
        list:[]
      },
      itemFormData: {
       deviceName:'',//设备名称
       deviceArea:'',//定点
       deviceStandard:'',//定标
       deviceStatus:'',//状态
       deviceMethod:'',//定法
       cycle:'',//周期
       technologyStandard:'',//技术指导标准
       acceptanceStandard:'',//验收指导标准
       squad:''//班别
      },
      tableData: [],
      selectDataList:[],
      rules: {
      deviceName: [
          {
            required: true,
            message: "设备名称不能为空"
          }
      ],//设备名称

       deviceArea:[
          {
            required: true,
            message: "定点不能为空"
          }
      ],//定点

       deviceStandard:[
          {
            required: true,
            message: "定标不能为空"
          }
      ],//定标

       deviceStatus:[
          {
            required: true,
            message: "状态不能为空"
          }
      ],//状态

       deviceMethod:[
          {
            required: true,
            message: "定法不能为空"
          }

      ],//定法
       cycle:[
          {
            required: true,
            message: "周期不能为空"
          }
      ],//周期
       technologyStandard:[
          {
            required: true,
            message: "技术指导标准不能为空"
          }
      ],//技术指导标准
       acceptanceStandard:[
          {
            required: true,
            message: "验收指导标准不能为空"
          }
      ],//验收指导标准
       squad:[
          {
            required: true,
            message: "班别不能为空"
          }
      ]//班别
      }
    };
  },
  components: {},
  activated() {
		 this.getDataList();
	},
  methods: {
    init(ids) {
      console.log("init获取数据",ids);
      this.visible = true;
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
          console.log('内容',data);
          this.loading = false;
          this.tableData = data.page.list;
          this.totalCount = data.page.totalCount;
        }
      });
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
            this.$message({
              type:'success',
              message:'删除成功',
              duration:1500
            })
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
      let content = this.selectDataList.map(item=>{
        let obj = {};
        obj[item.id] = ''
        return obj
      });
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
      console.log(val);
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
              "/selfmaintenancecontent/selfmaintenancecontent/save"
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