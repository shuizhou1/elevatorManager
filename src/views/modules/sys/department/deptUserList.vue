<template>
	<el-dialog :modal="false"
    title="查看部门员工"
    :close-on-click-modal="false" :fullscreen="true"
    :visible.sync="visible">
	<div class="mod-menu" :style="{ 'min-height': documentClientHeight - 250 + 'px'}" style="border: 1px solid #eee">
		<el-container style="">
			    <el-header style="">
			    	<div style="margin-left: 10px;margin-top: 10px;">
			    		<e-button ref="eproButton1"v-on:handleClick="handleClick":parentId="'56'":busType="'save'"></e-button>
                   </div>
			     <!-- <el-button v-if="isAuth( 'sys:user:save')"type="primary"plain @click="selectUser()"style="margin-left: 10px;margin-top: 10px;">新增人员</el-button>
			       <el-button v-if="isAuth( 'sys:user:update')"type="info"plain @click="addOrUpdateHandle()"style="margin-left: 10px;margin-top: 10px;">修改人员</el-button>
			       <el-button v-if="isAuth( 'sys:user:delete')"type="success"plain @click="deleteUser()"style="margin-left: 10px;margin-top: 10px;">删除人员</el-button> -->
		    </el-header>
			    <el-main>
			    	<consumer ref="transEvent"></consumer>
			    </el-main>
	    </el-container>
		    
    	<!-- 弹窗, 新增 / 修改 -->
    	<selectUser v-if="selectUserVisible" ref="selectUser" @refreshDataList="refresh"></selectUser>
    </div>
    </el-dialog>
</template>

<script>
  import SelectUser from '../department/selectUser-add-or-update'
  import Consumer from '../department/consumer'
  export default {
    data () {
      return {
      	depId:'',
      	parentId:'',
        dataForm: {},
        dataList: [],
        dataListLoading: false,
        addOrUpdateVisible: false,
        selectUserVisible:false,
        visible:false,
        depId:''
      }
    },
    components: {
      Consumer,
      SelectUser
    },
    computed: {
      documentClientHeight: {
        get () { return this.$store.state.common.documentClientHeight },
        set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
      }
    },
    activated () {
      //this.getDataList()
    },
    methods: {
    	init(depId){
    		this.depId = depId
    		this.visible = true
    		this.$nextTick(() => {
	          this.$refs.transEvent.getDepUser(depId)
	       })
    	},
    	handleClick(method,param) {
				if(param === 'undefined') {
					this.$options.methods[method].bind(this)();
				} else {
					this.$options.methods[method].bind(this, param)();
				}
		},
      tableRowClassName({row, rowIndex}) {
        if (this.depId == row.depId) {
          return 'warning-row';
        }
        return '';
      },
      handdle (row,event,column){
      	/*if(row.parentId == '0'){
      		return false;
      	}else{*/
      		this.parentId = row.parentId;
      		this.depId = row.depId;
      		this.$refs.transEvent.getDepUser(row.depId)
      	//}
      },
      refresh (){
      	this.$nextTick(() => {
          this.$refs.transEvent.getDepUser(this.depId)
        })
      },
      //选择机构用户
      selectUser (){
      	this.selectUserVisible = true;
      	this.$nextTick(() => {
          this.$refs.selectUser.init(this.depId)
        })
      },
      // 删除
      deleteHandle (id) {
        this.$confirm(`确定对[id=${id}]进行[删除]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl(`/sys/department/delete/${id}`),
            method: 'post',
            data: this.$http.adornData()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      },
      
      //删除用户
      deleteUser (){
      	var userIds = this.$refs.transEvent.sengUserId();
      	if(userIds=='' || userIds ==undefined){
      		this.$message({
                message: '请选择至少一条记录',
                type: 'error',
                duration: 1500,
                onClose: () => {
                }
              })
      		return false;
      	}
        this.$confirm(`您确定删除操作吗?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/sys/department/deleteUsers'),
            method: 'post',
            params: this.$http.adornParams({
            	'userIds': userIds,
                'depId':this.depId
            })
          }).then(({data}) => {
            if (data && data.code == '0') {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.$refs.transEvent.getDepUser(this.depId)
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }).catch(() => {})
      }
    }
  }
</script>
<style>
	.el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>