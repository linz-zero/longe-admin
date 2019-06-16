import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const TokenRefreshKey = 'Admin-Refresh-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getRefreshToken() {
  return Cookies.get(TokenRefreshKey)
}

export function setRefreshToken(token) {
  return Cookies.set(TokenRefreshKey, token)
}
