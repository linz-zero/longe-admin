<template>
	<div class="app-container">
		<div class="tops">
			<el-row :gutter="10">
			  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				  <div class="cloudtit">广告图配置</div>
			  </el-col>
			</el-row>
			<el-row :gutter="10">
			  <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
				  <el-form ref="form" label-width="200px" size="mini">
					<el-form-item label="轮播数量:">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="间隔时间,毫秒:">
						<el-input></el-input>
					</el-form-item>
					<el-form-item label="列表是否隐藏轮播内容:">
						<el-select placeholder="请选择启用区域">
						  <el-option label="是" ></el-option>
						  <el-option label="否" ></el-option>
						</el-select>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" size="mini">提交</el-button>
					  </el-form-item>
				  </el-form>
			  </el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import waves from '@/directive/waves' // Waves directive
	import {passwords} from '@/api/admin/user' //调用模块接口
	export default {
		name: 'cloud',
		components: {},
		directives: {
			waves
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		mounted(){
			
		}
	}
</script>
	
<style>
	.app-main{
		background:#ecf0f5;
	}
	.tops{
		background:#fff;
		box-shadow: 0 0.0625rem 0.0625rem rgba(0,0,0,0.1);
		margin-bottom:1.25rem;
		border-top-left-radius:0.375rem;
		border-top-right-radius:0.375rem;
	}
	.cloudtit{
		font-size:1.125rem;
		padding:0.625rem;
		border-top-left-radius:0.375rem;
		border-top-right-radius:0.375rem;
		margin-bottom:0.625rem;
		border-bottom: 0.0625rem solid #f4f4f4;
		border-top: 0.1875rem solid #d2d6de;
	}
	.lfrg .el-row{
		background:#fff;
		margin-left:0!important;
		margin-right:0!important;
	}
	.el-select{
		width:100%!important;
	}
</style>