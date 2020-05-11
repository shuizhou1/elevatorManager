<template>
  <div class="mod-home" style="min-height:390px;min-width:450px">
    <div
      class="chartContainer rightBottom15"
      :style="{'height': height, 'width': charWidth ,'min-height':'180px','min-width':'200px'}"
    >
      <div id="J_chartLineBox" :style="{'height': '100%','width': '100%'}"></div>
    </div>
    <div
      class="chartContainer leftTop15"
      :style="{'height': height, 'width': charWidth,'min-height':'180px','min-width':'200px'}"
    >
      <div id="J_chartBarBox" :style="{'height': '100%','width': '100%'}"></div>
      <!--<el-button class="openButton leftBottom" @click="close(1)"><i class="el-icon-arrow-up"></i></el-button>-->
    </div>
    <div
      class="chartContainer rightTop15"
      :style="{'height': height, 'width': charWidth,'min-height':'180px','min-width':'200px'}"
    >
      <div id="J_chartPieBox" :style="{'height': '100%','width': '100%'}"></div>
      <!--<el-button class="openButton rightTop" @click="close(2)"><i class="el-icon-arrow-down"></i></el-button>-->
    </div>
    <div
      class="chartContainer leftBottom15"
      :style="{'height': height, 'width': charWidth,'min-height':'180px','min-width':'200px'}"
    >
      <div id="J_chartRadarBox" :style="{'height': '100%','width': '100%'}"></div>
      <!--<el-button class="openButton leftTop" @click="close(3)"><i class="el-icon-arrow-down"></i></el-button>-->
    </div>
    
  
    
  </div>
</template>

