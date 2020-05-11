<template>
  <el-dialog
    :title="!this.dataForm.userId ? '新增' : '修改'"
    :close-on-click-modal="false" :fullscreen="true" :modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="95px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model.trim="dataForm.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model.trim="dataForm.mobile" placeholder="手机"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model.trim="dataForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model.trim="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
      <el-form-item label="地区" prop="area">
        <el-select
          v-model.trim="sheng"
          @change="choseProvince"
          placeholder="省级地区">
          <el-option
            v-for="item in province"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select
          v-model.trim="shi"
          @change="choseCity"
          placeholder="市级地区">
          <el-option
            v-for="item in shi1"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>
        <el-select
          v-model.trim="qu"
          @change="choseBlock"
          placeholder="区级地区">
          <el-option
            v-for="item in qu1"
            :key="item.id"
            :label="item.value"
            :value="item.id">
          </el-option>
        </el-select>    
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      //表单验证,邮箱，手机，固话等只需改动下面正则表达式 reg 即可实现自定义验证（在dataRule中引用此方法）
      // var checkPhone = (rule, value, callback) => {
	  //    if (!value) {
	  //       return callback(new Error('手机号不能为空'));
	  //    } else {
	  //       const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
	  //       if (reg.test(value)) {
	  //         callback();
	  //       } else {
	  //         return callback(new Error('请输入正确的手机号'));
	  //       }
	  //     }
	  //  }; 
      return {
        mapJson:{"110000":"北京市","110100":"北京市","110101":"东城区","110102":"西城区","110105":"朝阳区","120000":"天津市","120100":"天津市","120101":"和平区","120102":"河东区","120103":"河西区","120104":"南开区","120105":"河北区","120106":"红桥区","120110":"东丽区","120111":"西青区","120112":"津南区","120113":"北辰区","120114":"武清区","120115":"宝坻区","120116":"滨海新区","120117":"宁河区","120118":"静海区","120119":"蓟州区","130000":"河北省","130100":"石家庄市","130102":"长安区","130104":"桥西区","130105":"新华区","130107":"井陉矿区","130108":"裕华区","130109":"藁城区","130110":"鹿泉区","130111":"栾城区","130121":"井陉县","130123":"正定县","130125":"行唐县","130126":"灵寿县","130127":"高邑县","130128":"深泽县","130129":"赞皇县","130130":"无极县","130131":"平山县","130132":"元氏县","130133":"赵县","130181":"辛集市","130183":"晋州市","130184":"新乐市","130200":"唐山市","130202":"路南区","130203":"路北区","130204":"古冶区"},
        province:'',
        sheng: '',
        shi: '',
        shi1: [],
        qu: '',
        qu1: [],
        city:'',
        block:'',
        chinaName_sheng:'',
        chinaName_shi:'',
        chinaName_qu:'',    
        visible: false,
        dataForm: {
          username: '',          mobile: '',          password: '',          createTime: '',          area: ''        },
        dataRule: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          //{validator: checkPhone, trigger: 'blur'}
          ],          mobile: [
            { required: true, message: '手机不能为空', trigger: 'blur' }
          //{validator: checkPhone, trigger: 'blur'}
          ],          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          //{validator: checkPhone, trigger: 'blur'}
          ],          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          //{validator: checkPhone, trigger: 'blur'}
          ],          area: [
          //  { required: true, message: '地区不能为空', trigger: 'blur' }
          //{validator: checkPhone, trigger: 'blur'}
          ]        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.userId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.userId) {
            this.$http({
              url: this.$http.adornUrl(`//user/info/${this.dataForm.userId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.username = data.user.username
                this.dataForm.mobile = data.user.mobile
                this.dataForm.password = data.user.password
                this.dataForm.createTime = data.user.createTime
                this.dataForm.area = data.user.area
              }
            })
          }
        })
      },
      
      getCityData:function(){
        var that = this
       /* axios.get(this.mapJson).then(function(response){
          if (response.status==200) {*/
            var data = this.mapJson
            that.province = []
            that.city = []
            that.block = []
            // 省市区数据分类
            for (var item in data) {
              if (item.match(/0000$/)) {//省
                that.province.push({id: item, value: data[item], children: []})
              } else if (item.match(/00$/)) {//市
                that.city.push({id: item, value: data[item], children: []})
              } else {//区
                that.block.push({id: item, value: data[item]})
              }
            }
            // 分类市级
            for (var index in that.province) {
              for (var index1 in that.city) {
                if (that.province[index].id.slice(0, 2) === that.city[index1].id.slice(0, 2)) {
                  that.province[index].children.push(that.city[index1])
                }
              }
            }
            // 分类区级
            for(var item1 in that.city) {
              for(var item2 in that.block) {
                if (that.block[item2].id.slice(0, 4) === that.city[item1].id.slice(0, 4)) {
                  that.city[item1].children.push(that.block[item2])
                }
              }
            }
         /* }
          else{
            console.log(response.status)
          }
        }).catch(function(error){console.log(typeof+ error)})*/
      },
      // 选省
      choseProvince:function(e) {
        for (var index2 in this.province) {
          if (e === this.province[index2].id) {
            this.shi1 = this.province[index2].children
            this.shi = this.province[index2].children[0].value
            this.qu1 =this.province[index2].children[0].children
            this.qu = this.province[index2].children[0].children[0].value
            this.E = this.qu1[0].id,
            this.chinaName_sheng=this.province[index2].value  //省中文名
          }
        }
      },
      // 选市
      choseCity:function(e) {
        for (var index3 in this.city) {
          if (e === this.city[index3].id) {
            this.qu1 = this.city[index3].children
            this.qu = this.city[index3].children[0].value
            this.E = this.qu1[0].id
            this.chinaName_shi=this.city[index3].value  //市中文名
          }
        }
      },
      // 选区
      choseBlock:function(e) {
        this.E=e;
        for(var index4 in this.block){
        	if (e === this.block[index4].id) {
        		this.chinaName_qu=this.block[index4].value  //区中文名
        	}
        }
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/testModule/user/${!this.dataForm.userId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'username': this.dataForm.username,
                'mobile': this.dataForm.mobile,
                'password': this.dataForm.password,
                'createTime': this.dataForm.createTime,
                'area': this.chinaName_sheng+this.chinaName_shi+this.chinaName_qu
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    },
   created:function(){
         this.getCityData()
      } 
  }
</script>
