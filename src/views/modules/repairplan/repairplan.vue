<!--  -->
<template>
  <div>
    <!-- <div class="header">维修申请列表</div> -->
    <el-form
      ref="form"
      class="form"
      :model="formData"
      label-width="auto"
      @keyup.enter.native="getDataList(1,'init')"
    >
      <el-row :gutter="30">
        <el-col :span="6">
          <el-form-item class="none_margin_bottom" label="电梯地址" prop="local">
            <el-input v-model.trim="formData.local" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item class="none_margin_bottom" label="维保单位" prop="unitName">
						  <el-input  v-model.trim="formData.unitName" clearable></el-input>
           <!-- <el-select v-model.trim="formData.elevatorStatus" placeholder="请选择" clearable>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select> -->
          </el-form-item>
        </el-col>
       <el-col :span="7">
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
        <el-col :span="4">
          <el-button type="query" v-if="isAuth('repairplan:repairplan:list')" @click="getDataList(1,'init')">查询</el-button>
          <el-button type="add" v-if="isAuth('repairplan:repairplan:save')" @click="handleAddorUpdate('')">新增</el-button>
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
        >
          <!-- <el-table-column header-align="center" align="center" type="selection" width="50"></el-table-column> -->
            <el-table-column
            prop="regcode"
            header-align="center"
            align="center"
            width="200"
            label="注册代码"
          ></el-table-column>
          <el-table-column prop="unitname" show-overflow-tooltip header-align="center" align="center" label="维保单位"></el-table-column>
          <el-table-column prop="local" show-overflow-tooltip header-align="center" align="center" label="电梯地址"></el-table-column>
         <!-- <el-table-column
            prop="elevatorstatus"
            :formatter="formatElevatorstatus"
            header-align="center"
            align="center"
            width="80"
            label="电梯类型"
          ></el-table-column>
          <el-table-column prop="remarks" header-align="center" align="center" label="故障原因"></el-table-column> -->
          <el-table-column
            prop="createtime" :formatter="formatDate" header-align="center" align="center" width="100" label="申请日期" ></el-table-column>
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
					  prop="totalSum"
					  header-align="center"
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
          <el-table-column label="操作" header-align="center" align="center" width="100px">
            <template slot-scope="scope">
              <!-- <el-button
                size="mini"
                style="padding:8px 10px;font-size:12px;height:36px"
                type="warning"
                @click="reAplay(scope.row.repairid)"
                v-if="isAuth('repairplan:repairplan:update')&&scope.row.repairstutas==1"
              >重新申请</el-button> -->
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
      @refreshDataList="getDataList('1')"
    ></repair-add-or-update>
  </div>
</template>

<script>
import mixins from "@/utils/mixins/repairMixins"
export default {
  mixins:[mixins],
  data() {
    return {
      setime:'',
      formData: {
        local: "",
        elevatorStatus: "",
        unitName: "",
        startTime:null,
        endTime:null
      },

    };
  },
  activated() {
    this.getDataList(1);
  },
  methods: {
  
  }
};
</script>
<style lang='scss'>
.el-table__body .warning-row {
  background-color: #fff;
  color:red;
}
</style>
