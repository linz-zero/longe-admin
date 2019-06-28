import request from '@/utils/request'

export function page(data) {
	return request({
		url: '/admin/blog/article/page',
		method: 'post',
		data
	})
}

export function detail(data) {
	return request({
        url: '/admin/blog/article/detail',
		method: 'get',
		params: data
	})
}

export function edit(data) {
	return request({
        url: '/admin/blog/article/edit',
		method: 'post',
		data
	})
}

export function del(data) {
	return request({
        url: '/admin/blog/article/del',
		method: 'get',
		params: data
	})
}
