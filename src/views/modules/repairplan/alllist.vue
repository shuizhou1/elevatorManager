<!--  -->
<template>
  <div>
    <!-- <div class="header">维修列表</div> -->
    <el-form
      ref="form"
      class="form"
      :model="formData"
      @keyup.enter.native="getDataList(null,'init')"
    >
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="电梯地址" prop="local">
            <el-input v-model.trim="formData.local" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="维保单位" prop="unitName">
            <el-input v-model.trim="formData.unitName" clearable></el-input>
            <!-- <el-select v-model.trim="formData.unitName" placeholder="请选择" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </el-form-item>
        </el-col>

      </el-row>
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item class="none_margin_bottom" label="维修状态" prop="repairStutas">
            <!-- <el-input v-model.trim="formData.repairStutas" clearable></el-input> -->
            <el-select v-model.trim="formData.repairStutas" placeholder="请选择" clearable>
              <el-option
                v-for="item in repairstatusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item class="none_margin_bottom" label="申请日期">
            <el-date-picker
              clearable
              v-model.trim="setime"
              type="daterange"
              @change="pickStimeEtime"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-button type="query" @click="getDataList(null,'init')">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <el-table
      :data="dataList"
      border
      :show-close="false"
      v-loading="dataListLoading"
      @selection-change="selectChange"
      :row-class-name="tableRowClassName"
      style="width: 100%;margin-bottom:30px"
    >
      <!-- <el-table-column header-align="center" align="center" type="selection" width="50"></el-table-column> -->

      <el-table-column prop="regcode" header-align="center" align="center" width="200" label="注册代码"></el-table-column>
      <el-table-column
        prop="unitname"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="维保单位"
      ></el-table-column>
      <el-table-column
        prop="local"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="电梯地址"
      ></el-table-column>
      <!-- <el-table-column
            prop="elevatorstatus"
            :formatter="formatElevatorstatus"
            header-align="center"
            align="center"
            width="80"
            label="电梯类型"
          ></el-table-column>
      <el-table-column prop="remarks" header-align="center" align="center" label="故障原因"></el-table-column>-->
      <el-table-column
        prop="createtime"
        :formatter="formatDate"
        header-align="center"
        align="center"
        width="100"
        label="申请日期"
      ></el-table-column>
      <el-table-column
        prop="repairstutas"
        :formatter="formatStatus"
        header-align="center"
        align="center"
        width="80"
        label="状态"
      ></el-table-column>
      <el-table-column
        prop="hasAudited"
        header-align="center"
        align="center"
        min-width="80"
        label="审核情况"
      ></el-table-column>
      <el-table-column
        prop="repairReason"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="不通过原因"
      ></el-table-column>
      <el-table-column
        prop="totalSum"
        header-align="center"
        :formatter="formatNum"
        align="center"
        width="110"
        label="总费用（元）"
      ></el-table-column>
      <el-table-column
        prop="comeFrom"
        header-align="center"
        align="center"
        :formatter="formatComeForm"
        width="100"
        label="来源"
      ></el-table-column>
      <el-table-column label="操作" header-align="center" align="center" width="160px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            style="padding:8px 10px;font-size:12px;height:36px"
            type="warning"
            :disabled="scope.row.repairstutas!=5"
            v-if="isAuth('repairplan:repairplan:cxweixiu')"
            @click="reAplay(scope.row.repairid)"
          >重新维修</el-button>
          <el-button
            size="mini"
            style="padding:8px 10px;font-size:12px;height:36px"
            type="primary"
            @click="handleAddorUpdate(scope.row.repairid)"
          >详情</el-button>
          <!-- <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalCount"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <repair-add-or-update
      v-if="addOrUpdateVisible"
      ref="addOrUpdate"
      @refreshDataList="getDataList"
    ></repair-add-or-update>
  </div>
</template>

<script>
import mixins from "@/utils/mixins/repairMixins";
export default {
  mixins: [mixins],
  data() {
    return {
      setime: "",
      formData: {
        local: "",
        elevatorStatus: "",
        unitName: "",
        repairStutas: null, //维修状态
        startTime: null,
        endTime: null
      },
      repairstatusOptions: [
        {
          label: "待确认",
          value: "0"
        },
        {
          label: "申请不通过",
          value: "1"
        },
        {
          label: "待维修",
          value: "2"
        },
        {
          label: "待审核",
          value: "3"
        },
        {
          label: "完成",
          value: "4"
        },
        {
          label: "审核不通过",
          value: "5"
        }
      ]
    };
  },

  activated() {
    this.getDataList();
  },
  methods: {
    reAplay(repairid) {
      console.log("重新维修", repairid);

      this.updateStatus(repairid, "2");
    },
    updateStatus(repairid, status) {
      console.log();
      this.$http({
        url: this.$http.adornUrl(`/repairplan/repairplan/update`),
        method: "post",
        data: this.$http.adornData({
          id: repairid,
          repairStutas: status
        })
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
        }
      });
    }
  }
};
</script>
<style lang='scss' scoped>
.el-table__body .warning-row {
  background-color: #fff;
  color: red;
}
</style>
