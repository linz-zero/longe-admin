<template>
	<div class="app-container">
		<div class="tops">
			<el-row :gutter="10">
			  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
				  <div class="cloudtit">云存储配置</div>
			  </el-col>
			</el-row>
			<el-row :gutter="10">
			  <el-col :xs="20" :sm="16" :md="16" :lg="14" :xl="12">
				  <el-form ref="form" label-width="80px" size="mini">
				    <el-form-item label="启用:">
						<el-select placeholder="">
						  <el-option label="阿里云" value="ali"></el-option>
						  <el-option label="七牛云" value="sev"></el-option>
						</el-select>
				    </el-form-item>
				    <el-form-item size="large">
				  	<el-button type="primary" size="mini">提交</el-button>
				    </el-form-item>
				  </el-form>
			  </el-col>
			</el-row>
		</div>
		<div class="lastout">
			<div class="lfrg">
				<div class="mgrg">
					<el-row class="lfrg-row" :gutter="10">
					  <el-col class="tit" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
						  <div class="cloudtit">阿里云OSS</div>
					  </el-col>
					</el-row>
					<el-row :gutter="10">
					  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
						  <el-form ref="form" label-width="140px" size="mini">
							<el-form-item label="AccessKeyId:">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="AccessKeySecret:">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="BucketName:">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="绑定的域名:">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="EndPoint:">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="路径前缀:">
								<el-input></el-input>
							</el-form-item>
						  </el-form>
					  </el-col>
					</el-row>
				</div>
			</div>
			<div class="lfrg">
				<div class="mgrg">
					<el-row class="lfrg-row" :gutter="10">
					  <el-col class="tit" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
						  <div class="cloudtit">七牛云存储</div>
					  </el-col>
					</el-row>
					<el-row :gutter="10">
					  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
						  <el-form ref="form" label-width="140px" size="mini">
							<el-form-item label="空间名:">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="绑定的域名:">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="路径前缀:">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="SECRET_KEY:">
								<el-input></el-input>
							</el-form-item>
							<el-form-item label="ACCESS_KEY:">
								<el-input></el-input>
							</el-form-item>
						  </el-form>
					  </el-col>
					</el-row>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import waves from '@/directive/waves' // Waves directive
	// import {cloud} from '@/api/admin/user' //调用模块接口
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
	.tit{
		padding-left:0!important;
		padding-right:0!important;
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
	.tops .el-select{
		width:100%!important;
	}
	.lastout{
		margin-right:-2%;
	}
	.lfrg{
		width:50%;
		float:left;
		border-top-left-radius:0.375rem;
		border-top-right-radius:0.375rem;
	}
	.mgrg{
		margin-right:4%!important;
	}
	.lfrg .el-row{
		background:#fff;
	}
	.lfrg .lfrg-row{
		border-top-left-radius:0.375rem;
		border-top-right-radius:0.375rem;
	}
	/* .el-select .el-input__inner {
		width:100%!important;
	} */
</style>