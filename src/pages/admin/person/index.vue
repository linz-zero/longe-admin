<template>
	<div class="app-container">
		<el-tabs class="el-tabs__header is-left" tab-position="left" size="small">
			<el-tab-pane label="密码设置">
				<el-form  status-icon ref="" style="max-width: 500px;margin: 0 auto;" label-position="" label-width="80px"  >
					<el-row :gutter="100">
						<el-col :lg="24" :md="24" prop="account">
							<el-form-item label="旧密码" prop="account">
								<el-input type="text" placeholder="请输入密码" v-model="pwd.input1" auto-complete="off" show-password></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="100">
						<el-col :lg="24" :md="24">
							<el-form-item label="新密码" prop="account">
								<el-input type="text" placeholder="请输入密码" v-model="pwd.input2" auto-complete="off" show-password></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row :gutter="100">
						<el-col :lg="16" :md="16">
							<el-form-item>
								<el-button round type="primary" @click="sub">提交</el-button>
							</el-form-item>
						</el-col>
					</el-row>
				</el-form>
			</el-tab-pane>
			<el-tab-pane label="修改头像">
				<div class="change-avatar">
					<pan-thumb :image="image" />
					<el-button type="primary" icon="upload" style="position: absolute;bottom: 15px;margin-left: 80px;" @click="imagecropperShow=true">修改头像</el-button>
					<image-cropper
					  v-show="imagecropperShow"
					  :key="imagecropperKey"
					  :width="300"
					  :height="300"
					  url="https://httpbin.org/post"
					  lang-type="zh"
					  @close="close"
					  @crop-upload-success="cropSuccess"
					/>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	import waves from '@/directive/waves' // Waves directive
	import {passwords} from '@/api/admin/user' //调用模块接口
	import ImageCropper from '@/components/ImageCropper'
	import PanThumb from '@/components/PanThumb'
	export default {
		name: 'personManage',
		components: { ImageCropper, PanThumb },
		directives: {
			waves
		},
		data() {
			return {
				imagecropperShow: false,
				imagecropperKey: 0,
				image: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
				pwd:{
					input1:'',
					input2:''
				}
				
			}
		},
		methods: {
			sub(){
				passwords({
					oldPassword:this.pwd.input1,
					password:this.pwd.input2
				}).then(res=>{
					console.log(res);
					if(res.respCode=='0000'){
						this.pwd.input1=this.pwd.input2='';
						console.log('提交成功');
					}
					
				})
			},
			cropSuccess(resData) {
			  this.imagecropperShow = false
			  this.imagecropperKey = this.imagecropperKey + 1
			  this.image = resData.files.avatar
			},
			close() {
			  this.imagecropperShow = false
			}
		},
		mounted(){
			
		}
	}
</script>

<style>
	.change-avatar{
		padding-left: 200px;
	}
	.change-avatar .avatar{
	  width: 200px;
	  height: 200px;
	  border-radius: 50%;
	}
</style>