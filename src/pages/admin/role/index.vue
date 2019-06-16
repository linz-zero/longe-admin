<template>
  <div class="app-container">
    <!--搜索面板-->
    <div class="filter-container">
      <el-form :inline="true" :model="searchForm" status-icon ref="searchForm" action="javascript:void(0);"
               size="small">
        <el-form-item label="组织列表" prop="company.value" :rules="[
				      	{ required: true, message: '请选择组织', trigger: 'change' }
				    ]">
          <el-select v-model="searchForm.company.value" style="width: 100%;" placeholder="请选择">
            <el-option
              v-for="item in searchForm.company.item"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--搜索面板-->

    <el-table v-loading="tableData.listLoading" :data="tableData.list" border fit highlight-current-row
              style="width: 100%;">
      <div slot="empty">{{tableData.emptyText}}</div>
      <el-table-column label="序号" fixed="left" type="index" :index="indexMethod" align="center"
                       width="65"></el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.modifyDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.createDate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" icon="el-icon-remove" @click="handleDelete(scope.row.id)">删除</el-button>
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
    <el-dialog id="editForm" title="添加角色" :visible.sync="editForm.show">
      <el-form :inline="true" status-icon :model="editForm" :rules="editForm.rules" ref="editForm"
               style="max-width: 500px;margin: 0 auto;" label-position="top" label-width="80px" size="small">
        <el-row :gutter="100">
          <el-col :lg="24">
            <el-form-item label="角色名称" prop="name">
              <el-input type="text" v-model="editForm.name" placeholder="请输入角色名称" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="100">
          <el-col :lg="24">
            <el-form-item label="角色标识" prop="role">
              <el-input type="text" v-model="editForm.role" placeholder="请输入角色标识" auto-complete="off"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="100">
          <el-col :lg="24">
            <el-form-item label="菜单" prop="value">
              <treeselect
                :multiple="true"
                :options="editForm.options"
                :flat="true"
                :default-expand-level="1"
                placeholder="请选择菜单"
                v-model="editForm.resourceIds"
              />
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
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import roleApi from '@/api/admin/role' //调用模块接口
  import waves from '@/directive/waves' // Waves directive
  import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
  export default {
    name: 'roleManage',
    components: {
      Pagination,
      Treeselect
    },
    directives: {
      waves
    },
    data() {
      var checkRole = (rule, value, callback) => {
        this.checkUserRole(rule, value, callback);
      }
      return {
        searchForm: {
          company: {
            item: [{
              value: '龙屹信息科技',
              label: '龙屹信息科技'
            }],
            value: '龙屹信息科技'
          }
        },
        editForm: {
          show: false,
          name: '',
          id: '',
          role: '',
          nowRole: '',
          options: [],
          resourceIds: [],
          rules: {
            role: [{
              validator: checkRole,
              required: true,
              trigger: 'blur'
            }],
            name: [{
              required: true,
              message: '请输入角色名称',
              trigger: 'blur'
            }],
            resourceIds: [{
              required: true,
              message: '请选择菜单',
              trigger: 'blur'
            }]
          },

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
        },
      }
    },
    methods: {
      //表格索引
      indexMethod(index) {
        return (this.tableData.listQuery.current - 1) * 10 + index + 1;
      },
      //获取表格数据
      handleTableData(pages) {
        this.tableData.listLoading = true
        if (pages) {
          this.tableData.listQuery.current = pages.page
        }
        roleApi.rolePage({
          role: this.searchForm.username,
          name: this.searchForm.name,
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
        }).catch((e)=> {
          console.log('err', e);
          this.tableData.listLoading = false
        })
      },
      //新增
      handleAdd() {
        this.editForm.show = true;
        this.getResourceTree();
        setTimeout(() => {
          this.$refs.editForm.resetFields();
        }, 100)
      },
      //修改
      handleUpdate(row) {
        this.handleRoleDetail(row.id);
        this.getResourceTree();
        this.editForm.show = true;
        setTimeout(() => {
          this.$refs.editForm.clearValidate();
        }, 100)
      },
      //详情
      handleRoleDetail(id) {
        roleApi.roleDetail({
          id
        }).then(res => {
          if (!res.success) {
            return;
          }
          let {data: {role}} = res;
          this.editForm.id = role.id;
          this.editForm.name = role.name;
          this.editForm.role = role.role;
          this.editForm.nowRole = role.role;
          this.editForm.resourceIds = res.data.resourceIds;
        });
      },
      handleReset(formName) {
        this.$refs[formName].resetFields();
      },
      //检查角色标识是否重复
      checkUserRole(rule, value, callback) {
        if (this.editForm.role == '') {
          return callback(new Error('请输入角色标识'));
        }
        if (this.editForm.role == this.editForm.nowRole) {
          callback();
        }else{
          roleApi.checkRole({
            role: this.editForm.role
          }).then(res => {
            if (res.success) {
              if (res.data.exist) {
                return callback(new Error('当前角色标识存在'));
              } else {
                callback();
              }
            }
          });
        }
      },
      //资源树
      getResourceTree() {
        roleApi.resourceTree().then(res => {
          if (res.success) {
            this.editForm.options = res.data.trees;
          }
        });
      },
      //提交表单
      onSubmit(editForm) {
        this.$refs[editForm].validate((valid) => {
          if (valid) {
            roleApi.rolEdit({
              id: this.editForm.id,
              name: this.editForm.name,
              role: this.editForm.role,
              resourceIds: this.editForm.resourceIds.join(',')
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
                this.editForm.show = false;
              }
            });
          } else {
            return false;
          }
        });
      },
      //删除角色
      handleDelete(id) {
        this.$confirm('是否删除该角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          roleApi.roleDel({
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
      }
    },
    mounted() {
      this.handleTableData();
    }

  }
</script>
