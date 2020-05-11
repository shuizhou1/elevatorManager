<!--  -->
<template>
  <div v-loading="loading">
    <el-form class="dialog_head_form">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-form-item label="注册代码" prop="regCode" @keyup.enter.native="getChartData">
            <el-input v-model.trim="formData.regCode" clearable>
              <template slot="append">
                <el-button @click="selectElevator">选择</el-button>
              </template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <!-- <select-month></select-month> -->
          <el-form-item label="年份">
            <el-date-picker
              v-model.trim="dateValue"
              @change="dateChange"
              value-format="yyyy"
              type="year"
              placeholder="请选择"
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
          <el-button @click="getChartData" type="query">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
    <div :style="{'height':height}">
      <div v-if="option.series[0].data.length">
        <div id="chartBox" :style="{'height':chartHeight,'min-height':'280px'}"></div>
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
export default {
  mixins: [statical],
  activated() {
    console.log("actie");
    // 由于给echart添加了resize事件, 在组件激活时需要重新resize绘画一次, 否则出现空白bug

    if (this.echart) {
      this.echart.resize();
    }
  },
  data() {
    return {
      loading: false,
      showElevatorselectDialog: false,
      dateValue: "",
      formData: {
        regCode: "",
        years: "",
        months: "",
        province: "",
        city: "",
        district: ""
      },
      echart: null,
      height:'',
      chartHeight:'',
      width:'',
      option: {
        color: ["#2F6A92"],
        xAxis: {
          type: "category",
          name: "日期",
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "eee",
              width: "2"
            }
          },
          data: []
        },
        yAxis: {
          type: "value",
          name: "费用 (元)",
          axisLine: {
            lineStyle: {
              width: "2",
              type: "solid",
              color: "eee"
            }
          },
          axisLabel: {
            formatter() {
              return "";
            }
          }
        },
        grid: {
          left: "5%",
          right: "5%",
          top: "10%",
          bottom: "10%"
        },
        tooltip: {
          // trigger: "item",
          formatter: "月份：{b}月<br>维修费用：{c}(元)"
        },
        series: [
          {
            name: "维修费用",
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            data: []
          }
        ]
      }
    };
  },
  components: {},
  created() {
    this.getChartData();
  },
  mounted() {
    this.width = document.documentElement.clientWidth - 250 + "px";
    this.height = document.documentElement.clientHeight - 240 + "px";
    this.chartHeight = document.documentElement.clientHeight - 260 + "px";
    window.addEventListener('resize',()=>{
      this.width = document.documentElement.clientWidth - 250 + "px";
      this.height = document.documentElement.clientHeight - 240 + "px";
      this.chartHeight = document.documentElement.clientHeight - 260 + "px";
    })
  },
  methods: {
    getChartData() {
      this.loading = true;
      this.$http({
        url: this.$http.adornUrl("/statistics/statistics/maintenanceCosts"),
        params: this.$http.adornParams(this.formData)
      })
        .then(({ data }) => {
          this.loading = false;
          if (data && data.code == 0) {
            console.log("数据----", data);
            let [xData, sData] = [[], []];
            if (data.list.length) {
              data.list.forEach(item => {
                xData.push(item.date);
                sData.push(item.totalSum);
              });
              this.option.xAxis.data = xData;
              this.option.series[0].data = sData;
              this.$nextTick(() => {
                this.echart = echart.init(
                  document.getElementById("chartBox")
                  // "light"
                );
                this.echart.setOption(this.option);
              });
              window.addEventListener('resize',()=>{
                this.echart.resize();
              })
            }else {
              this.option.series[0].data = [];
            }
          }
        })
        .catch(e => {
          this.loading = false;
          console.log(e);
        });
    }
  }
};
</script>
<style lang='scss' scoped>
</style>