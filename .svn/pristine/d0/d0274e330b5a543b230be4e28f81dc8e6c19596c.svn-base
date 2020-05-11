<template>
  <el-dialog
    :close-on-click-modal="false"
    :show-close="false"
    :fullscreen="true"
    :modal="false"
    :visible.sync="visible"
    v-loading="loading"
  >
    <div slot="title" class="dialog_headslot">
      维保预约
      <el-button @click="visible=false" style="margin-left:20px">返回</el-button>
    </div>
    <div class="form_wraper">
      <el-form
        ref="maintenamceForm"
        :model="formData"
        :disabled="formData.id!=''"
        :rules="rules"
        class="dialog_head_form"
        style="margin-left:10px"
        label-width="auto"
      >
        <el-row :gutter="60">
          <el-col :span="12">
            <el-form-item label="维保单位" prop="maintenanceName">
              <el-input v-model.trim="formData.maintenanceName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预约时间" prop="maintenanceTime">
              <el-date-picker
                v-model.trim="formData.maintenanceTime"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="date"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="1">
            <el-button @click="selectMaintenanceUnit">选择</el-button>
          </el-col>-->
        </el-row>
        <el-row :gutter="60">
          <el-col :span="12">
            <el-form-item label="申请人" prop="contactName">
              <label slot="label">申&nbsp;请&nbsp;人&nbsp;</label>
              <el-input v-model.trim="formData.contactName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="contactPhone">
              <el-input v-model.trim="formData.contactPhone"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="通知详情" prop="remarks">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 3}"
                v-model.trim="formData.remarks"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row :gutter="20" v-if="">
          <el-col :span="24">
            <el-form-item label="不通过原因" prop="reservationReason">
              <el-input
                type="textarea"
                :autosize="{ minRows: 2, maxRows: 3}"
                v-model.trim="formData.remarks"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>
    </div>
    <div class="button_wraper">
      <el-button
        v-if="isAuth('maintenance:maintenanceplan:wbdt')"
        type="add"
        @click="handleselectElevator()"
      >{{formData.id?'查看维保电梯':'选择维保电梯'}}</el-button>
      <!-- <el-button
        v-if="isAuth('maintenance:maintenanceplan:ckwbdt')&&formData.id"
        type="add"
        @click="handlecheckElevator()"
      >查看维保电梯</el-button>-->
      <el-button
        v-if="isAuth('maintenance:maintenanceplan:xzlxr')"
        type="warning"
        :disabled="formData.reservationStatus!==''"
        @click="handleselectContact()"
        style="margin-left:20px"
      >选择联系人</el-button>
      <el-button
        v-if="isAuth('maintenance:maintenanceplan:yy')"
        type="primary"
        @click="handleAppointment()"
        :disabled="formData.reservationStatus!==''"
        style="margin-left:20px"
      >预约</el-button>
      <el-button
        v-if="isAuth('maintenance:maintenanceplan:qr')"
        :disabled="formData.reservationStatus!=2"
        type="primary"
        @click="showFormconfirmDialog=true"
        style="margin-left:20px"
      >确认</el-button>
      <el-button
        v-if="isAuth('maintenance:maintenanceplan:cxyy')"
        type="warning"
        @click="handleAppointment()"
        :disabled="formData.reservationStatus!=2"
        style="margin-left:20px"
      >请重新预约</el-button>
    </div>
    <div class="button_wraper" v-if="unitType!=3">
      <!-- <el-button
        v-if="isAuth('maintenance:maintenanceplan:ckwbdt')"
        type="add"
        @click="handlecheckElevator"
      >查看维保电梯</el-button>-->

      <!-- <el-button
        v-if="isAuth('maintenance:maintenanceplan:qcxyy')"
        type="warning"
        @click="handleReappointment()"
        style="margin-left:20px"
      >请重新预约</el-button>-->
    </div>
    <select-elevator
      v-if="showElevatorselectDialog"
      ref="elevatorSelector"
      @confirm="elevatorselectConfirm"
    ></select-elevator>
    <check-elevator v-if="showcheckElevatorselectDialog" ref="checkelevator"></check-elevator>
    <select-contact
      v-if="showContactselectDialog"
      ref="contactSelector"
      @confirm="contactselectConfirm"
    ></select-contact>
    <select-maintenance-unit
      v-if="showMaintenanceunitselctDialog"
      ref="maintenanceunitSelector"
      @confirm="selectMaintenanceuniConfirm"
    ></select-maintenance-unit>
    <el-dialog
      :show-close="false"
      append-to-body
      title="不通过原因"
      width="40%"
      top="250px"
      :modal="false"
      :visible.sync="dispassVisible"
    >
      <div style="padding:0px 10px">
        <el-input
          type="textarea"
          rows="3"
          v-model.trim="formData.reservationReason"
          placeholder="不通过原因"
        ></el-input>
      </div>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="handleAuditConfirm">确定</el-button>
        <el-button @click="dispassVisible=false">取消</el-button>
      </div>
    </el-dialog>
     <el-dialog :modal="false" :show-close="false" :visible.sync="showFormconfirmDialog" width="40%" top="200px">
        <div slot="title" class="dialog_title">预约确认</div>
        <div class="wbjh_content">
          <div>维保单位：{{formData.maintenanceName}}</div>
          <div>维保联系人：{{formData.contactName}}</div>
          <div>联系电话：{{formData.contactPhone}}</div>
          <div>维保时间：{{formData.maintenanceTime.substring(0,10)}}</div>
        </div>
        <div class="button_wraper">
          <el-button @click="handleConfirm()" type="primary" style="margin-right:20px">确认</el-button>
          <el-button @click="showFormconfirmDialog=false" style="margin-left:20px">取消</el-button>
        </div>
      </el-dialog>
  </el-dialog>
