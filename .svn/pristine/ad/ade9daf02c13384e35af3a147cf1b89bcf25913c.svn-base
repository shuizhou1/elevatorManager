<template>
    <el-dialog
            :title="!dataForm.id ? '生成代码' : '生成代码'"
            :close-on-click-modal="false" :fullscreen="true" :modal="false"
            :visible.sync="visible">
        <div style="color:red;">
            说明：建表时表名要有注释，用于菜单名。表字段要有注释，用于列表头名称及新增/修改页名称。字段要规范，最好是"_"命名(如：t_id,程序会帮你自动转为tId)。项目路径是本地后台项目的路径，生成页面路径是本地前端项目的路径。
        </div>
        <el-form :model="dataForm" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="110px" inline>
            <span class="span_class">通用参数</span>
            <el-form-item label="包名" prop="packageName">
                <el-input v-model.trim="dataForm.packageName" placeholder="包名"></el-input>
            </el-form-item>
            <el-form-item label="模块名称" prop="moduleName">
                <el-input v-model.trim="dataForm.moduleName" placeholder="模块名称"></el-input>
            </el-form-item>
            <el-form-item label="表名" prop="tableName">
                <el-input v-model.trim="dataForm.tableName" placeholder="表名" readonly></el-input>
            </el-form-item>
            <br/>
            <el-form-item label="项目路径" prop="projectPath">
                <el-input v-model.trim="dataForm.projectPath" placeholder="项目名称"></el-input>
            </el-form-item>
            <el-form-item label="生成页面路径" prop="webRoot">
                <el-input v-model.trim="dataForm.webRoot" placeholder="页面路径"></el-input>
            </el-form-item>
            <span class="span_class">生成文件</span>
            <el-form-item label="" size="mini" prop="" class="ck">
                <el-checkbox-group v-model.trim="dataForm.actionList">
                    <el-checkbox v-for="a in actionList" :key="a.id" :label="a.id" :checked="true">{{a.name}}
                    </el-checkbox>
                </el-checkbox-group>
            </el-form-item>
            <span class="span_class">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        listPage参数(列表)<span style="float:right"></span></span>
            <el-form-item label="生成列数" prop="generateRow">
                <el-input v-model.trim="fieldCount" placeholder="生成列数"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="del(1)">删除生成列数</el-button>
            </el-form-item>
            <el-form-item><span style="color: red;">不填默认生成所有列</span></el-form-item>

            <div v-for="(k,v) in filedR" :key="v" prop="" class="ck">
                <el-form-item>
                    <el-select v-model.trim="filedR[v].value1" style="width:200px">
                        <el-option
                                v-for="item in filedROptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="列表头名称" name="field1"></el-input>
                </el-form-item>
            </div>

            <span class="span_class">appendPage参数(新增/修改页)</span>
            <el-form-item label="生成列数" prop="generateRow">
                <el-input v-model.trim="appendFieldCount" placeholder="生成列数"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="del(2)">删除生成列数</el-button>
            </el-form-item>
            <el-form-item><span style="color: red;">不填默认生成所有列</span></el-form-item>
            <div v-for="(k,v) in filedR2" :key="v" prop="" class="ck">
                <el-form-item>
                    <el-select v-model.trim="filedR2[v].value1" style="width:200px">
                        <el-option
                                v-for="item in filedROptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="新增/修改页面展示名称" name="field2"></el-input>
                </el-form-item>
                <el-form-item>

                    <el-select v-model.trim="filedR3[v].value1" style="width:200px">
                        <el-option
                                v-for="item in filedROptions2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select v-model.trim="filedR4[v].value1" style="width:200px">
                        <el-option
                                v-for="item in filedROptions3"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">{{item.label}}
                        </el-option>
                    </el-select>
                </el-form-item>
            </div>

            <span class="span_class">条件查询参数<span style="float:right"></span></span>
            <el-form-item label="生成列数" prop="generateRow">
                <el-input v-model.trim="tiaojianCount" placeholder="生成列数"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="del(3)">删除生成列数</el-button>
            </el-form-item>
            <el-form-item><span style="color: red;">条件查询参数至少生成一列</span></el-form-item>
            <div v-for="(k,v) in filedR5" :key="v" prop="" class="ck">
                <el-form-item>
                    <el-select v-model.trim="filedR5[v].value1" style="width:200px">
                        <el-option
                                v-for="item in filedROptions"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="条件查询时展示名称" name="field3"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
    	   <e-button ref="eproButton1" v-on:handleClick="handleClick" :parentId="'36'" :busType="'editsave'"></e-button>
            <!--      <el-button @click="visible = false">取消</el-button>
                  <el-button type="primary" @click="dataFormSubmit()">确定</el-button> -->
    </span>
    </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        filedR: [],
        filedR2: [],
        filedR3: [],
        filedR4: [],
        filedR5: [],
        filedROptions: [],
        filedROptions2: [
          {
            "label": "修改时是否可编辑",
            "value": "0"
          },
          {
            "label": "否",
            "value": "0"
          },
          {
            "label": "是",
            "value": "1"
          }
        ],
        filedROptions3: [
          {
            "label": "验证规则",
            "value": "-1"
          },
          {
            "label": "非空验证",
            "value": "0"
          },
          {
            "label": "邮箱验证",
            "value": "1"
          },
          {
            "label": "手机验证",
            "value": "2"
          },
          {
            "label": "固话验证",
            "value": "3"
          },
          {
            "label": "身份证验证",
            "value": "4"
          }
        ],
        visible: false,
        fieldCount: 0,//生成列表行数(填的数字)
        appendFieldCount: 0, //生成编辑页面行数(填的数字)
        tiaojianCount: 0,//条件查询行数(填的数字)
        actionList: [{ id: '0', name: '生成vue列表页面' }, { id: '1', name: '生成vue新增/编辑页面' },
          { id: '2', name: '生成实体类' }, { id: '3', name: '生成Dao文件' }, { id: '4', name: '生成Dao.xml文件' },
          { id: '5', name: '生成Service文件' }, { id: '6', name: '生成ServiceImpl文件' }, { id: '7', name: '生成Controller文件' },
          { id: '8', name: '生成菜单' }, { id: '9', name: '生成布局模板页' }],
        addField: [],//生成列表行数
        appendField: [],//生成编辑页面行数
        tiaojianField: [], // 条件列
        dataForm: {
          actionList: [],
          listPageList: [],
          packageName: 'cn.com.epro',
          moduleName: '',
          tableName: '',
          tableNameArry: [],
          //pkId:'',
          ControllerNamespace: '',
          field1: [],   //列表字段名
          attr1: [],    //列表属性
          field2: [],   //增加，修改页面字段名
          attr2: [],     //增加，修改页面属性名
          field3: [],   //条件查询页面字段名
          attr3: [],     //条件查询页面属性名
          isEdit: [],   //是否可编辑
          validSel: [], //验证规则
          projectPath: '',
          webRoot: ''
        }
      }
    },
    watch: {
      fieldCount: function getData() {
        this.filedR = []
        this.getTableDetail();
        let len = this.fieldCount;
        for (let i = 0; i < len; i++) {
          var item = { value1: '' };
          this.filedR.push(item);
        }
      },
      appendFieldCount: function getData2() {
        this.filedR2 = []
        this.getTableDetail();
        let len = this.appendFieldCount;
        for (let i = 0; i < len; i++) {
          var item = { value1: '' }
          var item2 = { value1: '' };
          var item3 = { value1: '' };
          this.filedR2.push(item);
          this.filedR3.push(item2);
          this.filedR4.push(item3);
        }
      },
      tiaojianCount: function getData3() {
        this.filedR5 = []
        this.getTableDetail();
        let len = this.tiaojianCount;
        for (let i = 0; i < len; i++) {
          var item = { value1: '' };
          this.filedR5.push(item);
        }
      }
    },
    methods: {
      cancel() {
        this.visible = false;
      },
      handleClick(method, param) {
        if (param === 'undefined') {
          this.$options.methods[method].bind(this)();
        } else {
          this.$options.methods[method].bind(this, param)();
        }
      },
      init(id, tableName) {
        this.dataForm.id = id || 0
        this.dataForm.tableName = tableName
        this.visible = true
        this.$nextTick(() => {
          //this.$refs['dataForm'].resetFields();
          this.addField = [];
          this.appendField = [];
          this.tiaojianField = [];
          this.fieldCount = 0;
          this.appendFieldCount = 0;
          this.tianjianCount = 0;
          this.dataForm.tableNameArry = [];
          this.dataForm.field1 = [],
            this.dataForm.attr1 = [],
            this.dataForm.field2 = [],
            this.dataForm.attr2 = [],
            this.dataForm.field3 = [],
            this.dataForm.attr3 = [],
            this.dataForm.isEdit = [],
            this.dataForm.validSel = []
        })
      },
      getTableDetail() {
        this.$http({
          url: this.$http.adornUrl('/sys/generator/getTableDetail'),
          method: 'post',
          params: this.$http.adornParams({
            'tableName': this.dataForm.tableName
          }),
        }).then(({ data }) => {
          this.filedROptions = []
          if (data && data.code === 0) {
            for (var i = 0; i < data.list.length; i++) {
              var item = {};
              item.label = data.list[i].columnName + "  (" + data.list[i].columnComment + ")";
              item.value = data.list[i].columnName + "  (" + data.list[i].columnComment + ")";
              this.filedROptions.push(item);
            }

          } else {
            this.$message.error(data.msg)
          }
        })
      },
      del(flag) {
        if (flag == 1) {
          this.addField = [];
          this.fieldCount = 0;
        } else if (flag == 2) {
          this.appendField = [];
          this.appendFieldCount = 0;
        } else if (flag == 3) {
          this.tiaojianField = [];
          this.tiaojianCount = 0;
        }
      },
      load() {
        this.addField = [];
        this.appendField = [];
        this.tiaojianField = [];
        this.tableDetail = [{ value: '', label: '请选择-' }];
        for (var i = 0; i < this.fieldCount; i++) {
          this.addField.push(i);
        }
        for (var i = 0; i < this.appendFieldCount; i++) {
          this.appendField.push(i);
        }
        for (var i = 0; i < this.tiaojianCount; i++) {
          this.tiaojianField.push(i);
        }
        this.getTableDetail();
      },

      // 表单提交
      dataFormSubmit() {
        if (this.filedR5.length == 0) {
          this.$message.error("条件查询参数至少生成一列！")
          return;
        }

        var generatorFile = this.dataForm.actionList.toString();
        if (generatorFile == '') {
          this.$message({
            message: '请选择生成文件',
            type: 'warning',
            duration: 1500
          });
          return;
        }
        //格式化多个表名
        var tableNames = this.dataForm.tableName.split(":");
        for (var i = 0; i < tableNames.length; i++) {
          this.dataForm.tableNameArry.push(tableNames[i]);
        }
        //获取要展示的列表的字段
        var list = document.getElementsByName("field1");
        var fieldCount = this.fieldCount;
        for (var i = 0; i < fieldCount; i++) {
          if (this.filedR[i].value1 != '' && this.filedR[i].value1 != undefined) {
            this.dataForm.attr1.push((this.filedR[i].value1.substr(0, this.filedR[i].value1.indexOf('('))).trim());
          }
        }
        for (var i = 0; i < list.length; i++) {
          if (list[i].value != '' && list[i].value != undefined) {
            this.dataForm.field1.push(list[i].value);
          }
        }
        //获取要展示的新增，编辑页的字段
        var list5 = document.getElementsByName("field2");
        var list8 = document.getElementsByName("validSel");

        var appendFieldCount = this.appendFieldCount;
        for (var i = 0; i < appendFieldCount; i++) {
          if (this.filedR2[i].value1 != '' && this.filedR2[i].value1 != undefined) {
            this.dataForm.attr2.push((this.filedR2[i].value1.substr(0, this.filedR2[i].value1.indexOf('('))).trim());
          }
          if (this.filedR3[i].value1 != '' && this.filedR3[i].value1 != undefined) {
            this.dataForm.isEdit.push(this.filedR3[i].value1);
          }
          if (this.filedR4[i].value1 != '' && this.filedR4[i].value1 != undefined) {
            this.dataForm.validSel.push(this.filedR4[i].value1);
          }
        }
        // alert(this.dataForm.isEdit.join(","))
        //alert(this.dataForm.validSel.join(","))
        for (var i = 0; i < list5.length; i++) {
          if (list5[i].value != '' && list5[i].value != undefined) {
            this.dataForm.field2.push(list5[i].value);
          }
        }
        var tiaojianCount = this.tiaojianCount;
        for (var i = 0; i < tiaojianCount; i++) {
          if (this.filedR5[i].value1 != '' && this.filedR5[i].value1 != undefined) {
            this.dataForm.attr3.push((this.filedR5[i].value1.substr(0, this.filedR5[i].value1.indexOf('('))).trim());
          }
        }
        //alert(this.dataForm.attr3.join(","))
        var list3 = document.getElementsByName("field3");
        for (var i = 0; i < list3.length; i++) {
          if (list3[i].value != '' && list3[i].value != undefined) {
            this.dataForm.field3.push(list3[i].value);
          }
        }

        //alert(this.dataForm.tableNameArry.join(","))
        //this.$refs['dataForm'].validate((valid) => {/sys/generator/code
        //   if (valid) {
        this.$http({
          url: this.$http.adornUrl('/sys/generator/code'),
          method: 'post',
          params: this.$http.adornParams({
            'packageName': this.dataForm.packageName,
            'moduleName': this.dataForm.moduleName,
            'tableName': this.dataForm.tableNameArry.join(","),
            //'pkId':this.dataForm.pkId,
            'ControllerNamespace': this.dataForm.ControllerNamespace,
            'projectPath': this.dataForm.projectPath,
            'webRoot': this.dataForm.webRoot,
            'field1': this.dataForm.field1.join(","),
            'attr1': this.dataForm.attr1.join(","),
            'field2': this.dataForm.field2.join(","),
            'attr2': this.dataForm.attr2.join(","),
            'isEdit': this.dataForm.isEdit.join(","),
            'validSel': this.dataForm.validSel.join(","),
            /*'miaosu':this.dataForm.miaosu.join(","),
            'suxing':this.dataForm.suxing.join(","),*/
            'field3': this.dataForm.field3.join(","),
            'attr3': this.dataForm.attr3.join(","),
            'projectPath': this.dataForm.projectPath,
            'webRoot': this.dataForm.webRoot,
            'generatorFile': generatorFile
          }),
        }).then(({ data }) => {
          if (data && data.code === 0) {
            this.$message({
              message: '生成代码成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.visible = false
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
        //      }
        //  })
      }
    }
  }


</script>

<style lang="scss">
    .span_class {
        background-color: lightgrey;
        display: block;
        margin-bottom: 3px;
        text-align: center;
        border-radius: 5px;
    }

    .ck {
        margin-left: 4%;
    }

</style>