<script>
import echarts from "echarts";
import config from "@/utils/config";
import { randomColor } from "@/utils/index";
import { pieData, lineData, barData, radData } from "../../utils/homeData";
// const {pieData} = require('@utils/home')
export default {
  data() {
    return {
      clientHeight: null,
      clientWidth: null,
      charWidth: "",
      leftTop: true,
      leftBottom: true,
      rightTop: true,
      rightBottom: true,
      chartLine: null,
      chartBar: null,
      chartPie: null,
      chartRadar: null,
      ceshiHeight: this.documentClientHeight - 50 - 30 - 2 - 20,
      height: "",
      barValue: [],
      barName: [],
      chartBarOption: {
        // color: config.color,
        title: {
          show: true,
          text: "报警信息"
          // x:'center'
        },
        legend: {
          bottom: "5",
          // top: "30",
          formatter(value) {
            let result;
            if (value == "alarm") {
              result = "警报";
            } else if (value == "fault") {
              result = "故障";
            } else if (value == "trap") {
              result = "困人";
            }
            return result;
          }
        },
        xAxis: {
          type: "category",
          splitLine: { show: false },
          data: [],
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "eee", //坐标线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisLabel: {
            textStyle: {}
          }
        },
        yAxis: {
          type: "value",
          name:'次数',
          nameTextStyle:{
            padding:[0,0,0,10]
          },
          axisLine: {
            lineStyle: {
              type: "solid",
              color: "eee", //左边线的颜色
              width: "2" //坐标线的宽度
            }
          },
          axisLabel: {
            formatter(){
              return ''
            },
            textStyle: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          top:'18%',
          containLabel: true
        },
        tooltip: {
          trigger: "item",
          formatter(item, a, b) {
            let value = item.seriesName;
            let result;
            if (value == "alarm") {
              result = "警报";
            } else if (value == "fault") {
              result = "故障";
            } else if (value == "trap") {
              result = "困人";
            }
            return `类型：${result}</br> 次数：${item.data}`;
          },
          axisPointer: {
            type: "shadow"
          }
        },
        series: []
      },
      barColor: [],
      pieDataName: [],
      pieData: [],
      chartPieOption: {
        title: {
          text: "计划分析",
          x: "left"
        },
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "2px",
          right: "2px",
          data: []
        },

        series: [
          {
            name: "",
            type: "pie",
            radius: "80%",
            center: ["50%", "55%"],
            label: {
              normal: {
                formatter: "{d}%",
                position: "inside"
              },
              emphasis: {
                show: true
              }
            },
            lableLine: {
              normal: {
                show: false
              },
              emphasis: {
                show: true
              }
            },
            data: []
          }
        ]
      },
      chartLineOption: {
        color:['#34f023','#2F4554'],
        title:{
          text:'维修统计'
        },
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "5%",
          right: "4%",
          bottom: "10%",
          top: "18%",
          containLabel: true
        },
        legend: {
          bottom: 5,
          data: [
            {
              name: "故障"
            },
            {
              name: "正常"
            }
          ]
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value",
          name:'数量',
          nameTextStyle:{
            // padding:[0,0,0,10]
          }
        },
        series: [
          {
            name: "正常",
            type: "line",
            data: []
          },
          {
            name: "故障",
            type: "line",
            data: []
          }
        ]
      },
      date: [],
      data: [],
      chartRadarOption: {
        title:{
          text:'维保统计'
        },
        color: config.color,
        tooltip: {},
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5]
            }
          },
          radius: 165,
          center: ["50%", "65%"],
          indicator: []
        },
        series: [
          {
            name: "状态",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: []
              }
            ]
          }
        ]
      }
    };
  },
  created() {
    this.getLine();
    this.getChartPie();
    this.getChartBar();
    this.getChartRadar();
  },
  mounted() {
    console.log("mounted");
    var a;
    this.clientHeight = document.documentElement.clientHeight;
    this.clientWidth = document.documentElement.clientWidth;
    this.height = (this.clientHeight - 90) * 0.5 + "px";
    this.charWidth = (document.documentElement.clientWidth - 240) * 0.5 + "px";
    window.addEventListener('resize', ()=> {
      console.log('onresize------')
      this.clientHeight = document.documentElement.clientHeight;
      this.clientWidth = document.documentElement.clientWidth;
      this.height = (this.clientHeight - 90) * 0.5 + "px";
      this.charWidth = (document.documentElement.clientWidth - 240) * 0.5 + "px";
    });
  },
  methods: {
    getLine() {
      this.$http({
        url: this.$http.adornUrl("/statistics/statistics/repairStatistics"),
        method: "get",
        params: this.$http.adornParams({})
      })
        .then(({ data }) => {
          console.log("折线数据", data);
          let [xData, sData1, sData2] = [[], [], []];
          data.list.forEach(item => {
            xData.push(item.createTime);
            sData1.push(item.zhengchang);
            sData2.push(item.guzhang);
          });
          this.chartLineOption.xAxis.data = xData;
          this.chartLineOption.series[0].data = sData1;
          this.chartLineOption.series[1].data = sData2;
          this.$nextTick(() => {
            this.chartLine = echarts.init(
              document.getElementById(`J_chartLineBox`),
              // "light"
            );
            this.chartLine.setOption(this.chartLineOption);
          });
           window.addEventListener("resize", () => {
                this.chartLine.resize();
                 console.log('chartpine.resiz---')
              });
        })
        .catch(e => {
          console.log(e);
        });
    },
    getChartPie() {
      this.$http({
        url: this.$http.adornUrl("/statistics/statistics/planningAnalysis"),
        method: "get",
        params: this.$http.adornParams()
      })
        .then(({ data }) => {
          console.log("饼状图数据", data.list);
          if (data && data.code === 0) {
            this.pieDataName = [];
            this.barValue = [];
            this.pieData = [];
            let arrColor = [];
            data.list.forEach(item => {
              this.pieData.push({
                value: item.elevatornum,
                name: item.unitName
              });
            });
            this.chartPieOption.series[0].data = this.pieData;
            this.$nextTick(() => {
              this.chartPie = echarts.init(
                document.getElementById("J_chartPieBox"),
                // "light"
              );
              this.chartPie.setOption(this.chartPieOption);
              window.addEventListener("resize", () => {
                this.chartPie.resize();
                 console.log('chartpine.resiz---')
              });
            });
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    getChartBar() {
      this.$http({
        url: this.$http.adornUrl("/statistics/statistics/warningInformation"),
        method: "get",
        params: this.$http.adornParams()
      }).then(({ data }) => {
        console.log("条形图数据", data);
        if (data && data.code === 0) {
          this.barDataName = [];
          this.barValue = [];
          this.barData = [];
        }
        // 柱状图配置
        let items = data.warningInformation[0];
        for (let value in items) {
          //  this.chartBarOption.legend.data.push(value);
          this.chartBarOption.series.push({
            type: "bar",
            name: value,
            barWidth:'100px',
                label: {
                  normal: {
                    show: true,
                    position: "top"
                  }
                },
            data: [items[value]]
          });
          //  this.chartBarOption.xAxis.data.push(value);
        }
        console.log("baroption-------------------", this.chartBarOption);
        this.$nextTick(() => {
          this.chartBar = echarts.init(
            document.getElementById("J_chartBarBox"),
            // "light"
          );
          this.chartBar.setOption(this.chartBarOption);
        });

        window.addEventListener("resize", () => {
          this.chartBar.resize();
           console.log('chartbar.resiz---')
        });
      });
    },
    getChartRadar() {
      this.$http({
        url: this.$http.adornUrl(
          "/statistics/statistics/maintenanceStatistics"
        ),
        method: "get",
        params: this.$http.adornParams()
      }).then(({ data }) => {
        if (data && data.code === 0) {
          console.log("雷达图数据", data);
          let [indicator, counts] = [[], []];
          for (let key in data.list[0]) {
            indicator.push({
              name: this.formatCode(key)
            });
            counts.push(data.list[0][key]);
          }
          console.log("counts", counts);
          this.chartRadarOption.radar.indicator = indicator;
          this.chartRadarOption.series[0].data[0].value = counts;
          this.$nextTick(() => {
            this.chartRadar = echarts.init(
              document.getElementById("J_chartRadarBox"),
              // "light"
            );
            this.chartRadar.setOption(this.chartRadarOption);
            window.addEventListener("resize", () => {
                this.chartRadar.resize();
               console.log('chartradar.resiz---')

              });
          });
        }
      });
    },
    formatCode(code) {
      let value;
      if (code == "notstarted") {
        value = "未开始";
      } else if (code == "todotasks") {
        value = "待处理";
      } else if (code == "completed") {
        value = "已完成";
      }
      return value;
    }
  }
};
</script>

<style scoped lang="scss">
.em-style {
  height: 100%;
  display: inline-block;
}
.vertical-middle {
  vertical-align: middle;
}
.char-container {
  position: relative;
  margin: -20px;
}
.echarts {
  width: 100%;
  height: 100%;
}
.mod-home {
  position: fixed;
  left: 200px;
  top: 50px;
  right: 0;
  bottom: 0;
  background: #fff;
}
.leftTopChart {
  width: 50%;
  height: 274px;
  border: $border-base;
}
.chartContainer {
  position: absolute !important;
  border: $border-base;
  background: white;
  box-sizing: border-box;
}
.openButton {
  width: 16px;
  height: 16px;
  padding: 0;
}
.openButton,
.chartContainer {
  &.el-button {
    margin: 0;
    &:hover,
    &:active,
    &:focus {
      color: $primary;
      border-color: rgba(63, 98, 160, 0.3);
      background-color: rgba(63, 98, 160, 0.2);
    }
  }
  // position: absolute;
  &.leftTop {
    left: 0;
    top: 0;
    &15 {
      left: 15px;
      top: 15px;
    }
  }
  &.rightTop {
    right: 0;
    top: 0;
    &15 {
      right: 15px;
      top: 15px;
    }
  }
  &.rightBottom {
    right: 0;
    bottom: 0;
    &15 {
      right: 15px;
      bottom: 15px;
    }
  }
  &.leftBottom {
    left: 0;
    bottom: 0;
    &15 {
      left: 15px;
      bottom: 15px;
    }
  }
}
</style>

