<!--  -->
<template>
  <div v-loading="loading">
    <div class="header">维保计划</div>
    <!-- 维保记录表 -->
    <el-table ref="singleTable" :data="wbjlTableData" :row-class-name="tableRowClassName" highlight-current-row @row-click="handlerowClick">
      <el-table-column type="index"  width="50"></el-table-column>
      <el-table-column prop="planTime" :formatter="formatDate" label="计划时间" width="200"></el-table-column>
      <el-table-column prop="unitName" label="维保单位"></el-table-column>
      <el-table-column prop="planName" label="处置情况" width="180"></el-table-column>
      <el-table-column prop="maintenanceStatus" label="状态" width="150"></el-table-column>
      <el-table-column prop="propertyCheckTime" :formatter="formatDate" width="200" label="完成时间"></el-table-column>
    </el-table>
    <div class="form_wraper" >
      <div class="header">曳引与强制驱动电梯维护保养记录</div>
      <el-form ref="form" :model="formData" :rules="rules" class="form">
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="使用单位内编号"  prop="planCode">
              <el-input v-model.trim="formData.planCode" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="维保单位名称" prop="maintenanceName">
              <el-input v-model.trim="formData.maintenanceName" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item label="维保人名称" prop="processUser">
              <el-input v-model.trim="formData.processUser" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="维保时间" prop="planTime"  clearable>
              <el-date-picker
                v-model.trim="formData.planTime"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择维保时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="维保电梯" prop="regCode">
              <el-input v-model.trim="formData.regCode" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="24">
            <el-form-item label="备注" prop="remarks">
              <el-input type="textarea" v-model.trim="formData.remarks" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30" v-if="unitType==2">
          <el-col :span="12">
            <el-form-item label="物业单位" prop="propertyId">
              <el-input v-model.trim="formData.propertyId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认时间" prop="propertyCheckTime" clearable>
              <el-date-picker
                v-model.trim="formData.propertyCheckTime"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetime"
                placeholder="选择确认时间"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30" v-if="unitType==4">
          <el-col :span="12">
            <el-form-item label="仓库单位" prop="depoId">
              <el-input v-model.trim="formData.depotId" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="确认时间" prop="depotCheckTime">
              <el-date-picker
                v-model.trim="formData.depotCheckTime"
                type="datetime"
                placeholder="选择确认时间"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                clearable
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <!-- 维保各项情况表 -->
    <el-table :data="wbgxqkData" border style="width: 100%">
      <el-table-column type="index" width="180"></el-table-column>
      <el-table-column prop="content" label="维保项目"></el-table-column>
      <el-table-column prop="demand" label="维保基本要求"></el-table-column>
      <el-table-column prop="wbqk" label="维保情况">
        <template slot-scope="scope">
          <el-radio-group
            @change="handleRadioChange(scope.row,scope.$index)"
            v-model.trim="formData.list[scope.$index].maintenancestatus"
          >
            <el-radio label="1">确认正常</el-radio>
            <el-radio label="2">调整、更换</el-radio>
            <el-radio label="3">需维修</el-radio>
          </el-radio-group>
          <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <div class="button_wraper" v-if="wbjlTableData&&wbjlTableData.length">
      <el-button type="save" v-if="isAuth('maintenance:maintenanceplan:bc')" @click="handleSave('form')" style="margin-right:20px">保存</el-button>
      <el-button type="warning" v-if="unitType==2&&isAuth('maintenance:maintenanceplan:dcbyjl')" @click="handleExport()" style="margin-left:20px">导出保养记录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading:false,
      currentIndex:1,
      wbjlTableData: [],
      wbgxqkData: [],
      formData: {
        authId: "",
        comeFrom: "",
        depotCheckTime: "", //仓库单位确认时间
        depotId: "", //仓库单位名称
        isdel: 0,
        list: [],
        maintenanceName: "", //维保单位名称
        maintenanceId: "", //维保单位名称
        maintenanceStatus: "", //维保情况
        planCode: "", //计划编号
        planName: "", //
        planTime: "", //维护时间
        planId:"1",
        processUser: "", //维护保养人
        propertyCheckTime: "", //物业单位确认时间
        propertyId: "", //物业单位名称
        regCode: "", //电梯编号
        remarks: "" //备注
      },
      rules: {},
      radioArr: [],
      accoutType: 1,
      loading: null //加载中
    };
  },
  components: {},
  activated() {
    this.initData();
  },
  computed:{
    unitType(){
      return this.$store.getters['user/userInfo'].unitType;
    }
  },
  watch: {
    wbjlTableData(newval) {
      newval.forEach((item, index) => {
        let name;
        switch (index) {
          case 0:
            name = "上次维保";
            break;
          case 1:
            name = "本次维保";
            break;
          case 2:
            name = "下次维保";
            break;
        }
        item.name = name;
        this.wbjlTableData[index] = item;
      });
    }
  },
  methods: {
    initData() {
      // 维保内容列表数据
     this.loading = true;
     
      this.getlastthreeData().then(({ data }) => {
        if (data && data.code == 0) {
          console.log('前三条数据',data.page);
          let page = data.page;
          this.wbjlTableData = page;
          if(page&&page.length){
            if(page.length>=1){
              this.currentIndex = 1;
              this.planId = page[1].planId;
              this.getwbjlData();
              this.$nextTick(()=>{
                this.$refs.singleTable.setCurrentRow(page[1])
              })
            }else {
              this.currentIndex = 0;
              this.planId = page[0].planId;
              this.formData.maintenanceStatus = page[0].maintenanceStatus;
              this.formData.planName = page[0].planName;
              this.formData.regCode = page[0].regCode;
              this.$nextTick(()=>{
                this.$refs.singleTable.setCurrentRow(page[0])
              })
              this.getwbjlData();
            }
          }else {
            this.loading = false;
          }
         
        }
      });
    },
    getlastthreeData() {
      return this.$http({
        url: this.$http.adornUrl("/maintenanceplan/maintenanceplan/threelist1")
      });
    },
    // 维保记录
    getwbjlData() {
      console.log("维保记录");
      this.$http({
        url: this.$http.adornUrl(
          `/maintenanceplan/maintenanceplan/infos/${this.planId}`
        ),
        method: "get"
      })
        .then(({ data }) => {
          if (data && data.code == 0) {
            console.log(data);
            this.formData = data.maintenancePlan;
            this.wbgxqkData = data.maintenancePlan.list;
            this.formData.maintenanceStatus = this.wbjlTableData[this.currentIndex].maintenanceStatus;
            this.formData.maintenanceName = this.wbjlTableData[this.currentIndex].unitName;
             this.formData.maintenanceId = this.wbjlTableData[this.currentIndex].unitId;
            this.loading = false;
          }
        })
        .catch(e => {
          this.$message.error(e);
        });
    },
    tableRowClassName({row, rowIndex }) {
      row.index = rowIndex;
      // return "";
    },
    // 格式化时间
    formatDate(row, column, cellValue) {
      if (cellValue && cellValue.length) return cellValue.substr(0, 10);
    },
    handleRadioChange(row, index) {
      console.log(row);
      console.log("formData", this.formData);
    },
    // 点击改变当前行
    handlerowClick(row){
      console.log(row);
      this.planId = row.planId;
      this.currentIndex = row.index;
      this.loading = true;
      this.getwbjlData();
    },
    handleSave(formName) {
      console.log("formsubmit", this.formData);
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl("/maintenanceplan/maintenanceplan/update"),
            method: "post",
            data: this.formData
          })
            .then(res => {
              console.log("formsubmitssucsss", res);
              if (res.data.code == 0) {
                console.log();
                this.$message({
                  type:'success',
                  message: "保存成功",
                  duration:1500,
                  onClose:()=>{
                    this.getlastthreeData();
                    this.getwbjlData(this.planId);
                  }

                });
              }
            })
            .catch(e => {
              console.log(e);
            });
        }
      });
    },
    // 导出
    handleExport(){
      console.log('导出');
      let token = this.$cookie.get('token');

      let url = this.$http.adornUrl(`/maintenanceplan/maintenanceplan/imports/${this.planId}`)
      // window.open(url+'?token='+token);
      
       let URL = window.URL || window.webkitURL
                let downloadA = document.createElement('a')
                downloadA.href = this.$http.adornUrl(`/maintenanceplan/maintenanceplan/imports/${this.planId}?token=${this.$cookie.get('token')}`)
                downloadA.download = '仪器设备导入结果'
                downloadA.click()
                URL.revokeObjectURL(downloadA.href)      
    }
  }
};
</script>
<style scoped>
</style>