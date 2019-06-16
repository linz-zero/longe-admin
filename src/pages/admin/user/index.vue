<template>
  <div class="app-container">
    <!--搜索面板-->
    <div class="filter-container">
      <el-form :inline="true" :model="searchFrom" status-icon ref="searchFrom" action="javascript:void(0);"
               size="small">
        <el-form-item label="用户账号" prop="username">
          <el-input v-model.trim="searchFrom.username" placeholder="请输入用户账号" clearable style="width: 200px;"
                    class="filter-item" auto-complete="off" @keyup.enter.native="handleFilter('searchFrom')"/>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model.trim="searchFrom.name" placeholder="请输入名称" clearable style="width: 200px;"
                    class="filter-item" auto-complete="off" @keyup.enter.native="handleFilter('searchFrom')"/>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="warning" icon="el-icon-search"
                     @click="handleFilter('searchFrom')">搜索
          </el-button>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
          <el-button v-waves class="filter-item" style="margin-left: 10px;" type="success" icon="el-icon-refresh"
                     @click="handleReset('searchFrom')">重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--搜索面板-->

    <el-table v-loading="tableData.listLoading" :data="tableData.list" border fit highlight-current-row
              style="width: 100%;">
      <div slot="empty">{{tableData.emptyText}}</div>
      <el-table-column label="序号" fixed="left" type="index" :index="indexMethod" align="center"
                       width="65"></el-table-column>
      <el-table-column label="用户账号" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="角色名" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.roleName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="warning" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-remove" @click="handleDelete(scope.row.id)">删除</el-button>
          <el-button type="primary" style='width: auto;' size="mini" icon="el-icon-edit"
                     @click="handleReset(scope.row.id)">重置密码
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--表格-->
    <!--分页-->
    <pagination style="margin-top:0" v-show="tableData.total>0" :total="tableData.total"
                :page.sync="tableData.listQuery.current" :limit.sync="tableData.listQuery.size"
                @pagination="handleTableData"/>
    <!--分页-->

    <!--新增-->
    <el-dialog id="editFrom" title="添加用户" :visible.sync="editFrom.show">
      <el-form :inline="true" status-icon :model="editFrom" :rules="editFrom.rules" ref="editFrom"
               style="max-width: 500px;margin: 0 auto;" label-position="top" label-width="80px" size="small">
        <el-row :gutter="100">
          <el-col :lg="12">
            <el-form-item label="用户账号:" prop="username">
              <el-input type="text" v-model="editFrom.username" placeholder="请输入用户账号" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item label="名称:" prop="name">
              <el-input type="text" v-model="editFrom.name" placeholder="请输入名称" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="100" v-show="editFrom.id == '' ">
          <el-col :lg="12">
            <el-form-item label="密码:" prop="password">
              <el-input type="password" v-model="editFrom.password" placeholder="请输入密码" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
          <el-col :lg="12">
            <el-form-item label="确认密码:" prop="confirm_password">
              <el-input type="password" v-model="editFrom.confirm_password" placeholder="请输入确认密码"
                        auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="100">
          <el-col :lg="12">
            <el-form-item label="角色:" prop="roles" style="width:100%">
              <el-select v-model="editFrom.roles.value" style="width: 100%;"
                         multiple
                         placeholder="请选择">
                <el-option
                  v-for="item in editFrom.roles.item"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" v-waves @click="onSubmit('editFrom')" icon="el-icon-success">提交</el-button>
      </div>
    </el-dialog>
    <!--新增-->
  </div>
</template>

