import request from '@/utils/request'

export function page(data) {
	return request({
		url: '/admin/blog/lab/page',
		method: 'get',
		params: data
	})
}

export function detail(data) {
	return request({
        url: '/admin/blog/lab/detail',
		method: 'get',
		params: data
	})
}

export function edit(data) {
	return request({
        url: '/admin/blog/lab/edit',
		method: 'post',
		data
	})
}

export function del(data) {
	return request({
        url: '/admin/blog/lab/del',
		method: 'get',
		params: data
	})
}

export function checkName(data) {
	return request({
		url: '/admin/blog/lab/checkName',
		method: 'get',
		params: data
	})
}