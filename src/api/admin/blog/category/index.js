import request from '@/utils/request'

export function page(data) {
	return request({
		url: '/admin/blog/category/page',
		method: 'get',
		params: data
	})
}

export function detail(data) {
	return request({
        url: '/admin/blog/category/detail',
		method: 'get',
		params: data
	})
}

export function edit(data) {
	return request({
        url: '/admin/blog/category/edit',
		method: 'post',
		data
	})
}

export function del(data) {
	return request({
        url: '/admin/blog/category/del',
		method: 'get',
		params: data
	})
}

export function checkName(data) {
	return request({
		url: '/admin/blog/category/checkName',
		method: 'get',
		params: data
	})
}