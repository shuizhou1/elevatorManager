<template>
  <el-dialog
     :show-close="false"
    :close-on-click-modal="true"
    :visible.sync="visible"
    :fullscreen="true"
    :modal="false"
  >
  <div slot="title" class="dialog_headslot">
    选择单位
      <el-button @click="visible=false">返回</el-button>
  </div>
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item label="单位名称" prop="unitName">
        <el-input v-model.trim="dataForm.unitName" placeholder></el-input>
      </el-form-item>
      <el-form-item label="单位地址" prop="address">
        <el-input v-model.trim="dataForm.address" placeholder></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="type==='3'?getDataList1():getDataList()" type="query">查询</el-button>
      </el-form-item>
    </el-form>
    <!--  -->
    <!--   -->
    <el-table
      highlight-current-row
      @current-change="handleCurrentChange"
      :data="dataList"
      border
      v-loading="dataListLoading"
      style="width: 100%;"
    >
      <el-table-column width="35" align="center">
        <template slot-scope="scope">
          <el-radio :label="scope.row.id" v-model.trim="radioValue"></el-radio>
        </template>
      </el-table-column>
      <el-table-column prop="unitName" header-align="center" align="center" label="单位名称"></el-table-column>
      <el-table-column prop="address" header-align="center" align="center" label="单位地址"></el-table-column>
      <el-table-column prop="contactName" header-align="center" align="center" label="联系人"></el-table-column>
      <el-table-column prop="contactPhone" header-align="center" align="center" label="联系电话"></el-table-column>
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
    <div class="button_wraper">
      <el-button type="primary" @click="selectConfirm()">确 定</el-button>
    </div>
    <!-- 弹窗, 新增 / 修改 -->
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dataForm: {
        单位名称: "",
        单位地址: ""
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
      unitList: [],
      visible: false,
      type: "",
      radioValue:'',//单选框值
      selectResult: null //选择结果
    };
  },
  methods: {
    init(type) {
      this.visible = true;
      /* 	this.unitList=unitList */
      /* alert(type==='3') */
      this.type = type;
      if (type === "3") {
        this.getDataList1();
      } else {
        this.getDataList();
      }
    },
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/otherunit/otherunit/list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          unitName: this.dataForm.unitName,
          address: this.dataForm.address
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
    handleCurrentChange(row) {
      if (row) {
        this.radioValue = row.id;
        this.selectResult = {
          id: row.id,
          unitName: row.unitName
        };
      }
    },
    selectConfirm() {
      console.log("确认选择 ", this.selectResult);
      if (this.radioValue) {
        console.log(this.selectResult);
        this.$emit("confirm", this.selectResult);
        this.visible = false;
      } else {
        this.$message({
          type: "warning",
          message: "你的选择为空！",
          duration: 800
        });
      }
    },
    getDataList1() {
      this.dataListLoading = true;
      this.$http({
        url: this.$http.adornUrl("/maintenanceunit/maintenanceunit/list"),
        method: "get",
        params: this.$http.adornParams({
          page: this.pageIndex,
          limit: this.pageSize,
          unitName: this.dataForm.unitName,
          address: this.dataForm.address
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
    }
  }
};
</script>
