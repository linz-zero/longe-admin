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
</style>
