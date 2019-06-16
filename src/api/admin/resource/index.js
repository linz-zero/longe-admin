import request from '@/utils/request'

let resouceApi ={
	//资源树
	resourceTree: function(data){
		return request({
			url: 'admin/resource/tree',
			method: 'get',
			params: data
		})
	},
	//校验权限标识
	checkPermission: function(data){
		return request({
			url: 'admin/resource/checkPermission',
			method: 'post',
			params: data
		})
	},
	edit: function(data){
		return request({
			url: 'admin/resource/edit',
			method: 'post',
			data
		})
	},
	resourceDel: function(data){
		return request({
			url: 'admin/resource/del',
			method: 'get',
			params: data
		})
	},
	detail: function (data){
		return request({
			url: 'admin/resource/detail',
			method: 'get',
			params: data
		})
	},
	//上级菜单
	parentTree: function(data){
		return request({
			url: 'admin/resource/parentTree',
			method: 'get',
			params: data
		})
	}
}
module.exports = resouceApi;
