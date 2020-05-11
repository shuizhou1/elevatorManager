<template>
  <div>
    <!-- <div class="header">报警信息</div> -->
    <div class="form_wraper">
      <el-form
        :model="dataForm"
        @keyup.enter.native="getDataList('init')"
        class="form"
        style="margin-left:10px"
      >
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item label="电梯地址" prop="local">
              <el-input v-model.trim="dataForm.local" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="注册代码" prop="regCodes">
              <el-input v-model.trim="dataForm.regCodes" clearable></el-input>
            </el-form-item>
          </el-col>
          <!-- <el-col :span="7">
          <el-form-item class="none_margin_bottom" label="发生时间">
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
          </el-col>-->
        </el-row>
        <el-row :gutter="30">
          <el-col :span="8">
            <el-form-item class="none_margin_bottom" label="发生时间">
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
          <el-col :span="8">
            <el-form-item class="none_margin_bottom" label="解除时间">
              <el-date-picker
                clearable
                v-model.trim="solveTime"
                type="daterange"
                @change="solveTimeChange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-button @click="getDataList('init')" type="query">查询</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <el-table
      :data="dataList"
      border
      @header-dragend="handleDragend"
      v-loading="dataListLoading"
      style="width: 100%;"
    >
      <!-- <el-table-column type="index" header-align="center" align="center" width="50"></el-table-column> -->
      <el-table-column prop="regCode" width="200" header-align="center" align="center" label="注册代码"></el-table-column>
      <el-table-column prop="colDateTime" align="center" label="发生时间"></el-table-column>
      <el-table-column prop="solveTime" align="center" label="解除时间"></el-table-column>
      <el-table-column
        prop="ownerName"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="使用单位"
      ></el-table-column>
      <el-table-column
        prop="local"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="电梯地址"
      ></el-table-column>
      <!-- <el-table-column
        prop="maintenanceName"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="维保单位"
      ></el-table-column> -->
      <el-table-column prop="faultOneLevelName" header-align="center" align="center" label="困人原因"></el-table-column>
      <el-table-column
        prop="faultTwoLevelName"
        show-overflow-tooltip
        header-align="center"
        align="center"
        label="具体原因"
      ></el-table-column>
      <el-table-column label="操作" align="center" width="80px">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="点击记录困人原因" placement="top-start">
            <el-button
              size="mini"
              type="primary"
              @click="toDetail(scope.row)"
              :disabled="Boolean(scope.row.faultOneLevelName)"
              style="padding:8px 10px;font-size:12px;height:36px;margin-bottom:3px;"
            >
              录入
              <!-- <i class="el-icon-info"></i> -->
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
    <stuck-detail v-if="visible" ref="stuckDetail" @refreshData="getDataList"></stuck-detail>
  </div>
</template>

<script>
import config from "@/utils/config.js";
import stuckDetail from "./stuckrecordDetail";

export default {
  data() {
    return {
      setime: "",
      solveTime:"",
      loading: false,
      visible: false,
      dataForm: {
        date: "",
        elevatorStatus: "",
        local: "",
        unitName: "",
        regCodes: "",
        alarm: "",
        type: "",
        code: "",
        startTime: "",
        endTime: "",
        solveTimeStartTime:"",//解除时间开始
        solveTimeEndTime:"",//解除时间结束

      },
      alarmArr: [],
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      paixuoptions: [],
      paixu: "",
      zaixianoptions: [],
      zaixian: "",
      addOrUpdateVisible: false // 维修申请弹窗
    };
  },
  computed: {
    unitType() {
      return this.$store.getters["user/userInfo"].unitType;
    }
  },
  components: {
    stuckDetail
  },
  activated() {
    this.getDataList();
  },
  methods: {
    init(id, regCode) {
      this.visible = true;
      this.$nextTick(() => {
        // console.log('regCode:',regCode)
        // this.dataForm.regCodes = regCode;
        this.getDataList("init");
      });
    },
    changeValue3(row, column, cellValue, index) {
      if (row.colStatus == "1") {
        return "发生";
      } else if (row.colStatus == "0") {
        return "解除";
      } else {
        return "";
      }
    },
    // 时间改变
    pickStimeEtime(e) {
      console.log(e);
      if (e) {
        this.dataForm.startTime = e[0];
        this.dataForm.endTime = e[1];
      } else {
        this.dataForm.startTime = null;
        this.dataForm.endTime = null;
      }
    },
    // 解除时间改变
    solveTimeChange(e){
       if (e) {
        this.dataForm.solveTimeStartTime = e[0];
        this.dataForm.solveTimeEndTime = e[1];
      } else {
        this.dataForm.solveTimeStartTime = null;
        this.dataForm.solveTimeEndTime = null;
      }
    },
    handleDragend(n, o, a, b) {
      config.tableDragendHandle(n, o, a);
    },
    formatDate(row, col, value) {
      if (value && value.length) return value.substr(0, 16);
    },
    // 获取数据列表
    getDataList(type) {
      if (type === "init") {
        this.pageIndex = 1;
      }
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/elevatorwarning/elevatorwarning/list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          elevatorStatus: this.dataForm.elevatorStatus,
          local: this.dataForm.local,
          unitName: this.dataForm.unitName,
          regCode: this.dataForm.regCodes,
          colLiftId: this.dataForm.colLiftId,
          colLmdId: this.dataForm.colLmdId,
          type: this.dataForm.type,
          code: this.dataForm.code,
          startTime: this.dataForm.startTime,
          endTime: this.dataForm.endTime,
          solveTimeStartTime:this.dataForm.solveTimeStartTime,
          solveTimeEndTime:this.dataForm.solveTimeEndTime
        })
      }).then(({ data }) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list;
          this.totalPage = data.page.totalCount;
        } else {
          this.dataList = [];
          this.totalPage = 0;
        }
        this.dataListLoading = false;
      });
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
    toDetail(row) {
      console.log(row);
      this.visible = true;
      this.$nextTick(() => {
        this.$refs["stuckDetail"].init(row.id);
      });
    }
  }
};
</script>

<style scoped>
/* .el-date-editor .el-range-separator {
  padding: 0;
  width: 7%;
} */
</style>
