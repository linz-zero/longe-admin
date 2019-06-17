<template>
  <div class="app-container">
    <!--搜索面板-->
    <div class="filter-container">
      <el-form :inline="true" :model="searchForm" status-icon ref="searchForm" action="javascript:void(0);"
               size="small">
        <el-form-item label="菜单" prop="filterText">
          <el-input clearable placeholder="输入关键字进行过滤" v-model="searchForm.filterText">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          <el-button v-waves class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-refresh"
                     @click="handleReset('searchForm')">重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--搜索面板-->

    <el-table :data="tableData.item" v-loading="tableData.listLoading" style="width: 100%;" border row-key="id">
      <el-table-column prop="label" label="名称" width="180">
      </el-table-column>
      <el-table-column prop="url" label="菜单URL" width="180">
      </el-table-column>
      <el-table-column prop="type" label="类型" width="180">
      </el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button @click="add(scope.row)" type="success" size="mini" icon="el-icon-plus">添加</el-button>
          <el-button @click="edit(scope.row)" type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
          <el-button @click="remove(scope.row)" type="danger" size="mini" icon="el-icon-remove">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增-->
    <el-dialog id="editForm" title="资源信息:" :visible.sync="editForm.show">
      <el-form :inline="true" :rules="editForm.rules" status-icon :model="editForm" ref="editForm"
               style="max-width: 500px;margin: 0 auto;" label-position="top" label-width="80px" size="small">

        <el-row :gutter="100">
          <el-col :lg="12">
            <el-form-item label="名称:" prop="name">
              <el-input type="text" v-model="editForm.name" placeholder="请输入资源名称" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item label="排序:" prop="seq">
              <el-input-number v-model="editForm.seq" :min="0" :max="999" label="请输入排序"></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :lg="12">
            <el-form-item label="上级菜单:" prop="selectOption">
              <el-cascader
                :options="editForm.options"
                v-model="editForm.selectOption"
                change-on-select
              ></el-cascader>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item label="路由:" prop="path">
              <el-input type="text" v-model="editForm.path" placeholder="请输入路由链接" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :lg="12">
            <el-form-item label="资源类型:" prop="res">
              <el-select v-model="editForm.res.value" style="width: 100%;" placeholder="请选择资源类型">
                <el-option v-for="item in editForm.res.item" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item label="icon:" prop="icon">
              <el-input type="text" v-model="editForm.icon" placeholder="请输入icon" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="100">
          <el-col :lg="12">
            <el-form-item label="权限标识:" prop="permission">
              <el-input type="text" v-model="editForm.permission" placeholder="请输入权限标识" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item label="URL:" prop="url">
              <el-input type="text" v-model="editForm.url" placeholder="请输入URL" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-waves @click="onSubmit('editForm')" icon="el-icon-success">提交</el-button>
      </div>
    </el-dialog>
    <!--新增-->
  </div>
</template>

