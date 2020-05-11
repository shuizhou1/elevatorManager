<!--  -->
<template>
<div>
  <el-dialog
    :close-on-click-modal="false"
    :show-close="false"
    :fullscreen="true"
    :modal="false"
    :visible.sync="visible"
    v-loading="loading"
  >
    <!-- 维保记录表 -->
    <div slot="title" class="dialog_headslot">
      <div>新增自主维护</div>
      <el-button  @click="visible=false" style="margin-right:20px">返回</el-button>
    </div>
    <div class="repair_header">
      <div class>电梯设备</div>
      <el-button @click="showElevatorList" style="height:36px" v-if="!this.formData.id">选择</el-button>
    </div>
    <div class="form-view-wraper">
      <el-row>
        <el-col :span="8">
          <div class="form-view-item">
            注册代码：
            <span>{{formData.regCodes}}</span>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="form-view-item">
            维保单位：
            <span>{{formData.maintenanceName}}</span>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="form-view-item">
            电梯类型：
            <span>{{type}}</span>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="form-view-item">
            电梯地址：
            <span>{{formData.local}}</span>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="form_wraper">
      <div class="repair_header">
        <div class>检查项目</div>
        <el-button @click="showsetContent" style="height:36px" v-if="!this.formData.id">内容编制</el-button>
      </div>
     
    </div>
    <!-- 维保各项情况表 -->
    <el-table :data="contentData" border style="width: 100%">
      <el-table-column label="序号" align="center" type="index" width="50"></el-table-column>
      <el-table-column prop="deviceName" align="center" label="设备名称"></el-table-column>
      <el-table-column prop="deviceArea" align="center" label="定点"></el-table-column>
      <el-table-column prop="deviceStandard" align="center" label="定标"></el-table-column>
      <el-table-column prop="deviceStatus" align="center" label="状态" width="50"></el-table-column>
      <el-table-column prop="deviceMethod" align="center" label="定法"></el-table-column>
      <el-table-column prop="technologyStandard" align="center" label="技术指导标准"></el-table-column>
      <el-table-column prop="acceptanceStandard" align="center" label="验收指导标准"></el-table-column>
      <el-table-column prop="cycle" label="周期" align="center"  width="50"></el-table-column>
      <el-table-column prop="squad" label="班别"  align="center" width="50"></el-table-column>
    
    </el-table>
    <div class="button_wraper">
      <!-- <el-form>
        <el-form-item label="审核不通过原因">
          <el-input></el-input>
        </el-form-item>
      </el-form> -->
      <el-button type="primary" @click="handleSave" style="margin-right:20px">保存</el-button>
      <!-- <el-button type="primary" @click="handleApply" style="margin-right:20px">维修工单申请</el-button> -->
      <!-- <el-button type="back" @click="updateStatus" style="margin-right:20px">审核通过</el-button> -->
      <!-- <el-button type="danger" @click="updateStatus" style="margin-right:20px">审核不通过</el-button> -->
      <!-- <el-button type="primary" v-if="formData.propertyId" @click="handleExport()" style="margin-left:20px">导出保养记录</el-button> -->
    </div>
  </el-dialog>
  <set-item v-if="setitemDialogVisible" ref="setItem" @back="setItemConfirm"></set-item>
   <elevator-selector
      v-if="elevatorDalogvisible"
      ref="elevatorSelector"
      @confirm="elevatorselectConfirm"
    ></elevator-selector>
  </div>
</template>

