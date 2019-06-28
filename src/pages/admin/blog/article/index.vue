<template>
    <div class="app-container">
        <!--搜索面板-->
        <div class="filter-container">
            <el-form :model="searchForm" status-icon ref="searchForm" action="javascript:void(0);" size="small">
                <el-row>
                    <el-col :xs="24" :sm='6'>
                        <el-form-item label-width="80px" label="文章标题:" prop="title">
                            <el-input v-model.trim="searchForm.title" placeholder="请输入文章标题" clearable class="filter-item"
                                      auto-complete="off" @keyup.enter.native="handleFilter('searchForm')"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="24" :sm='6'>
                        <el-form-item label-width="80px" label="手机号:" prop="phone">
                            <el-input v-model.trim="searchForm.phone" placeholder="请输入手机号" clearable class="filter-item"
                                      auto-complete="off" @keyup.enter.native="handleFilter('searchForm')"/>
                        </el-form-item>
                    </el-col>
                    <el-col :xs="{span:'24',offset:'0'}" :sm="{span:'11',offset:'1'}">
                        <el-form-item>
							<el-button v-waves class="filter-item" type="success" icon="el-icon-plus" 
									   @click="handleAdd">新增
							</el-button>
                            <el-button v-waves class="filter-item" type="primary" icon="el-icon-search"
                                       @click="handleFilter('searchForm')">搜索
                            </el-button>
                            <el-button v-waves class="filter-item" style="margin-left: 10px;" type="danger"
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
                    <el-table-column label="文章标题" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.title }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="文章首图" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.image }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="文章简介" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.description }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="评论数" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.commentCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="点赞数" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.likeCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="浏览数" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.browseCount }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否推荐" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.isRecommend }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="是否热门" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.isHot }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="状态：0 未发布 1 发布" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.status }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="分类id" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.categoryId }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="分类名称" align="center">
                        <template slot-scope="scope">
                            <span>{{ scope.row.categoryName }}</span>
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
                            :page.sync="tableData.listQuery.current"
                            :limit.sync="tableData.listQuery.size" @pagination="handleTableData"/>
            </div>
        </div>
        <!--分页-->
    </div>
</template>

<script>
    import waves from '@/directive/waves' // Waves directive
    import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
    import {page} from '@/api/admin/blog/article'
    export default {
        name: 'articleManage',
        components: {
            Pagination
        },
        directives: {
            waves
        },
        data() {
            return {
                searchForm: {
                    phone: '',
                    title: ''
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
				this.handleTableData();
            },
			handleAdd() {
                this.$router.push({ path: '/blog/article/edit' })
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
            }
        },
        mounted() {
            this.handleTableData();
        }
    }
</script>


<style>

</style>