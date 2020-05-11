<template>
	<div class="mod-menu" :style="{ 'min-height': documentClientHeight - 150 + 'px'}" style="border: 1px solid #eee">
		<el-form :inline="true":model="dataForm">
			<el-form-item>
				<div style="margin-left: 10px;margin-top: 10px;">
					<!--<e-button ref="eproButton" v-on:handleClick="handleClick" :parentId="'56'" :busType="'query'" :params="'0,add'"></e-button>-->
					<el-button v-if="isAuth('sys:user:save')" type="add" @click="addOrUpdateHandle('0,add')"style="margin-left: 10px;margin-top: 10px;">新增机构</el-button>
					<el-button type="primary" @click="getDeptUserList()" style="margin-left: 10px;margin-top: 10px;">查看部门员工</el-button>
				</div>
			</el-form-item>
		</el-form>
		<el-table :data="dataList" @row-click="handdle" :row-class-name="tableRowClassName" border style="width: 100%;">
			<table-tree-column prop="name" header-align="center" treeKey="depId" width="150" label="名称">
			</table-tree-column>		
			<el-table-column prop="parentName" header-align="center" align="center" width="120" label="上级部门">
			</el-table-column>
			<el-table-column prop="code" header-align="center" align="center" label="部门编码">
			</el-table-column>		
			<el-table-column prop="dzbm" header-align="center" align="center"label="所在地点">
			</el-table-column>	
			<el-table-column prop="bmzz" header-align="center" align="center" label="部门资质">
			</el-table-column>	
			<el-table-column prop="dwlx" header-align="center" align="center" label="单位类型">
			</el-table-column>    
		    <el-table-column prop="fzr" header-align="center" align="center" label="负责人">
		    </el-table-column>
		      
		    <el-table-column prop="orderNum" header-align="center" align="center" label="排序号">
		    </el-table-column>
		      
		    <el-table-column fixed="right" header-align="center" align="center" width="150" label="操作">
		        <template slot-scope="scope">
		          <e-button ref="eproButton1" v-on:handleClick="handleClick" :parentId="'56'" :busType="'edit'" :params="scope.row.depId+''"></e-button>
		          <e-button ref="eproButton1" v-on:handleClick="handleClick" :parentId="'56'" :busType="'edit1'" :params="scope.row.depId+',add'"></e-button>
				  <!--<el-button v-if="isAuth( 'sys:user:update')"type="text"size="small"@click="addOrUpdateHandle(scope.row.depId, 'add')">增加下级部门</el-button>
		          <el-button v-if="isAuth( 'sys:user:update')"type="text"size="small"@click="addOrUpdateHandle(scope.row.depId)">修改</el-button>
		          <el-button v-if="isAuth( 'sys:user:delete')"type="text"size="small"@click="deleteHandle(scope.row.depId)">删除</el-button>-->
		        </template>
		    </el-table-column>
		</el-table>
		    
    	<!-- 弹窗, 新增 / 修改 -->
    	<add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    	<deptUserList v-if="deptUserListVisible" ref="deptUserList" @refreshDataList=""></deptUserList>
    	<!--<selectUser v-if="selectUserVisible"ref="selectUser"@refreshDataList="refresh"></selectUser>-->
    </div>
</template>

<script>
  import TableTreeColumn from '@/components/table-tree-column'
  import AddOrUpdate from '../department/department-add-or-update'
  import DeptUserList from '../department/deptUserList'
  //import SelectUser from '../department/selectUser-add-or-update'
  import { treeDataTranslate } from '@/utils'
  //import Consumer from '../department/consumer'
  export default {
    data () {
      return {
      	depId:'',
      	parentId:'',
        dataForm: {},
        dataList: [],
        dataListLoading: false,
        addOrUpdateVisible: false,
        deptUserListVisible: false,
        selectUserVisible:false
      }
    },
    components: {
      TableTreeColumn,
      AddOrUpdate,
      DeptUserList
      //Consumer,
      //SelectUser
    },
    computed: {
      documentClientHeight: {
        get () { return this.$store.state.common.documentClientHeight },
        set (val) { this.$store.commit('common/updateDocumentClientHeight', val) }
      }
    },
    activated () {
      this.getDataList()
    },
    methods: {
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
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/department/list'),
          method: 'get',
          params: this.$http.adornParams()
        }).then(({data}) => {
          this.dataList = treeDataTranslate(data, 'depId')
          this.dataListLoading = false
        })
      },
      // 新增 / 修改
      addOrUpdateHandle (ids) {
      	var type = '';
      	var id = ids;
      	if(ids.indexOf(',') !== -1){
      		id = ids.split(',')[0];
      		type = ids.split(',')[1];
      	}
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id,type)
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
      
      handdle (row,event,column){
      	/*if(row.parentId == '0'){
      		return false;
      	}else{*/
      		this.parentId = row.parentId;
      		this.depId = row.depId;
      		//this.$refs.transEvent.getDepUser(row.depId)
      	//}
      },
      getDeptUserList(){
      	if(this.parentId == '0' || this.parentId == ''){
      		 this.$message({
             message: '请选择机构下属部门',
             type: 'warning'
            });
      		return false;
      	}
      	this.deptUserListVisible = true
      	this.$nextTick(() => {
          this.$refs.deptUserList.init(this.depId)
        })
      },
      refresh (){
      	this.$refs.transEvent.getDepUser(this.depId)
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