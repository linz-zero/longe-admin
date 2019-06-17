<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style type="text/css">
	.el-form--label-top .el-form-item__label{
		padding-bottom: 0;
	}
	.el-form-item--small .el-form-item__content{
		line-height: 16px;
	}
	.el-dialog .el-form-item--small.el-form-item{
		display: block;
		width: 100%;
	}
	.el-dialog .el-form-item--small.el-form-item .el-select{
		width: 100%;
	}
	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}
	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 70px;
		height: 70px;
		line-height: 70px;
		text-align: center;
	}
	.avatar {
		width: 70px;
		height: 70px;
		display: block;
	}
</style>
