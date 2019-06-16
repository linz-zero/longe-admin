<template>
	<div class="app-container">
		<div>
			<div class="lastout">
				<div class="lfrg">
					<div class="mgrg">
						<el-row class="lfrg-row" :gutter="10">
						  <el-col class="tit" :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							  <div class="cloudtit">公众号配置</div>
						  </el-col>
						</el-row>
						<el-row :gutter="10">
						  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							  <el-form ref="form" label-width="140px" size="mini">
								<el-form-item label="AppId：">
									<el-input></el-input>
								</el-form-item>
								<el-form-item label="AppSecret：">
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
							  <div class="cloudtit">小程序配置</div>
						  </el-col>
						</el-row>
						<el-row :gutter="10">
						  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
							  <el-form ref="form" label-width="140px" size="mini">
								<el-form-item label="AppId：">
									<el-input></el-input>
								</el-form-item>
								<el-form-item label="AppSecret：">
									<el-input></el-input>
								</el-form-item>
							  </el-form>
						  </el-col>
						</el-row>
					</div>
				</div>
				<div class="cl"></div>
			</div>
			<div class="tops">
				<el-row :gutter="10">
				  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
					  <div class="cloudtit">公共配置</div>
				  </el-col>
				</el-row>
				<el-row :gutter="10">
				  <el-col :xs="24" :sm="22" :md="18" :lg="16" :xl="16">
					  <el-form ref="form" label-width="140px" size="mini">
					    <el-form-item label="回调地址：">
							<el-input></el-input>
					    </el-form-item>
					  </el-form>
				  </el-col>
				</el-row>
			</div>
			<el-button type="primary" size="mini">提交</el-button>
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
		padding-left:0;
	}
	.cl{
		clear:both;
	}
	.app-main{
		background:#ecf0f5;
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
		margin-left:0!important;
		margin-right:0!important;
	}
	.lfrg .lfrg-row{
		border-top-left-radius:0.375rem;
		border-top-right-radius:0.375rem;
	}
	.tit{
		padding-left:0!important;
		padding-right:0!important;
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
	.tops{
		background:#fff;
		box-shadow: 0 0.0625rem 0.0625rem rgba(0,0,0,0.1);
		margin-bottom:1.25rem;
		border-top-left-radius:0.375rem;
		border-top-right-radius:0.375rem;
		margin-top:1.25rem;
	}
</style>