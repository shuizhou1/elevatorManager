<!--  -->
<template>
  <el-dialog
      :show-close="false"
      append-to-body
      title="审核"
      width="40%"
      top="250px"
      :modal="false"
      :visible.sync="visible"
    >
      <div style="padding:0px 10px">
        <div style="margin-bottom:20px" >
          <el-radio-group v-model.trim="auditStatus">
            <el-radio label="1">通过</el-radio>
            <el-radio label="2">不通过</el-radio>
          </el-radio-group>
        </div>
        <div style="display:flex" v-if="auditStatus==2">
          <div style="margin-right:20px;width:100px">不通过原因</div>
          <el-input type="textarea" rows="3" v-model.trim="reason" placeholder="审核不通过原因"></el-input>
        </div>
      </div>
      <div slot="footer" style="text-align:center">
        <el-button type="primary" @click="handleAuditConfirm">确定</el-button>
        <el-button @click="visible=false">取消</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
  data () {
    return {
      visible:false,
      auditStatus:'',//审核状态1.通过2，不通过
      reason:''//审核不通过原因
    };
  },
  components: {},
  created(){},
  methods: {
    init(){
      this.visible = true;
      this.auditStatus = '';
      this.reason = '';
    },
    handleAuditConfirm() {
      if (!this.auditStatus) {
        this.$message({
          type: "warning",
          message: "请选择审核状态",
          duration: 1500
        });
      } else if (this.auditStatus == 1) {
        let obj = {}
        obj.auditStatus = 1;
        this.$emit('confirm',obj);
        this.visible = false;
      } else if (this.auditStatus == 2) {
        if (!this.reason) {
          this.$message({
            type: "warning",
            message: "请填写不通过原因",
            duration: 1500
          });
        }else {
          let obj = {}
          obj.auditStatus = 2;
          obj.reason = this.reason;
          this.$emit('confirm',obj);
          this.visible = false;
        }
      }
    },
  }
}

</script>
<style  scoped>
</style>