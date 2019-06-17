import request from '@/utils/request'

export function page(data) {
	return request({
		url: '/admin/blog/config/page',
		method: 'post',
		data
	})
}

export function detail(data) {
	return request({
        url: '/admin/blog/config/detail',
		method: 'get',
		params: data
	})
}

export function edit(data) {
	return request({
        url: '/admin/blog/config/edit',
		method: 'post',
		data
	})
}

export function del(data) {
	return request({
        url: '/admin/blog/config/del',
		method: 'get',
		params: data
	})
}