<script>
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  import userApi from '@/api/admin/user' //调用模块接口

  export default {
    name: 'userManage',
    components: {
      Pagination
    },
    directives: {
      waves
    },
    data() {
      const checkPass = (rule, value, callback) => {
        if (this.editFrom.id == '') {
          if (this.editFrom.confirm_password == '') {
            return callback(new Error('请输入确认密码'));
          }
        }
        if (this.editFrom.password !== this.editFrom.confirm_password) {
          return callback(new Error('两次输入的密码不相同'));
        } else {
          callback();
        }
      };
      const checkPassword = (rule, value, callback) => {
        if (this.editFrom.id == '') {
          if (this.editFrom.password == '') {
            checkPass(rule, value, callback);
            return callback(new Error('请输入密码'));
          } else {
            callback();
          }
        } else {
          callback();
        }
      };
      const checkUser = (rule, value, callback) => {
        if (this.editFrom.username == this.editFrom.nowusername && this.editFrom.username != '') {
          callback();
        }
        this.checkUserNames(rule, value, callback);
      };
      const checkRole = (rule, value, callback) => {
        if (this.editFrom.roles.value.length == 0) {
          callback(new Error('请选择角色'));
        }
        callback();
      };
      return {
        searchFrom: {
          username: '',
          name: ''
        },
        editFrom: {
          id: '',
          name: '',
          username: '',
          password: '',
          confirm_password: '',
          nowusername: '',
          show: false,
          roles: {
            item: [],
            value: []
          },
          rules: {
            password: [{
              validator: checkPassword,
              trigger: 'blur'
            }],
            confirm_password: [{
              validator: checkPass,
              trigger: 'blur'
            }],
            username: [{
              validator: checkUser,
              required: true,
              trigger: 'blur'
            }],
            name: [{
              required: true,
              message: '请输入名称',
              trigger: 'blur'
            }],
            roles: [{
              validator: checkRole,
              required: true,
              trigger: 'change'
            }]
          }
        },
        tableData: {
          emptyText: '暂无数据',
          listLoading: false,
          list: [],
          total: 0,
          listQuery: {
            current: 1,
            size: 10
          }
        }
      }
    },
    methods: {
      //表格索引
      indexMethod(index) {
        return (this.tableData.listQuery.current - 1) * 10 + index + 1;
      },
      handleFilter(formName) {
        this.tableData.listQuery.current = 1;
        this.handleTableData();
      },
      handleAdd() {
        this.editFrom.show = true;
        this.handleRolePage();
        setTimeout(() => {
          this.$refs.editFrom.resetFields();
        }, 100)
      },
      handleUpdate(row) {
        this.editFrom.show = true;
        this.handleRoleDetail(row.id);
        this.handleUserDetail(row.id);
        setTimeout(() => {
          this.$refs.editFrom.clearValidate();
        }, 100)
      },
      handleReset(formName) {
        this.$refs[formName].resetFields();
      },
      checkUserNames(rule, value, callback) {  //验证用户名是否存在
        if (this.editFrom.username == '' || this.editFrom.username == null) {
          return callback(new Error('请填写用户名'));
        }
        userApi.checkUserName({
          username: this.editFrom.username
        }).then(res => {
          if (res.success) {
            if (res.data.exist) {
              return callback(new Error('当前用户名已存在'));
            } else {
              callback();
            }
          }
        })
      },
      //获取表格数据
      handleTableData(pages) {
        this.tableData.listLoading = true
        if (pages) {
          this.tableData.listQuery.current = pages.page
        }
        userApi.userPage({
          username: this.searchFrom.username,
          name: this.searchFrom.name,
          current: this.tableData.listQuery.current,
          size: this.tableData.listQuery.size
        }).then(res => {
          this.tableData.listLoading = false
          if (!res.success) {
            this.tableData.list = [];
            this.tableData.total = 0;
            this.tableData.emptyText = '暂无数据';
            return;
          }
          if (res.data.list) {
            this.tableData.list = res.data.list
            this.tableData.total = res.data.total * 1
          }
        }).finally(()=> {
            this.tableData.listLoading = false
        })
      },
      onSubmit(editFrom) {
        this.$refs[editFrom].validate((valid) => {
          if (valid) {
            userApi.userEdit({
              id: this.editFrom.id,
              name: this.editFrom.name,
              username: this.editFrom.username,
              password: this.editFrom.password,
              roleIds: this.editFrom.roles.value.join(',')
            }).then(res => {
              if (!res.success) {
                this.$notify.Error({
                  title: '提示',
                  message: '操作失败',
                  type: 'success'
                });
              } else {
                this.$notify({
                  title: '提示',
                  message: '信息提交成功',
                  type: 'success'
                });
                this.handleTableData();
                this.editFrom.show = false;
              }
            })
          } else {
            return false;
          }
        })
      },
      //获取角色
      handleRolePage() {
        return new Promise((resolve, reject) => {
          userApi.rolePage({
            role: '',
            name: ''
          }).then(res => {
            this.editFrom.roles.item = [];
            this.editFrom.roles.value = [];
            if (!res.success) {
              return;
            }
            if (res.data.list) {
              this.editFrom.roles.item = res.data.list.map(item => {
                return {
                  value: item.id,
                  label: item.name
                }
              })
            }
            resolve(res);
          })
        })
      },
      //用户详情
      handleUserDetail(id) {
        userApi.userDetail({
          id
        }).then(res => {
          this.editFrom.roles.value = [];
          if (!res.success) {
            return;
          }
          this.editFrom.id = res.data.user.id;
          this.editFrom.username = res.data.user.username;
          this.editFrom.nowusername = res.data.user.username;
          this.editFrom.name = res.data.user.name;
          this.editFrom.roles.value = res.data.sysRoles.map(item => {
            return item.id
          });
        })
      },
      handleRoleDetail(id) {
        this.handleRolePage().then(res => {
          userApi.roleDetail({id}).then(r => {
            this.editFrom.roles.value = [];
            if (!r.success) {
              return;
            }
            this.editFrom.roles.value = r.data.sysRoles.map(function (role) {
              return role.id
            });
          })
        })
      },
      handleDelete(id) { //删除用户
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userApi.userDel({
            ids: id
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
              this.handleTableData();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //重置密码
      handleReset(id) {
        this.$confirm('是否重置密码为123456, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          userApi.userReset({
            id
          }).then(res => {
            if (!res.success) {
              this.$message({
                type: 'error',
                message: '重置失败'
              });
            } else {
              this.$message({
                type: 'success',
                message: '重置成功!'
              });
              this.handleTableData();
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消重置'
          });
        });
      }
    },
    mounted() {
      this.handleTableData();

    }
  }
</script>
