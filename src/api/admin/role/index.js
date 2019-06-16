import request from '@/utils/request'

let roleApi ={
	//角色列表
	rolePage: function(data) {
		return request({
			url: '/admin/role/page',
			method: 'post',
			data
		})
	},
	//角色详情
	roleDetail: function(data) {
		return request({
			url: '/admin/role/detail',
			method: 'get',
			params: data
		})
	},
	// 检查角色标识是否重复
	checkRole: function(data) {
		return request({
			url: '/admin/role/checkRole',
			method: 'get',
			params: data
		})
	},
	// 角色编辑
	rolEdit: function(data) {
		return request({
			url: '/admin/role/edit',
			method: 'post',
			data
		})
	},
	//删除角色
	roleDel: function(data) {
		return request({
			url: '/admin/role/del',
			method: 'get',
			params: data
		})
	},
	resourceTree: function(){
		return request({
			url: 'admin/resource/tree',
			method: 'get'
		})
	}
}
module.exports = roleApi;
