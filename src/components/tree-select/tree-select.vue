<template>
    <div class="select-container nowrap">
        <div class="inline-block item" :class="{'require': requireState}">
            <div class="flex-container">
                <span class="selectTitle">所属区域：</span>
                <el-select size="small"
                           filterable
                           class="select-item"
                           @focus="getDistrictList('district')"
                           @change="returnParams('district')"
                           v-model.trim="district"
                           placeholder="请选择区域">
                    <el-option
                            v-for="(item,index) in list"
                            :key="index"
                            :label="item.label"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
        </div><div class="inline-block item" :class="{'require': requireState}">
            <div class="flex-container">
                <span class="selectTitle">所属街道：</span>
                <el-select size="small"
                           filterable
                           class="select-item"
                           @focus="getDistrictList('street')"
                           @change="returnParams('street')"
                           v-model.trim="street"
                           placeholder="请选择街道">
                    <el-option
                            v-for="(item,key) in streetList"
                            :key="key"
                            :label="item.label"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
        </div><div class="inline-block item" :class="{'require': requireState}">
            <div class="flex-container">
                <span class="selectTitle">所属社区：</span>
                <el-select size="small"
                           filterable
                           class="select-item"
                           @focus="getDistrictList('community')"
                           @change="returnParams('community')"
                           v-model.trim="community"
                           placeholder="请选择社区">
                    <el-option
                            v-for="(item,eq) in communityList"
                            :key="eq"
                            :label="item.label"
                            :value="item">
                    </el-option>
                </el-select>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tree-select',
        data () {
            return {
                requireState: false,
                list: [], // 区域list
                streetList: [], // 街道list
                communityList: [], // 社区list
                district: {},
                street: {},
                community: {}
            }
        },
        watch: {
            'option': function (n, o) {
                this.init()
            }
        },
        mounted () {
            console.log(this.option)
            if (!this.option.require) {
                this.requireState = false
            } else {
                this.requireState = true
            }
        },
        methods: {
            // 返回参数
            returnParams (type) {
                // 返回的格式
                /*
                *   district: { label: name, value: id }
                * */
                this.initData(type)
                let params = {}
                params.district = this.district
                params.street = this.street
                params.community = this.community
                this.$emit('getTreeData', params)
            },
            initData (type) {
                if (type === 'district') {
                    this.street = {}
                    this.community = {}
                    this.streetList = []
                    this.communityList = []
                }
                if (type === 'street') {
                    this.community = {}
                    this.communityList = []
                }
            },
            init () {
                // 判断是否需要赋初始值
                if (this.deepInit) {
                    this.district = {}
                    this.street = {}
                    this.community = {}
                    this.list = []
                    this.streetList = []
                    this.communityList = []
                    return
                }
                if (this.option.district && this.option.district.value) {
                    this.district = this.option.district
                    this.getDistrictList('district')
                } else {
                    this.list = []
                }
                if (this.option.street && this.option.street.value) {
                    this.street = this.option.street
                    this.getDistrictList('street')
                } else {
                    this.streetList = []
                }
                if (this.option.community && this.option.community.value) {
                    this.community = this.option.community
                    this.getDistrictList('community')
                } else {
                    this.communityList = []
                }
            },
            getDistrictList (type) {
                let code = null
                let parentCode = null
                if (type === 'street') {
                    code = this.district.value
                }
                if (type === 'community') {
                    code = this.street.value
                    parentCode = this.district.value
                }
                this.getList(type, code, parentCode).then(res => {
                    switch (type) {
                    case 'district':
                        this.list = res
                        break
                    case 'street': this.streetList = res; break
                    case 'community': this.communityList = res; break
                    }
                })
            },
            // 获取树状数据
            getList (type, code = null, parentCode = null) {
                return new Promise(resolve => {
                    this.$http({
                        url: this.$http.adornUrl('/community/communityinfo/threeChange'),
                        method: 'get',
                        params: this.$http.adornParams({
                            param: type,
                            code: code,
                            parentCode: parentCode
                        })
                    }).then(({ data }) => {
                        if (data && data.code === 0) {
                            let list = data.page
                            if (list instanceof Array) {
                                let arr = []
                                list.forEach((item, index) => {
                                    if (index === 0) {
                                        arr.push({
                                            label: '请选择',
                                            value: null
                                        })
                                    }
                                    arr.push({
                                        label: item.areaname,
                                        value: item[type === 'community' ? 'id' : type]
                                    })
                                })
                                resolve(arr)
                            }
                        }
                    })
                })
            }
        },
        props: ['option', 'deepInit']
    }
</script>

<style scoped lang="scss">
    .select-container {
        display: inline-block;
        margin-bottom: 10px;
        margin-right: 10px;
        .item {
            width: 33.3%;
            padding-right: 10px;
            &.require {
                position: relative;
                &:after {
                    content: '*';
                    color: red;
                    position: absolute;
                    top: 13px;
                    left: -6px;
                }
            }
            .flex-container {
                display: flex;
                flex-direction: row;
                .selectTitle {
                    display: inline-block;
                    width: 1rem;
                    text-align: right;
                }
                .select-item {
                    flex: 1;
                    margin-left: 15px;
                }
            }
        }
        .select-item {
            input {
                width: 1.5rem;
            }
        }
        .selectTitle {
            display: inline-block;
            width: 82px;
            height: 40px;
            line-height: 40px;
        }
    }
</style>