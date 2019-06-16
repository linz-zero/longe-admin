import request from '@/utils/request'

let userApi = {
	//用户列表
	userPage: function(data) {
	  return request({
	    url: '/admin/user/page',
	    method: 'post',
	    data
	  })
	},
	//用户编辑
	userEdit: function(data) {
	  return request({
	    url: '/admin/user/edit',
	    method: 'post',
	    data
	  })
	},
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
			url: '/admin/user/role',
			method: 'get',
			params: data
		})
	},
	//用户详情
	userDetail: function(data) {
		return request({
			url: '/admin/user/detail',
			method: 'get',
			params: data
		})
	},
	//检查登录名是否重复
	checkUserName: function(data) {
		return request({
			url: '/admin/user/checkUserName',
			method: 'get',
			params: data
		})
	},
	//删除用户
	userDel: function(data) {
		return request({
			url: 'admin/user/del',
			method: 'post',
			params: data
		})
	},
	//重置密码
	userReset: function(data) {
		return request({
			url: 'admin/user/reset',
			method: 'get',
			params: data
		})
	}
}

module.exports = userApi;
