<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '新增'"
    :close-on-click-modal="false" :fullscreen="true" :modal="false"
    :visible.sync="visible">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model.trim="dataForm.userName" placeholder="用户名" clearable></el-input>
      </el-form-item>
      <el-form-item>
      			<e-button ref="eproButton" v-on:handleClick="handleClick" :parentId="'56'" :busType="'query1'" ></e-button>
<!--        <el-button @click="getDataList()">查询</el-button>
-->      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        >
      </el-table-column>
      <!--<el-table-column
        prop="user_id"
        header-align="center"
        align="center"
        label="ID">
      </el-table-column>-->
      <el-table-column
        prop="username"
        header-align="center"
        align="center"
        label="用户名">
      </el-table-column>
      <el-table-column
        prop="email"
        header-align="center"
        align="center"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        header-align="center"
        align="center"
        label="手机号">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 0" size="small" type="danger">禁用</el-tag>
          <el-tag v-else size="small">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <span slot="footer" class="dialog-footer">
    	    	<e-button ref="eproButton1" v-on:handleClick="handleClick" :parentId="'56'" :busType="'editsave'"></e-button>
<!--      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>-->
    </span>
  </el-dialog>
</template>

<script>
  import { treeDataTranslate } from '@/utils'
  export default {
    data () {
      return {
      	depId:'',
        visible: false,
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        menuList: [],
        dataListSelections: [],
        menuListTreeProps: {
          label: 'name',
          children: 'children'
        },
        dataForm: {
          id: 0,
          roleName: '',
          remark: ''
        },
        dataRule: {
          roleName: [
            { required: true, message: '角色名称不能为空', trigger: 'blur' }
          ]
        },
        tempKey: -666666 // 临时key, 用于解决tree半选中状态项不能传给后台接口问题. # 待优化
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
    	cancel() {
				this.visible = false;
			},
      init (id) {
      	this.visible = true
      	this.depId = id; //
        this.dataForm.id = id || 0
        this.getDataList();
      },
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/sys/department/selectUserList'),
          method: 'post',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'username': this.dataForm.userName,
            'depId':this.depId
          })
        }).then(({data}) => {
          if (data && data.code == '0') {
            this.dataList = data.page.records
            this.totalPage = data.page.total
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 表单提交
      dataFormSubmit () {
      	var userIds = new Array;
      	for(var i=0;i<this.dataListSelections.length;i++){
      		userIds.push(this.dataListSelections[i].userId);
      	}
        this.$http({
          url: this.$http.adornUrl('/sys/department/saveDepUser'),
          method: 'get',
          params: this.$http.adornParams({
            'depId': this.depId,
            'userIds': userIds.join(",")
          })
        }).then(({data}) => {
          if (data && data.code == '0') {
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
    }
  }
</script>
