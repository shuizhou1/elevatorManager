<template>
  <div>
    <el-dialog
      :show-close="false"
      :lock-scroll="true"
      :fullscreen="true"
      :modal="false"
      :visible.sync="visible"
      v-loading="loading"
    >
      <div slot="title" class="dialog_headslot">
        {{!this.formData.id ? '维修信息' : '维修信息'}}
        <el-button @click="visible = false">返回</el-button>
      </div>
      <div
        style=" margin-bottom: 20px;padding: 0 10px;"
        v-show="formData.allStutas&&formData.allStutas.length"
      >
        <div style="font-size: 18px;margin-bottom:20px;">维修状态</div>
        <el-steps
          :space="200"
          :active="formData.allStutas.length-1"
          finish-status="wait"
          process-status="finish"
          style="padding:0 10px;"
        >
          <el-step v-for="(item,index) in formData.allStutas" :key="index" :title="stepTitle(item)"></el-step>
        </el-steps>
      </div>
      <div class="subtitle_header">
        <div>设备信息</div>
        <el-button
          @click="showElevatorList"
          style="height:36px"
          v-if="!formData.id&&!disabledSelect||!formData.regCode&&! disabledSelect"
        >选择</el-button>
      </div>
      <div class="form-view-wraper">
        <el-row :gutter="30">
          <el-col :span="8">
            <div class="form-view-item">
              注册代码：
              <span>{{formData.regCode}}</span>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="form-view-item">
              维保单位：
              <span>{{formData.maintenanceName}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="30">
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
      <el-form
        :model="formData"
        :rules="rules"
        ref="form"
        @keyup.enter.native="dataFormSubmit()"
        class="form"
        label-width="auto"
      >
        <el-row :gutter="30">
          <el-col :span="24">
            <el-form-item label="故障原因" prop="remarks">
              <el-input
                type="textarea"
                v-model.trim="formData.remarks"
                :disabled="!isAuth('repairplan:repairplan:save')||formData.repairStutas!==''"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="24">
            <el-form-item label="损害情况" prop="component">
              <el-input
                type="textarea"
                v-model.trim="formData.component"
                :disabled="!isAuth('repairplan:repairplan:save')||formData.repairStutas!==''"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="申请人" prop="applicant">
              <label slot="label">申&nbsp;请&nbsp;人&nbsp;</label>
              <el-input v-model.trim="formData.applicant" disabled clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="联系电话" prop="applicantPhone">
              <el-input v-model.trim="formData.applicantPhone" disabled clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否应急" prop="urgent">
              <el-select
                placeholder="请选择"
                :disabled="!isAuth('repairplan:repairplan:save')||formData.repairStutas!==''"
                v-model.trim="formData.urgent"
                clearable
              >
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
        <el-row
          :gutter="30"
          v-if="formData.repairStutas==2||formData.repairStutas==3||formData.repairStutas==4||formData.repairStutas==5"
        >
          <el-col :span="24">
            <el-form-item label="维修过程" prop="repairProcess">
              <el-input
                type="textarea"
                v-model.trim="formData.repairProcess"
                :disabled="!isAuth('repairplan:repairplan:save')||formData.repairStutas!=='2'"
                clearable
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row
          :gutter="30"
          v-if="formData.repairStutas==0||formData.repairStutas==1||formData.repairStutas==3||formData.repairStutas==5"
        >
          <el-col :span="24">
            <el-form-item label="审核不通过原因" prop="repairReason">
              <el-input type="textarea" v-model.trim="formData.repairReason" :disabled="formData.repairStutas==5||unitType!=='2'||unitType!=='1'||formData.repairStutas==1" clearable></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>
      <div class="subtitle">维修内容</div>
      <el-table
        :data="tableData"
        width="80%"
        top="8%"
        border
        show-summary
        :summary-method="handleGetSummaries"
      >
        <el-table-column prop="items" label="品目" align="center"></el-table-column>
        <el-table-column prop="count" align="center" label="数量"></el-table-column>
        <el-table-column prop="price" label="单价（元）" :formatter="formatPrice" align="center"></el-table-column>
        <el-table-column prop="coltotal" align="center" :formatter="formatcoltotal" label="小计（元）"></el-table-column>
        <el-table-column align="center" label="操作" width="100" v-if="formData.repairStutas===''">
          <template slot-scope="scope">
            <el-button
              size="mini"
              style="padding:8px 10px;font-size:12px;height:36px"
              type="delete"
              @click="handleDelete(scope.$index)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form
        ref="itemForm"
        :model="itemFormData"
        class="itemForm"
        label-width="auto"
        :rules="itemFormRules"
      >
        <el-row>
          <el-col :span="6">
            <el-form-item prop="items">
              <el-input v-model.trim="itemFormData.items" placeholder="品目"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="count">
              <el-input
                v-model.trim="itemFormData.count"
                type="number"
                v-enterNumber
                min="0"
                placeholder="数量"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item prop="price">
              <el-input v-model.trim="itemFormData.price" type="number" min="0" placeholder="单价"></el-input>
            </el-form-item>
          </el-col>
          <div>
            <el-button type="primary" @click="addRow" style="margin-left:20px">确认</el-button>
            <el-button @click="hideItemForm" style="margin-left:20px">取消</el-button>
          </div>
        </el-row>
      </el-form>
      <div
        style="text-align:center;margin:10px 0;"
        v-if="formData.repairStutas===''&&isAuth('repairplan:repairplan:save')"
      >
        <i
          class="el-icon-circle-plus-outline"
          size="32"
          style="font-size:24px"
          @click="showItemForm"
        ></i>
      </div>
      <div class="button_wraper">
        <el-button
          type="warning"
          v-if="isAuth('repairplan:repairplan:qr')&&formData.repairStutas==2"
          @click="updateStatus"
        >维修完成</el-button>
        <!-- <el-button
        type="success"
        v-if="formData.repairStutas==='0'&&isAuth('repairplan:pass')&&isunExamin||formData.repairStutas==='3'&&isAuth('repairplan:pass')&&isunExamin"
        @click="handlePass(formData.repairStutas)"
        >审核通过</el-button>-->
        <el-button
          type="add"
          v-if="formData.repairStutas==='0'&&isAuth('repairplan:dispass')&&isunExamin||formData.repairStutas==3&&isAuth('repairplan:dispass')&&isunExamin"
          @click="showCheckRemark"
        >审核</el-button>

        <el-button
          type="primary"
          :disabled="disableFormSubmit"
          v-if="formData.repairStutas===''&&isAuth('repairplan:repairplan:qr')"
          @click="dataFormSubmit()"
        >确定</el-button>
      </div>
    </el-dialog>
    <select-elevator
      v-if="showElevatorDialog"
      @confirm="elevatorSelectConfirm"
      ref="elevatorSelect"
    ></select-elevator>
    <audit-component v-if="dispassresonVisible" ref="audit" @confirm="handleAuditConfirm"></audit-component>
  </div>
</template>

<script>
import { isMobile, isPhone } from "@/utils/validate";
import selectElevator from "@/components/select-single-elevator.vue";
import auditComponent from "@/components/audit.vue";
import { userInfo } from "os";
export default {
  components: {
    selectElevator,
    auditComponent
  },
  created() {
    console.log("created");
  },
  activated() {
    console.log("activated");
  },
  watch: {
    "formData.elevatorStatus"(val) {
      console.log("watch200");
      if (val == 1) {
        this.type = "客梯";
      } else if (val == 2) {
        this.type = "货梯";
      } else {
        this.type = "";
      }
    }
  },
  computed: {
    isunExamin() {
      // 物业单位/业主单位是否未审核
      let unitType = this.$store.state.user.userInfo.unitType;
      console.log(unitType);
      if (unitType == 2 && this.formData.juedge != 2&&this.formData.udited=='false') {
        // 物业单位
        return true;
      } else if (unitType == 1 && this.formData.juedge != 1&&this.formData.udited=='true') {
        //业主单位
        return true;
      } else {
        return false;
      }
    },
    unitType() {
      return this.$store.getters["user/userInfo"].unitType;
    },
    userInfo() {
      return this.$store.getters["user/userInfo"];
    },
    canExam() {
      return this.unitType == 1 || this.unitType == 2;
    },
    rules() {
      if (this.formData.id) {
        let obj = {};
        return obj;
      } else {
        return this.addRules;
      }
    }
  },

  data() {
    var validateMobile = (rule, value, callback) => {
      if (isMobile(value) || isPhone(value)) {
        callback();
      } else {
        callback("申请人联系电话格式有误");
      }
    };

    return {
      disableFormSubmit:false,
      disabledSelect: "",
      dispassresonVisible: false,
      loading: false,
      visible: false,
      dialogVisible: false,
      showElevatorDialog: false,
      type: "", //电梯类型
      options: [
        {
          label: "是",
          value: "1"
        },
        {
          label: "否",
          value: "2"
        }
      ],
      auditStatus: "", //审核状态1.通过2.不通过
      formData: {
        id: "",
        maintenanceplanRepair: "",
        applicant: "", //申请人
        applicantPhone: "", //申请人电话
        urgent: "", //是否应急维修1应急维修2普通维修
        regCode: "", //注册码
        component: "", //损坏情况
        remarks: "", //故障原因
        maintenanceId: "", //维保单位id
        maintenanceUnitName: "", //维保单位
        elevatorStatus: "", //电梯类型
        repairStutas: "",
        propertyId: "", //物业单位id
        depotId: "", //仓库id
        ownerId: "", //业主id
        totalSum: "",
        repairStutas: "",
        items: [],
        repairReason: "", //不通过原因
        juedge: "", //判断是否审核过
        allStutas: [],
        comeFrom: "4" ,//维修来源
        udited:'false',
      },
      itemFormData: {
        price: "",
        items: "",
        count: ""
      },
      totalSum: "", //总金额
      tableData: [],
      itemFormRules: {
        price: [
          {
            required: true,
            message: "单价不能为空或数据有误"
          }
        ],
        items: [
          {
            required: true,
            message: "品目不能为空"
          }
        ],
        count: [
          {
            required: true,
            message: "数量不能为空或数据有误"
          }
        ]
      },
      // rules: {},
      addRules: {
        component: [
          {
            required: true,
            message: "损害情况不能为空"
          }
        ],
        remarks: [
          {
            required: true,
            message: "故障原因不能为空"
          }
        ],
        urgent: [
          {
            required: true,
            message: "请选择是否应急"
          }
        ],
        // applicant: [
        //   {
        //     required: true,
        //     message: "申请人不能为空"
        //   }
        // ],
        // applicantPhone: [
        //   {
        //     required: true,
        //     message: "申请人联系电话不能为空",
        //     trigger: "blur"
        //   },
        //   {
        //     validator: validateMobile
        //   },
        //   {
        //     trigger: "blur"
        //   }
        // ],
        regCode: [
          {
            required: true,
            message: "注册码不能为空"
          }
        ]
      }
    };
  },

  methods: {
    init(id) {
      console.log("id", id);
      // console.log("formData", this.formData);
      this.formData.applicant = this.userInfo.nickname;
      this.formData.applicantPhone = this.userInfo.mobile;
      this.formData.id = id;
      this.tableData = [];
      this.visible = true;
      this.$nextTick(() => {
        this.hideItemForm();
        this.$refs["form"].resetFields();
        this.$refs["itemForm"].resetFields();
        this.formData.repairStutas = ""; //清空维修状态
        this.formData.juedge = ""; //
        this.formData.repairReason = ""; //
        this.formData.regCode = ""; //
        this.formData.maintenanceName = ""; //
        this.formData.maintenanceId = ""; //
        this.formData.local = ""; //
        this.formData.allStutas = ""; //
        this.formData.elevatorStatus = ""; //

        if (this.formData.id) {
          this.loading = true;
          this.$http({
            url: this.$http.adornUrl(
              `/repairplan/repairplan/info/${this.formData.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            if (data && data.code == 0) {
              this.loading = false;
              console.log("data---------------", data.repairPlan);
              let repairPlan = data.repairPlan;
              this.formData = repairPlan;
              this.tableData = JSON.parse(repairPlan.items);
            }
          });
        }
      });
    },
    stepTitle(status) {
      // console.log(row);
      let str;
      switch (status) {
        case "0":
          str = "待确认";
          break;
        case "1":
          str = "不通过";
          break;
        case "2":
          str = "待维修";
          break;
        case "3":
          str = "待审核";
          break;
        case "4":
          str = "完成";
          break;
        case "5":
          str = "不通过";
          break;
      }
      return str;
    },
    showElevatorList() {
      this.showElevatorDialog = true;
      this.$nextTick(() => {
        this.$refs.elevatorSelect.init(this.formData.regCode);
      });
    },
    elevatorSelectConfirm(val) {
      this.formData.regCode = val.regcode;
      this.formData.maintenanceId = val.maintenanceid;
      this.formData.local = val.locals;
      this.formData.maintenanceName = val.unitname;
      this.formData.elevatorStatus = val.elevatorstatus;
    },
    mul(a,b){
      // 解决js计算不准确问题
      let str1 = String(a), str2 = String(b),m=0;
      try{
        m += str1.split('.')[1].length 
      }catch(e){}
      try{
        m += str2.split('.')[1].length 
      }catch(e){}
      return Number(str1.replace('.',''))*Number(str2.replace('.','')) / Math.pow(10,m)
    },
    formatPrice(row,col,value){
      return Math.round(Number(value)*100)/100
    },
    formatcoltotal(row) {
      return Math.round(this.mul(row.count,row.price)*100)/100;

    },
    handleGetSummaries(value) {
      const { columns, data } = value;
      let arr = [];
      let sum = 0;
      data.forEach((item, index) => {
        sum += this.mul(item.count,item.price);
      });
      this.formData.totalSum = Math.round(sum*100)/100;
      arr[3] = Math.round(sum*100)/100;
      arr[0] = "合计（元）";
      return arr;
    },
    showItemForm() {
      let dom = document.getElementsByClassName("itemForm")[0];
      dom.style.display = "block";
      dom.style.transform = "none";
    },
    hideItemForm() {
      let dom = document.getElementsByClassName("itemForm")[0];
      dom.style.display = "none";
      dom.style.transform = "translateY(-100%)";
    },
    addRow() {
      this.$refs["itemForm"].validate(valid => {
        if (valid) {
          this.tableData.push({
            items: this.itemFormData.items,
            price: this.itemFormData.price,
            count: this.itemFormData.count
          });
          this.$refs["itemForm"].resetFields();
          let dom = document.getElementsByClassName("itemForm")[0];
          dom.style.display = "none";
          dom.style.transform = "translateY(-100%)";
        }
      });
    },
    handleDelete(ind) {
      // 删除行
      console.log(ind);
      this.tableData = this.tableData.filter((item, index) => {
        return index != ind;
      });
      console.log(this.tableData);
    },
    // 表单提交
    dataFormSubmit() {
      console.log("formsubmmit", this.formData);

      this.$refs["form"].validate(valid => {
        if (valid) {
        
          if (!this.formData.regCode) {
            this.$message({
              type: "warning",
              message: "请选择电梯",
              duration: 1500
            });
            return false;
          }
          if (!this.tableData || !this.tableData.length) {
            this.$message({
              type: "warning",
              message: "请填写维修内容",
              duration: 1500
            });
            return false;
          }
          this.formData.items = JSON.stringify(this.tableData);
            this.loading = true;
          this.disableFormSubmit = true;
          this.$http({
            url: this.$http.adornUrl(
              `/repairplan/repairplan/${!this.formData.id ? "save" : "update"}`
            ),
            method: "post",
            data: this.$http.adornData(this.formData)
          })
            .then(({ data }) => {
              this.loading = false;
              this.disableFormSubmit = false;
              if (data && data.code === 0) {
                this.$message({
                  message: "保存成功",
                  type: "success",
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                    this.dispassresonVisible = false;
                    this.$emit("refreshDataList");
                  }
                });
              } else {
                this.$message.error(data.error);
              }
            })
            .catch(e => {
              // this.disableFormSubmit = false;

            });
        }
      });
    },

    updateStatus() {
      this.$confirm(`维修完成?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        if (!this.formData.repairProcess) {
          this.$message({
            type: "warning",
            message: "请填写维修过程",
            duration: 1500
          });
          return false;
        }
        this.formData.juedge = "";
        this.formData.repairStutas = "3";
        console.log("updateStatus", this.formData.id);
        this.loading = true;
        this.$http({
          url: this.$http.adornUrl(`/repairplan/repairplan/update`),
          method: "post",
          data: this.$http.adornData(this.formData)
        }).then(({ data }) => {
          this.loading = false;
          if (data && data.code === 0) {
            this.$message({
              message: "保存成功",
              type: "success",
              duration: 1500,
              onClose: () => {
                this.visible = false;
                this.$emit("refreshDataList");
              }
            });
          }
        });
      });
    },
    showCheckRemark(id) {
      console.log(" showCheckRemark", id);
      // this.checkId = id;
      this.dispassresonVisible = true;
      this.$nextTick(() => {
        this.$refs.audit.init();
      });
    },

    handleAuditConfirm(obj) {
      console.log("handleAuditConfirm", obj);
      // this.auditStatus = obj.auditStatus;
      if (obj.auditStatus == 1) {
        this.handlePass();
      } else {
        this.formData.repairReason = obj.reason;
        this.handleDisPass();
      }
    },
    handlePass() {
      if (this.formData.repairStutas == 0) {
        this.formData.repairStutas = "2";
      } else if (this.formData.repairStutas == 3) {
        this.formData.repairStutas = "4";
      }
      if (this.unitType == "1") {
        this.formData.juedge = "1";
      } else if (this.unitType == "2") {
        this.formData.juedge = "2";
      }
      this.dataFormSubmit();
    },

    handleDisPass() {
      console.log("dispass");

      if (this.formData.repairStutas == 0) {
        this.formData.repairStutas = "1";
      } else if (this.formData.repairStutas == 3) {
        this.formData.repairStutas = "5";
      }
      if (this.unitType == "1") {
        this.formData.juedge = "1";
      } else if (this.unitType == "2") {
        this.formData.juedge = "2";
      }
      this.dispassresonVisible = false;
      this.dataFormSubmit();
    },
    handleRepair(regCodes, maintenanceplanRepair) {
      console.log("repair");
      // 维保过来
      // this.$nextTick(()=>{
      //   this.$refs['form'].resetFields();
      // })
      // this.visible=true;
      this.formData.applicant = this.userInfo.nickname;
      this.formData.applicantPhone = this.userInfo.mobile;
      this.visible = true;
      this.$nextTick(() => {
        this.hideItemForm();
        this.$refs["form"].resetFields();
        this.$refs["itemForm"].resetFields();
        this.tableData = [];
        this.formData.repairStutas = ""; //清空维修状态
        this.formData.juedge = ""; //
        this.formData.repairReason = ""; //
        this.formData.allStutas = ""; //
        //
      this.disabledSelect = true;
      this.formData.regCode = regCodes;
      this.formData.maintenanceplanRepair = maintenanceplanRepair;
      this.formData.comeFrom = "2";
      let url = "/elevatorinformation/elevatorinformation/list";
      this.$http({
        url: this.$http.adornUrl(url),
        method: "get",
        params: this.$http.adornParams({
          page: 1,
          limit: 1,
          regCodes: regCodes
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.formData.regCode = data.page.list[0].regcode;
          this.formData.maintenanceName = data.page.list[0].unitname;
          this.formData.maintenanceId = data.page.list[0].maintenanceid;
          this.formData.elevatorStatus = data.page.list[0].elevatorstatus;
          this.formData.local = data.page.list[0].locals;
        }
      });
      })
    },
    handleWarningRepair(row) {
      console.log("WarningData", row);
      //物联网过来
      this.formData.applicant = this.userInfo.nickname;
      this.formData.applicantPhone = this.userInfo.mobile;
      this.visible = true;
      this.$nextTick(() => {
        this.hideItemForm();
        this.$refs["form"].resetFields();
        this.$refs["itemForm"].resetFields();
        this.tableData = [];
        this.formData.repairStutas = ""; //清空维修状态
        this.formData.juedge = ""; //
        this.formData.repairReason = ""; //
        this.formData.allStutas = ""; //
        //
        this.disabledSelect = true;
        this.formData.regCode = row.regCode;
        this.formData.maintenanceName = row.maintenanceName;
        this.formData.maintenanceId = row.maintenanceId;
        this.formData.elevatorStatus = row.elevatorStatus;
        this.formData.local = row.local;
        this.formData.remarks = row.remarks;
        this.formData.warningId = row.id;
        this.formData.comeFrom = "1";
        // this.visible = true;
      });
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
.itemForm {
  /* transform: translateY(-100%); */
  /* display: none;
   */
  display: none;
  /* opacity: 0; */
  transition: all 0.5s;
}
</style>