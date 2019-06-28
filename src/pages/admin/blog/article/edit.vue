<template>
	<div class="edit-main-container">
		<el-form status-icon :rules="editForm.rules" :model="editForm" ref="editForm"  style="margin: 0 auto;" label-width="120px">
			<el-row>
				<el-col :span="24">
					<el-form-item label="文章标题:" label-width="80px" prop="title">
						<el-input type="text" v-model="editForm.title" placeholder="请输入文章标题" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="文章首图:" label-width="80px" prop="image">
						<el-input type="text" v-model="editForm.image" placeholder="请输入文章首图" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="文章简介:" label-width="80px" prop="description">
						<el-input type="text" v-model="editForm.description" placeholder="请输入文章简介" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="评论数:" label-width="80px" prop="commentCount">
						<el-input type="text" v-model="editForm.commentCount" placeholder="请输入评论数" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="点赞数:" label-width="80px" prop="likeCount">
						<el-input type="text" v-model="editForm.likeCount" placeholder="请输入点赞数" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="浏览数:" label-width="80px" prop="browseCount">
						<el-input type="text" v-model="editForm.browseCount" placeholder="请输入浏览数" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="是否推荐:" label-width="80px" prop="isRecommend">
						<el-input type="text" v-model="editForm.isRecommend" placeholder="请输入是否推荐" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="是否热门:" label-width="80px" prop="isHot">
						<el-input type="text" v-model="editForm.isHot" placeholder="请输入是否热门" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="状态：0 未发布 1 发布:" label-width="80px" prop="status">
						<el-input type="text" v-model="editForm.status" placeholder="请输入状态：0 未发布 1 发布" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="分类id:" label-width="80px" prop="categoryId">
						<el-input type="text" v-model="editForm.categoryId" placeholder="请输入分类id" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24">
					<el-form-item label="分类名称:" label-width="80px" prop="categoryName">
						<el-input type="text" v-model="editForm.categoryName" placeholder="请输入分类名称" auto-complete="off"></el-input>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>
		<el-button type="primary" v-waves @click="onSubmit('editForm')" icon="el-icon-success">提交</el-button>
		<el-button class="cancel-btn" v-waves @click="cancelsub" icon="el-icon-error">取消</el-button>
	</div>
</template>

<script>
	import {detail, edit, del} from '@/api/admin/blog/article'
	export default {
        name: 'editArticleManage',
        data() {
            return {
                editForm: {
                    show: false,
                    id: '',
                    title:'',
                    image:'',
                    description:'',
                    commentCount:'',
                    likeCount:'',
                    browseCount:'',
                    isRecommend:'',
                    isHot:'',
                    status:'',
                    categoryId:'',
                    categoryName:'',
                }
            }
        }
	}
</script>

<style scoped>
.edit-main-container{
	padding: 40px 45px 20px 50px;
}
</style>
