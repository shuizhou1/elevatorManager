<!--  -->
<template>
  <div v-loading="loading">
    <el-form class="dialog_head_form" @keyup.enter.native="getchartData">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="注册代码" prop="regCode">
            <el-input v-model.trim="formData.regCode" clearable>
              <template slot="append">
                <el-button @click="selectElevator">选择</el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- <select-month></select-month> -->
          <el-form-item label="日期">
            <el-date-picker
              v-model.trim="dateValue"
              @change="dateChange"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
              value-format="yyyy-M"
              unlink-panels
              :picker-options="pickerOptions"
              type="monthrange"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="区域">
            <el-cascader
              v-model.trim="areaValue"
              :options="areaData"
              :props="{ checkStrictly: true }"
              @change="handleAreaChange"
              clearable
            ></el-cascader>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button @click="getchartData" type="query">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- <div class="chart_title">困人分析</div> -->
    <div :style="{'height':height,'margin-top':'30px'}">
      <div v-if="sData.length">
        <div id="chartBox" :style="{'height':height,'min-height':'250px','width':width}"></div>
      </div>
      <div v-else class="echart_none_data">暂无数据</div>
    </div>
    <select-elevator
      v-if="showElevatorselectDialog"
      ref="elevatorSelector"
      @confirm="selectElevatorConfirm"
    ></select-elevator>
  </div>
</template>

<script>
import echart from "echarts";
import statical from "@/utils/mixins/staticalAnalysis";
import pagination from "@/utils/mixins/pagination";
import { isObject } from "util";
export default {
  mixins: [statical, pagination],
  activated() {
    console.log("actie");
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug

    if (this.chart) {
      this.chart.resize();
    }
  },
  data() {
    return {
      showElevatorselectDialog: false,
      loading: false,
      height: "",
      width: "",
      sData: [],
      dateValue: "",
      formData: {
        regCode: "",
        years: "",
        months: "",
        province: "",
        city: "",
        district: "",
        startTime: null
      },
      option: {
        title: {
          // text:'困人故障分析',
          x: "center",
          textStyle: {
            fontWeight: "normal"
          }
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "8%",
          // top:'5%',
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          x: "20"
          // y:'bottom'
        },
        series: [
          {
            name: "维修来源",
            type: "pie",
            radius: ["0", "80%"],
            center: ["50%", "50%"],
            data: [],
            label: {
              normal: {
                formatter: "{b} {d}%",
                backgroundColor: "#eee",
                borderColor: "#aaa",
                borderWidth: 1,
                borderRadius: 4,
                padding: [4, 7]
              }
            }
          }
        ]
      }
    };
  },
  created() {
    this.getchartData();
  },
  mounted() {
    this.height = document.documentElement.clientHeight - 310 + "px";
    this.width = document.documentElement.clientWidth - 250 + "px";
    window.addEventListener("resize", () => {
      this.height = document.documentElement.clientHeight - 310 + "px";
      this.width = document.documentElement.clientWidth - 250 + "px";
    });
  },
  methods: {
    getchartData() {
      this.loading = true;
      this.$http({
        url: this.$http.adornUrl("/statistics/statistics/faultStatistics"),
        methods: "get",
        params: this.$http.adornParams(this.formData)
      })
        .then(({ data }) => {
          this.loading = false;
          console.log("图表数据", data);
          if (data && data.code == 0) {
            let [arr1, arr2] = [[], []];
            this.sData = data.list[0].array;
            if (data.list.length) {
              data.list.forEach(item => {
                item.array.forEach(obj => {
                  if (obj) {
                    arr2.push({
                      name: obj.name,
                      value: obj.count
                    });
                  }
                });
              });
              console.log("arr2", arr2);
              this.option.series[0].data = arr2;
              this.$nextTick(() => {
                this.chart = echart.init(document.getElementById("chartBox"));
                this.chart.setOption(this.option);
              });
              window.addEventListener("resize", () => {
                this.chart.resize();
              });
            } else {
              // this.sData = [];
            }
          }
        })
        .catch(e => {
          this.loading = false;

          console.log(e);
        });
    },
    formatCode(code) {
      let value;
      if (code == "allMaintenance" || code == "maintenance") {
        value = "维保";
      } else if (code == "internet") {
        value = "物联网";
      } else if (code == "repair") {
        value = "维修";
      } else if (code == "autonomous") {
        value = "自主维护";
      }
      return value;
    }
  }
};
</script>
<style  scoped>
.chart_title {
  font-size: 18px;
  color: #666;
  text-align: center;
  margin-bottom: 30px;
}
</style>