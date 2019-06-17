<template>
  <div class="app-container calendar-list-container">
    <el-form ref="editForm" :model="editForm" label-width="100px">
	  <el-form-item label="个性签名:" prop="autograph">
	    <el-input v-model="editForm.autograph" placeholder="请输入个性签名" style="width: 12.5rem;" auto-complete="off"/>
	  </el-form-item>
      <el-form-item label="头部图片" prop="topImg">
		  <el-upload
			class="avatar-uploader"
			:action="uploadAction"
			:headers="headers"
			:on-success="handleAvatarSuccess"
			:show-file-list="false">
			<img v-if="editForm.topImg!=''" :src="editForm.topImg" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		  </el-upload>
	  </el-form-item>
      <el-form-item label="简介图片" prop="centerImg">
		  <el-upload
			class="avatar-uploader"
			:action="uploadAction"
			:headers="headers"
			:on-success="handleAvatarSuccess"
			:show-file-list="false">
			<img v-if="editForm.centerImg!=''" :src="centerImg" class="avatar">
			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
		  </el-upload>
      </el-form-item>
      <el-form-item label="底部图片" prop="bottomImg">
      		  <el-upload
      			class="avatar-uploader"
      			:action="uploadAction"
      			:headers="headers"
      			:on-success="handleAvatarSuccess"
      			:show-file-list="false">
      			<img v-if="editForm.bottomImg!=''" :src="bottomImg" class="avatar">
      			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
      		  </el-upload>
      </el-form-item>
	  <el-form-item label="右侧图片" prop="rightImg">
	  		  <el-upload
	  			class="avatar-uploader"
	  			:action="uploadAction"
	  			:headers="headers"
	  			:on-success="handleAvatarSuccess"
	  			:show-file-list="false">
	  			<img v-if="editForm.rightImg!=''" :src="editForm.rightImg" class="avatar">
	  			<i v-else class="el-icon-plus avatar-uploader-icon"></i>
	  		  </el-upload>
	  </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="submitForm('editForm')">保存</el-button>
        <el-button @click="handleReset('editForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'blogConfig',
  components: '',
  data() {
    return {
	  uploadAction: process.env.VUE_APP_BASE_API + '/admin/component/oss/upload',
	  headers: {
	    token: ''
	  },
      editForm: {
        topImg: '',
        centerImg: '',
        bottomImg: '',
        rightImg: '',
        autograph: ''
      }
    }
  },
  created() {
    
  },
  methods: {
	handleAvatarSuccess(res, file) {
	  this.editForm.topImg = res.data.urls;
	},
	handleReset(formName) {
	  this.$refs[formName].resetFields();
	},
	//提交表单
	onSubmit(formName) {
		  
    }
  }
}
</script>