<script>
import setItem from "./selfmaintenance-setitem";
import elevatorSelector from "@/components/select-single-elevator.vue";
export default {
   components: {
    setItem,
    elevatorSelector
  },
  data() {
    return {
      reserve:true,//是否回显上次内容
      loading:false,
      setitemDialogVisible: false,
      elevatorDalogvisible: false,
      visible:false,
      currentIndex:1,
      tableData: [],//所有内容
      contentData:[],//内容
      contentIdWithStatus:[],//内容选择结果
      tableLoading:[],
      formData: {
        processUserId: "", //自主维护人员
        processUserName: "", //自主维护人员
        planUserId: "", //自主维护编制人员
        planUserName: "", //自主维护编制人员
        checkUserId: "", //编制确认人
        regCodes: "", //电梯注册码
        maintenanceName:'',
        local:'',
        remarks: "" ,//备注
        elevatorStatus:'',
        contentIds:''//内容id
      },
      type:'',
      rules: {
      }
    };
  },
  computed:{
    unitType(){
      return this.$store.getters['user/userInfo'].unitType;
    }
  },
  watch: {
    "formData.elevatorStatus"(val) {
      console.log("watch200");
      if (val == 1) {
        this.type = "客梯";
      } else if(val == 2){
        this.type = "货梯";
      }else {
        this.type = ''
      }
    },
    contentIdWithStatus(val){
      console.log('contentIdWithStatus',val);
      if(val&&val.length){
        let arr = [];
        this.tableData.forEach(item=>{
          if(val.indexOf(item.id)>-1){
            console.log('true');
            arr.push(item);
          }
        })
        console.log('内容改变',arr);
        this.contentData = arr;
      }
    }
  },
  methods: {
    // 维保记录
    init(id) {
      // 维保内容列表数据
      console.log('id',id)
      if(id){
        this.formData.id = id;
        this.getDataList()
      }else {
        this.getTableData();
      }
      this.type = '';
      this.formData.elevatorStatus = '';
      this.formData.regCodes = ''
      this.formData.local = ''
      this.formData.maintenanceName = ''
      this.contentData = [];
      this.tableData = [];
      this.visible = true;
    },
    getDataList() {
      console.log("维保记录");
      this.loading = true;
      this.$http({
        url: this.$http.adornUrl(
          `/selfmaintenanceplan/selfmaintenanceplan/info/${this.formData.id}`
        ),
        method: "get"
      })
        .then(({ data }) => {
          if (data && data.code == 0) {
            console.log(data);
            this.loading = false;
            this.formData = data.plan;
          }
        })
        .catch(e => {
          this.$message.error(e);
        });
    },
     getTableData() {
      console.log("维保记录");
      // this.tableLoading = true;
      this.$http({
        url: this.$http.adornUrl("/selfmaintenancecontent/selfmaintenancecontent/list"),
        method: "get",
        data: this.$http.adornParams({
          limit: this.pageSize,
          page: this.pageIndex
        })
      }).then(({ data }) => {
        if (data && data.code == 0) {
          console.log('内容',data.page.list);
          this.tableData = data.page.list;
        }
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
     showsetContent() {
      this.setitemDialogVisible = true;
      this.$nextTick(() => {
        this.$refs.setItem.init(this.contentIdWithStatus);
      });
    },
    setItemConfirm(value) {
      console.log("自主维护内容", value);
      this.contentIdWithStatus = value;
    },
    // 选择电梯
    showElevatorList() {
      this.elevatorDalogvisible = true;
      this.$nextTick(() => {
        this.$refs.elevatorSelector.init();
      });
    },
    elevatorselectConfirm(value) {
      console.log('电梯信息',value);
      this.formData.regCodes = value.regcode;
      this.formData.maintenanceName = value.unitname;
      this.formData.local = value.locals;
      this.formData.elevatorStatus = value.elevatorstatus;
    },
   
    handleSave(formName) {
      console.log("formsubmit", this.formData);
        if(!this.formData.regCodes){
          this.$message({
            type:'warning',
            message:'请选择维保电梯',
            duration:1500
          })
          return false;
        }
        if(!this.contentIdWithStatus||!this.contentIdWithStatus.length){
          this.$message({
            type:'warning',
            message:'请选择维保内容',
            duration:1500
          })
          return false;
        }
        this.formData.contentIds =  this.contentIdWithStatus.join(',');
        this.loading = true;
          this.$http({
            url: this.$http.adornUrl("/selfmaintenanceplan/selfmaintenanceplan/save"),
            method: "post",
            data: this.formData
          })
            .then(res => {
              this.loading = false;
              console.log("formsubmitssucsss", res);
              if (res.data.code == 0) {
                console.log();
                this.$message({
                  type:'success',
                  message: "保存成功",
                  duration:1500,
                  onClose:()=>{
                    this.visible = false;
                    this.contentIdWithStatus = null;//清空上次选择的内容
                    this.$emit('refreshDataList');
                  }

                });
              }
            })
            .catch(e => {
              console.log(e);
            });
    },
    // 申请维修
    handleApply(){

    },
    // 更新状态
    updateStatus(){

    }
  }
};
</script>
<style scoped>
.repair_header {
  font-size: 18px;
  padding: 8px 10px;
  margin-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>