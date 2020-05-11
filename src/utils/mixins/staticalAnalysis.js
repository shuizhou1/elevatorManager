import selectElevator from "@/components/select-single-elevator.vue";
import selectMonth from "@/components/selectMonth.vue"
import popover from '@/components/popover.vue';
export default {

    data() {
        return {
             pickerOptions: {
                 shortcuts: [{
                     text: '本月',
                     onClick(picker) {
                         picker.$emit('pick', [new Date(), new Date()]);
                     }
                 }, {
                     text: '今年至今',
                     onClick(picker) {
                         const end = new Date();
                         const start = new Date(new Date().getFullYear(), 0);
                         picker.$emit('pick', [start, end]);
                     }
                 }, {
                     text: '最近六个月',
                     onClick(picker) {
                         const end = new Date();
                         const start = new Date();
                         start.setMonth(start.getMonth() - 6);
                         picker.$emit('pick', [start, end]);
                     }
                 }],
                 disabledDate(date){
                     const time = date.getTime();
                     const year = date.getFullYear();
                     const month = date.getMonth();
                     const toyear = new Date().getFullYear();
                     const tomonth = new Date().getMonth();
                     return (toyear - year > 10)||(toyear-year<-10)
                 }
             },
            areaData: [],
            areaValue: []
        }
    },
    components: {
        selectElevator,
        selectMonth,
        popover
    },
    created() {
        this.getAreaData();
    },
    methods: {
        getAreaData() {
            this.$http({
                    url: this.$http.adornUrl("/district/district/alllist"),
                    method: "get",
                    params: this.$http.adornParams(this.formData)
                })
                .then(({
                    data
                }) => {
                    if (data && data.code == 0) {
                        console.log("地区数据", data.list);
                        let areaData = [];
                        data.list.forEach(item => {
                            let city = [];
                            item.sonLevel.forEach(value => {
                                let area = [];
                                value.sonLevel.forEach(lump => {
                                    area.push({
                                        value: lump.id,
                                        label: lump.districtName
                                    });
                                });
                                city.push({
                                    value: value.id,
                                    label: value.districtName,
                                    children: area
                                });
                            });
                            areaData.push({
                                value: item.id,
                                label: item.districtName,
                                children: city
                            });
                        });
                        this.areaData = areaData;
                        console.log("地区data", areaData);
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        },
        handleAreaChange(arr) {
            console.log('地区改变', arr)
            if (arr && arr.length) {
                this.formData.province = arr[0];
                this.formData.city = arr[1] ? arr[1] : '';
                this.formData.district = arr[2] ? arr[2] : '';
                // console.log('obj', obj)
                console.log('formData', this.formData)
            } else {
                this.formData.province = ''
                this.formData.city = ''
                this.formData.district = '';
            }
        },
        dateChange(e) {
            console.log('日期改变', e)
            if (e) {
                if (e.constructor == Array) {
                    let startDate = e[0];
                    let endDate = e[1];
                    let startMonth = startDate.split('-')[1];
                    let endMonth = endDate.split('-')[1];
                    this.formData.startTime = startDate + '-1'
                    this.formData.years = endDate.split('-')[0];
                    this.formData.months = endMonth;
                    let keys = Object.keys(this.formData);
                    console.log('formDatakeys', keys);
                    console.log(' startDate[5]', startDate[5]);
                    console.log(' startDate[5]!=endDate[5]', startMonth != endMonth);
                    if (keys.indexOf('groupingRules') > -1) {
                        console.log(90)
                        if (startMonth != endMonth) {
                            console.log(91)

                            this.formData.groupingRules = 2;
                        } else {
                            this.formData.groupingRules = 1;
                        }
                    }
                }else {
                    // 字符串
                    this.formData.startTime = e + '-1-1';
                    this.formData.years = e;
                }

            } else {
                this.formData.years = '';
                this.formData.months = '';
                this.formData.startTime = null;
                let keys = Object.keys(this.formData);
                if (keys.indexOf('groupingRules') > -1) {
                    this.formData.groupingRules = 1;
                }

            }
        },
        formatDate(date) {
            return date.substring(0, 10)
        },
        selectElevator() {
            this.showElevatorselectDialog = true;
            this.$nextTick(() => {
                this.$refs.elevatorSelector.init();
            });
        },
        selectElevatorConfirm(val) {
            console.log("确认选择", val);
            this.formData.regCode = val.regcode;
            console.log(this.formData);
        }
    }
}