</template>
<script>
import selectElevator from "@/components/selectElevator.vue";
import checkElevator from "./showelevator.vue";
import selectContact from "@/components/selectContact.vue";
import selectMaintenanceUnit from "@/components/selectmaintenanceunit.vue";
import config from "@/utils/config.js";

import { isMobile, isPhone } from "@/utils/validate";
export default {
  components: {
    selectElevator,
    checkElevator,
    selectContact,
    selectMaintenanceUnit
  },
  created() {
    this.formData.maintenanceName = this.unitName;
    this.formData.maintenanceId = this.unitId;
  },
  data() {
    var validateMobile = (rule, value, callback) => {
      if (isMobile(value)) {
        callback();
      } else {
        callback("联系电话格式有误");
      }
    };
    return {
      visible: false,
      dispassVisible: false,
      showFormconfirmDialog:false,
      loading: false,
      formData: {
        id: "",
        maintenanceName: "", //维保单位
        maintenanceId: "",
        contactName: "", //维保联系人
        contactPhone: "", //联系人电话
        maintenanceTime: "", //预约时间
        remarks: "", //通知
        regCodes: "", //注册代码
        userIds: "", //通知人id
        reservationReason: "",
        reservationStatus: ""
        //0不通过1通过2待处理
      },
      showElevatorselectDialog: false, //电梯选择
      showcheckElevatorselectDialog: false, //查看电梯
      showContactselectDialog: false,
      showMaintenanceunitselctDialog: false, //维保单位
      addRules: {
        maintenanceName: [
          {
            required: true,
            message: "维保单位不能为空"
          }
        ],
        contactName: [
          {
            required: true,
            message: "申请人不能为空"
          }
        ],
        contactPhone: [
          {
            required: true,
            message: "联系电话不能为空"
          },
          {
            validator: validateMobile,
            trigger: "blur"
          }
        ],
        maintenanceTime: [
          {
            required: true,
            message: "预约维保时间不能为空"
          }
        ],
        remarks: [
          {
            required: true,
            message: "通知详情不能为空"
          }
        ],
        regCodes: [
          {
            required: true,
            message: "请选择维保电梯"
          }
        ]
      }
    };
  },
  computed: {
    unitType() {
      console.log("userInfo", this.$store.getters["user/userInfo"]);
      return this.$store.getters["user/userInfo"].unitType;
    },
    unitName() {
      console.log("userInfo", this.$store.getters["user/userInfo"]);
      return this.$store.getters["user/userInfo"].unitName;
    },
    unitId() {
      console.log("userInfo", this.$store.getters["user/userInfo"]);
      return this.$store.getters["user/userInfo"].unitId;
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
  methods: {
    init(id) {
      console.log("id", id);
      console.log("formData", this.formData);
      this.formData.id = id;
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["maintenamceForm"].resetFields();
        this.formData.regCodes = "";
        this.formData.userIds = "";
        this.formData.reservationStatus = "";
        this.formData.reservationReason = "";
        if (this.formData.id) {
          this.loading = true;
          this.$http({
            url: this.$http.adornUrl(
              `/maintenancereservation/maintenancereservation/info/${this.formData.id}`
            ),
            method: "get",
            params: this.$http.adornParams()
          }).then(({ data }) => {
            console.log(data);
            if (data && data.code == 0) {
              this.loading = false;
              console.log(data);
              this.formData = data.maintenanceReservation;
            }
          });
        }
      });
    },
    handleselectElevator(choose) {
      if (this.formData.id) {
        this.showcheckElevatorselectDialog = true;
        this.$nextTick(() => {
          this.$refs.checkelevator.init(this.formData.regCodes);
        });
      } else {
        this.showElevatorselectDialog = true;
        this.$nextTick(() => {
          this.$refs.elevatorSelector.init(null, this.formData.regCodes);
        });
      }
    },
    // 确认选择
    elevatorselectConfirm(val) {
      console.log("确认选择", val);
      this.formData.regCodes = val.map(item => item.regcode).join(",");
      // this.formData.locals = val.locals;
      console.log(this.formData.regCodes);
    },
    // 查看电梯
    handlecheckElevator(choose) {
      this.showcheckElevatorselectDialog = true;
      this.$nextTick(() => {
        this.$refs.checkelevator.init(this.formData.regCodes);
      });
    },

    handleselectContact() {
      this.showContactselectDialog = true;
      this.$nextTick(() => {
        this.$refs.contactSelector.init(this.formData.userIds);
      });
    },
    contactselectConfirm(val) {
      console.log("联系人", val);
      this.formData.userIds = val.map(item => item.userId).join(",");
    },
    // 选择维保单位
    selectMaintenanceUnit() {
      this.showMaintenanceunitselctDialog = true;
      this.$nextTick(() => {
        this.$refs.maintenanceunitSelector.init(this.formData.maintenanceId);
      });
    },
    selectMaintenanceuniConfirm(val) {
      console.log("确认选择", val);
      this.formData.maintenanceId = val.id;
      this.formData.maintenanceName = val.unitName;
    },
    // 提交表单
    formSubmit() {
      console.log("formsubmit", this.formData);

      this.$refs["maintenamceForm"].validate(valid => {
        if (valid) {
          if (!this.formData.regCodes) {
            this.$message({
              type: "warning",
              message: "请选择维保电梯",
              duration: 1500
            });
            return false;
          }
          if (!this.formData.userIds) {
            this.$message({
              type: "warning",
              message: "请选择联系人",
              duration: 1500
            });
            return false;
          }
          this.loading = true;
          this.$http({
            url: this.$http.adornUrl(
              `/maintenancereservation/maintenancereservation/${
                !this.formData.id ? "save" : "update"
              }`
            ),
            method: "post",
            data: this.$http.adornData(this.formData)
          })
            .then(({ data }) => {
              console.log("formsubmitssucsss", data);
              this.loading = false;
              if (data && data.code == 0) {
                this.loading = false;
                this.$message({
                  type: "success",
                  message: "保存成功",
                  duration: 1500,
                  onClose: () => {
                    this.visible = false;
                    // this.formData.regCodes = null;
                    // this.$refs["maintenamceForm"].resetFields();
                    this.$emit("refreshDataList");
                  }
                });
              } else {
                this.$message.error(data.msg);
              }
            })
            .catch(e => {
              this.loading = false;
              console.log(e);
            });
        }
      });
    },

    handleConfirm() {
      // 预约确认
      this.formData.reservationStatus = 1;
      this.showFormconfirmDialog = false;
      this.formSubmit();
    },
    // 重新预约
    handleReappointment() {
      this.dispassVisible = true;
    },
    // 预约
    handleAppointment() {
      if (this.formData.id) {
        this.handleReappointment();
      } else {
        this.formSubmit();
      }
    },
    handleAuditConfirm() {
      console.log("handleAuditConfirm", this.formData.reservationReason);
      if (!this.formData.reservationReason) {
        this.$message({
          type: "warning",
          message: "请填写不通过原因",
          duration: 1500
        });
        return false;
      }
      this.formData.reservationStatus = 0;
      this.dispassVisible = false;
      this.formSubmit();
    }
  }
};
</script>
<style  scoped>
</style>