<template>
    <div class="app-container">
        <!--搜索面板-->
        <div class="filter-container">
            <el-form :model="searchForm" status-icon ref="searchForm" action="javascript:void(0);" size="small">
                <el-row>
                    <el-col :xs="24" :sm='6'>
                        <el-form-item label-width="80px" label="分类名称" prop="name">
                            <el-input v-model.trim="searchForm.name" placeholder="请输入名称" clearable class="filter-item"
                                      auto-complete="off" @keyup.enter.native="handleFilter('searchForm')"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="{span:'24',offset:'0'}" :sm="{span:'11',offset:'1'}">
                        <el-form-item>
                            <el-button v-waves class="filter-item" type="warning" icon="el-icon-search"
                                       @click="handleFilter('searchForm')">搜索
                            </el-button>
							<el-button v-waves class="filter-item" type="primary" icon="el-icon-plus" 
									   @click="handleAdd">新增
							</el-button>
                            <el-button v-waves class="filter-item" style="margin-left: 10px;" type="success"
                                       icon="el-icon-refresh" @click="handleReset('searchForm')">重置
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <!--搜索面板-->
        <div class="containtable">
            <el-table v-loading="tableData.listLoading" :data="tableData.list" border fit highlight-current-row
                      style="width: 100%;">
                <div slot="empty">{{tableData.emptyText}}</div>
                <el-table-column label="序号" fixed="left" type="index" :index="indexMethod" align="center"
                                 width="65"></el-table-column>
                                    <el-table-column label="分类名称" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.name }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否显示" align="center">
                        <template slot-scope="scope">
							<span v-if="scope.row.isShow">显示</span>
							<span v-else>不显示</span>
                        </template>
                    </el-table-column>
                <el-table-column label="操作" align="center" width="300px" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" icon="el-icon-remove" @click="handleDelete(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--表格-->
            <!--分页-->
            <div class="minwidth">
                <pagination style="margin-top:0" v-show="tableData.total>0" :total="tableData.total"
                            :page.sync="tableData.listQuery.pageNumber"
                            :limit.sync="tableData.listQuery.pageSize" @pagination="handleTableData"/>
            </div>
        </div>
        <!--分页-->

        <!--新增-->
        <el-dialog title="添加分类" :visible.sync="editForm.show" :center="true" width="580px">
            <el-form status-icon :rules="editForm.rules" :model="editForm" ref="editForm"  style="margin: 0 auto;" >
                <el-row>
                    <el-col :span="24">
                        <el-form-item label="分类名称:" label-width="100px" prop="name">
                            <el-input type="text" v-model="editForm.name" placeholder="请输入分类名称" auto-complete="off"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                	<el-col :span="24">
                		<el-form-item label="是否显示:" prop="isShow" label-width="100px">
                		  <el-radio-group v-model="editForm.isShow">
                			<el-radio :label="true">是</el-radio>
							<el-radio :label="false">否</el-radio>
                		  </el-radio-group>
                		</el-form-item>
                	  </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" v-waves @click="onSubmit('editForm')" icon="el-icon-success">提交</el-button>
                <el-button class="cancel-btn" v-waves @click="cancelsub" icon="el-icon-error">取消</el-button>
            </div>
        </el-dialog>
        <!--新增-->
    </div>
</template>

<script>
    import waves from '@/directive/waves' // Waves directive
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    import {page, detail, edit, del, checkName} from '@/api/admin/blog/category'
    export default {
        name: 'categoryManage',
        components: {
            Pagination
        },
        directives: {
            waves
        },
        data() {
			var checkName = (rule, value, callback) => {
				if(this.editForm.name != '' &&  this.editForm.name == this.editForm.nowName){
					callback();
				}
				this.handleName(rule, value, callback);
			};
            return {
                searchForm: {
                    name: ''
                },
                editForm: {
                    show: false,
                    id: '',
                    name: '',
					nowName: '',
                    isShow:true,
					rules: {
						name: [{
							validator: checkName,
							required: true,
							trigger: 'blur'
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
            // 表格索引
            indexMethod(index) {
                return (this.tableData.listQuery.current - 1) * 10 + index + 1;
            },
            handleFilter(formName) {
                this.tableData.listQuery.current = 1;
                this.handleTableData();
            },
            handleReset(formName) {
                this.$refs[formName].resetFields();
            },
            //获取表格数据
            handleTableData(pages) {
                this.tableData.listLoading = true
                if (pages) {
                    this.tableData.listQuery.current = pages.page
                }
                page({
                    name: this.searchForm.name,
                    current: this.tableData.listQuery.current,
                    size: this.tableData.listQuery.size
                }).then(res => {
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
            handleAdd() {
                this.editForm.show = true;
                    setTimeout(() => {
                        this.$refs.editForm.resetFields();
                }, 100)
            },
            handleUpdate(row) {
                this.editForm.show = true;
                this.handleDetail(row.id);
                    setTimeout(() => {
                        this.$refs.editForm.clearValidate();
                }, 100)
            },
            handleDetail(id) {
                detail({
                        id
                    }).then(res => {
                        if (!res.success) {
                        return;
                    }
					this.editForm.id = id;
                    this.editForm.name = res.data.category.name;
                    this.editForm.isShow = res.data.category.isShow;
                })
            },
			//验证分类名称是否存在
			handleName(rule, value, callback) {
				if (this.editForm.name == '' || this.editForm.name == null) {
					return callback(new Error('请填写分类名称'));
				} 
				checkName({
					id: this.editForm.id,
					name: this.editForm.name
				}).then(res => {
					if (res.success) {
						if (res.data.exist) {
							return callback(new Error('当前分类名称已存在'));
						} else {
							callback();
						}
					}
				})
			},
            //提交表单
            onSubmit(editForm) {
                this.$refs[editForm].validate((valid) => {
                    if (valid) {
                        edit({
                            id: this.editForm.id,
                            name: this.editForm.name,
                            isShow: this.editForm.isShow,
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
                                message: '提交成功',
                                type: 'success'
                            });
                            this.handleTableData();
                            this.editForm.show = false;
                        }
                    })
                    } else {
                        return false;
                    }
                })
            },
			// 取消提交
			cancelsub:function(){
				this.editForm.show = false;
			},
            //删除用户
            handleDelete(id) {
                this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        del({
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


<style>

</style>