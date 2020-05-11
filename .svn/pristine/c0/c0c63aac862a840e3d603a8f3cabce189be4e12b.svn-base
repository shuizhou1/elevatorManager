<template>
  <el-dialog
    :title="!this.dataForm.cid ? '新增' : '修改'"
    :close-on-click-modal="false" :fullscreen="true" :modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="95px">
    <el-form-item label="类型代码" prop="typecode">
      <el-input v-model.trim="dataForm.typecode" placeholder="类型代码"></el-input>
    </el-form-item>
    <el-form-item label="类型名称" prop="typename">
      <el-input v-model.trim="dataForm.typename" placeholder="类型名称"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    	    	<e-button ref="eproButton1" v-on:handleClick="handleClick" :parentId="'61'" :busType="'editsave'"></e-button>
 <!--     <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>-->
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          cid: '',          parentid: '',          seqno: '',          typecode: '',          typename: ''        },
        dataRule: {
          typecode: [
            { required: true, message: '类型代码不能为空', trigger: 'blur' }
          ],          typename: [
            { required: true, message: '类型名称不能为空', trigger: 'blur' }
          ]        }
      }
    },
    methods: {
    	handleClick(method,param) {
				if(param === 'undefined') {
					this.$options.methods[method].bind(this)();
				} else {
					this.$options.methods[method].bind(this, param)();
				}
	  	},
			cancel() {
				this.visible = false;
			},
      init (id) {
        this.dataForm.cid = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.cid) {
            this.$http({
              url: this.$http.adornUrl(`/dictionary/dicttype/info/${this.dataForm.cid}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.cid = data.dicttype.cid
                this.dataForm.parentid = data.dicttype.parentid
                this.dataForm.seqno = data.dicttype.seqno
                this.dataForm.typecode = data.dicttype.typecode
                this.dataForm.typename = data.dicttype.typename
              }
            })
          }
        })
      },
      
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/dictionary/dicttype/${!this.dataForm.cid ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'cid': this.dataForm.cid || undefined,
                'parentid': this.dataForm.parentid,
                'seqno': this.dataForm.seqno,
                'typecode': this.dataForm.typecode,
                'typename': this.dataForm.typename
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '保存成功',
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
  }
</script>
