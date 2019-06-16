import { login, logout, refresh, getInfo } from '@/api/user'
import { getToken, setToken, getRefreshToken, setRefreshToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import {reloadRouter} from '@/utils/reload'

const state = {
  token: getToken(),
  refreshToken: getRefreshToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_REFRESH_TOKEN: (state, token) => {
    state.refreshToken = token
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const data = response
        console.log('token'+data.access_token)
        commit('SET_TOKEN', data.access_token)
        setToken(data.access_token)
        setRefreshToken(data.refresh_token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo().then(response => {
        const data = response.data.user

        if (!data) {
          reject('Verification failed, please Login again.')
        }
        data.roles = data.authorities || [''];
        let name = data.name;
        let avatar = data.avatar || 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif';
        // if(!data.roles){
        //   alert(2);
        // 	data.roles = [''];
        // }
        // alert(data.roles);
        // let { roles, name, avatar } = data
        // // roles must be a non-empty array
        // if (!roles || roles.length <= 0) {
        // 	roles = [''];
        //   //reject('getInfo: roles must be a non-null array!')
        // }
        // alert('1'+roles);
        commit('SET_ROLES', data.roles)
        commit('SET_NAME',  name)
        commit('SET_AVATAR', avatar)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(response => {
        commit('SET_TOKEN', response.access_token)
        removeToken()
        resetRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_REFRESH_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // remove token
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      refresh({refresh_token: getRefreshToken()}).then(response => {
        setToken(response.access_token)
        setRefreshToken(response.refresh_token)
        commit('SET_REFRESH_TOKEN', response.refresh_token)
        commit('SET_TOKEN', response.access_token)
        reloadRouter()
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
