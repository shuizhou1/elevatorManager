const barData= [{
	  statusName:'警报',
	  count:11
  }, 
  {
      statusName: '故障',
      count: 8
  }, 
  {
      statusName: '困人',
      count: 1
  }]

const lineData = {
  months: ['2019-10-07', '2019-10-10','2019-10-16', '2019-10-20', '2019-10-21'
  ],
  series: [{
      data: [5, 4, 4, 4,5],
      name: '正常',
      type: 'line'
  }, {
      data: [2, 3, 3, 3,2],
      name: '故障',
      type: 'line'
  }]
}
// const lineData = {
//     months: ['2019-10-1', '2019-10-15', '2019-10-30', '2019-11-15', '2019-11-30','2019-12-15','2019-12-30'],
//     series: [{
//         data: [5, 4, 4, 4, 5,7,2],
//         name: '正常',
//         type: 'line'
//     }, {
//         data: [2, 3, 3, 3, 2,6,4],
//         name: '故障',
//         type: 'line'
//     }]
// }
const pieData = [
  {
      unitName: '日立电梯（中国）有限公司广州分公司',
      count: 5
  }, {
      unitName: '广州市大力士电梯有限公司',
      count: 4
  }, {
      unitName: '广州市永恒电梯有限公司',
      count: 3
  }, {
      unitName: '上海三菱电梯有限公司广东分公司',
      count: 2
  }
]
const radData = [{
    statusName: '未开始',
    count: 10
}, {
    statusName: '待处理',
    count: 4
}, {
    statusName: '已完成',
    count: 1
}]

// 统计分析
const sysPieData = [{
    unitName: '日立电梯（中国）有限公司广州分公司',
    count: 6
}, {
    unitName: '广州市大力士电梯有限公司',
    count: 4
}, {
    unitName: '广州市永恒电梯有限公司',
    count: 3
}]

const sysBarData = [{
    "alarmCount": 0,
    "colAlarmCode": "ABL"
}, {
    "alarmCount": 0,
    "colAlarmCode": "ARDI"
}, {
    "alarmCount": 0,
    "colAlarmCode": "CDO"
}, {
    "alarmCount": 0,
    "colAlarmCode": "EBF"
}, {
    "alarmCount": 0,
    "colAlarmCode": "EBL"
}, {
    "alarmCount": 1,
    "colAlarmCode": "LBH"
}, {
    "alarmCount": 0,
    "colAlarmCode": "LBL"
}, {
    "alarmCount": 0,
    "colAlarmCode": "LDO"
}, {
    "alarmCount": 0,
    "colAlarmCode": "LIOF"
}, {
    "alarmCount": 2,
    "colAlarmCode": "LM"
}, {
    "alarmCount": 0,
    "colAlarmCode": "LOB"
}, {
    "alarmCount": 0,
    "colAlarmCode": "LRF"
}, {
    "alarmCount": 0,
    "colAlarmCode": "MOF"
}, {
    "alarmCount": 5,
    "colAlarmCode": "MRI"
}, {
    "alarmCount": 0,
    "colAlarmCode": "PSF"
}, {
    "alarmCount": 1,
    "colAlarmCode": "PTRAP"
}, {
    "alarmCount": 0,
    "colAlarmCode": "RESTR"
}, {
    "alarmCount": 3,
    "colAlarmCode": "TOI"
}, {
    "faultCount": 0
}]

const syslineData = {
    months: ['2019-10-07', '2019-10-10', '2019-10-16', '2019-10-20', '2019-10-21'],
        series: [{
            data: [5, 4, 4, 4, 5],
            name: '正常',
            type: 'line'
        }, {
            data: [2, 3, 3, 3, 2],
            name: '故障',
            type: 'line'
        }]}

const sysradData = [{
    statusName: '未开始',
    count: 10
}, {
    statusName: '待处理',
    count: 4
}, {
    statusName: '已完成',
    count: 1
}]
// 日困人故障率数据
const rkrgzlData = {
    value: [0.23, 0.12, 0.13, 0.24, 0.34, 0.33, 0.25,0.34, 0.14, 0.13, 0.15, 0.23, 0.13, 0.24, 0.23, 0.09, 0.10, 0.11, 0.05, 0, 0.11, 0.12, 0, 0, 0.03, 0.13, 0.12, 0.04, 0],
    label:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
}
// 故障率分析数据
const gzlfxData = {
    chart1:[{
        name:'1-5年',
        value:'3'
    }, {
        name: '5-10年',
        value: '5'
    }, {
        name: '大于10年',
        value: '9'
    }],
      chart2: [{
          name: '品牌1',
          value: '4'
      }, {
          name: '品牌2',
          value: '2'
      }, {
          name: '品牌3',
          value: '4'
      }], 

}
export {pieData,lineData,barData,radData,sysBarData,syslineData,sysradData,rkrgzlData,gzlfxData}
