import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/oauth/token',
    method: 'post',
    data: { username: data.username, password: data.password, grant_type: 'password', scope: 'all' },
  	auth: {
      username: 'myid',
      password: 'myid'
    }
  })
}

export function getInfo(data) {
  return request({
    url: '/rbac/user/getInfo',
    method: 'get',
    data
  })
}

export function resourceMenuTree() {
  return request({
    url: '/rbac/user/menu',
    method: 'get'
  })
}


export function logout() {
  return request({
    url: '/rbac/user/logout',
    method: 'get'
  })
}

export function refresh(data) {
  return request({
    url: '/oauth/token',
    method: 'post',
    data: {refresh_token: data.refresh_token, grant_type: 'refresh_token', scope: 'all'},
    auth: {
      username: 'myid',
      password: 'myid'
    }
  })
}