<script>
  import waves from '@/directive/waves' // Waves directive
  import resouceApi from '@/api/admin/resource' //调用模块接口
  import {isNotNull} from '@/utils'

  export default {
    name: 'resourceManage',
    components: {},
    directives: {
      waves
    },
    data() {
      var checkPermission = (rule, value, callback) => {
        if (this.editForm.permission == '') {
          callback();
        }
        this.checkPer(rule, value, callback);
      };
      var checkRes = (rule, value, callback) => {
        if (this.editForm.res.value == '') {
          return callback(new Error('请选择类型'));
        } else {
          callback();
        }
      }
      return {
        searchForm: {
          filterText: ''
        },
        tableData: {
          listLoading: false,
          item: []
        },
        editForm: {
          show: false,
          id: '',
          name: '',
          seq: '',
          parentId: '',
          selectOption: ['0'],
          value: [],
          url: '',
          permission: '',//权限标识
          confirm_permission: '',
          path: '',
          icon: '',
          rules: {
            name: [{
              required: true,
              message: '名称不能为空',
              trigger: 'blur'
            }],
            permission: [{
              validator: checkPermission,
              trigger: 'blur'
            }],
            res: [{
              validator: checkRes,
              required: true,
              trigger: 'blur'
            }]
          },
          options: [],
          res: {
            item: [{
              value: 'MENU',
              label: '菜单'
            },
              {
                value: 'BUTTON',
                label: '权限'
              }
            ],
            value: 'MENU'
          }
        },
        treeId: 0,
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    watch: {
      'searchForm.filterText'(val) {
        this.$refs.tree2.filter(val);
      }
    },
    mounted() {
      this.tableData.listLoading = true;
      this.getResourceTree();
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      handleAdd() {
        this.getMenus();
        this.editForm.id = '';
        this.editForm.show = true;
        setTimeout(() => {
          this.$refs.editForm.resetFields();
        }, 100);
        this.editForm.res.value = 'MENU';
      },
      add(data) {
        this.getMenus();
        this.editForm.id = '';
        this.editForm.show = true;
        setTimeout(() => {
          this.$refs.editForm.resetFields();
          this.editForm.selectOption = [];
          if (data.pid == 0) {
            this.editForm.selectOption.push(data.id);
          } else {
            this.editForm.selectOption = data.parentPath.split(',');
            this.editForm.selectOption.push(data.id);
          }
          this.editForm.res.value = 'MENU';
        }, 100);
      },
      handleReset(formName) {
        this.$refs[formName].resetFields();
      },
      edit(data) {
        this.getMenus();
        this.editForm.show = true;
        setTimeout(() => {
          this.$refs.editForm.clearValidate();
        }, 100)
        this.update(data.id);
      },
      //修改
      update(id) {
        resouceApi.detail({
          id: id
        }).then(ress => {
          this.editForm.selectOption = ['0'];
          if (ress.success) {
            this.editForm.id = id;
						this.editForm.name = ress.data.resource.name;
            this.editForm.seq = ress.data.resource.seq;
            this.editForm.permission = ress.data.resource.permission;
            this.editForm.confirm_permission = ress.data.resource.permission;
            this.editForm.res.value = ress.data.resource.type;
            this.editForm.url = ress.data.resource.url;
            this.editForm.parentId = ress.data.resource.parentId;
            if (ress.data.resource.parentPath != '' && ress.data.resource.parentPath != null) {
              this.editForm.selectOption = [];
              this.editForm.selectOption = ress.data.resource.parentPath.split(',');
            }
            this.editForm.path = ress.data.resource.path;
            this.editForm.icon = ress.data.resource.icon;
          }
        });
      },
      append(data) {
        const newChild = {
          id: this.treeId++,
          label: 'testtest',
          children: []
        };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },
      remove(data) {
        this.$confirm('是否删除该资源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resouceApi.resourceDel({
            id: data.id
          }).then(res => {
            if (!res.success) {
              this.$message({
                type: 'error',
                message: '删除失败'
              });
            } else {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.getResourceTree();
              this.editForm.show = false;
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //资源树
      getResourceTree() {
        resouceApi.resourceTree({}).then(res => {
          if (res.success) {
            this.tableData.item = res.data.trees;
            this.editForm.options = res.data.trees;
          }
          this.tableData.listLoading = false;
        }).catch((e) => {
          console.log('err', e);
          this.tableData.listLoading = false
        });
      },
      //上级菜单
      getMenus() {
        this.editForm.options = [];
        resouceApi.parentTree({}).then(res => {
          if (res.success) {
            this.editForm.options = res.data.parentTrees;
          }
        });
      },
      //校验权限标识
      checkPer(rule, value, callback) {
        if (this.editForm.id != '') {
          if (this.editForm.permission == this.editForm.confirm_permission) {
            callback();
          }
        }
        resouceApi.checkPermission({
          permission: this.editForm.permission,
          id: this.editForm.id
        }).then(res => {
          if (res.success) {
            if (res.data.exist) {
              return callback(new Error('当前标识已存在'));
            } else {
              callback();
            }
          }
        });
      },
      //提交
      onSubmit(editForm) {
        this.$refs[editForm].validate((valid) => {
          if (valid) {
            if (this.editForm.selectOption.length > 0) {
              this.editForm.parentId = this.editForm.selectOption[this.editForm.selectOption.length - 1];
            }
            resouceApi.edit({
              id: this.editForm.id,
              parentId: this.editForm.parentId,
              name: this.editForm.name,
              url: this.editForm.url,
              permission: this.editForm.permission,
              type: this.editForm.res.value,
              seq: this.editForm.seq,
              parentPath: this.editForm.selectOption.join(','),
              path: this.editForm.path,
              icon: this.editForm.icon
            }).then(res => {
              if (res.success) {
                this.$notify({
                  title: '提示',
                  message: res.respMsg,
                  type: 'success'
                });
                this.getResourceTree();
                this.editForm.show = false;
              } else {
                this.$notify.Error({
                  title: '提示',
                  message: '操作失败',
                  type: 'success'
                });
              }
            })
          } else {
            return false;
          }
        })
      }
    }
  }
</script>
