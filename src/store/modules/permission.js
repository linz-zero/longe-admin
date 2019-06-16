import {asyncRoutes, constantRoutes} from '@/router'

import Layout from '@/layout'

import {resourceMenuTree} from '@/api/user' //调用模块接口
import {isNotNull} from '@/utils'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = {
      ...route
    }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

/**
 * 根据服务器传来的树结构拼接成router对应的菜单
 * @param {Object} item
 */
export function myAsyncRoutes(item, flag) {
  const res = []
  item.forEach(items => {
    if (items.path) {
      let d = {}
      //通用的配置
      d.path = (!isNotNull(flag) ? '/' : '') + items.path
      d.meta = {
        title: items.name || '未配置',
        icon: items.icon || 'el-icon-position',
        roles: items.roles
      }
      d.name = items.name || '未配置';
      //一级路由配置
      if (!flag) {
        d.component = Layout
        d.redirect = 'noRedirect'
        d.alwaysShow = true
      }
      //如果有子级并且url等于空，则递归获取子级
      if (!isNotNull(items.url) && items.children) {
        d.children = myAsyncRoutes(items.children, true)
      } else {
        if (isNotNull(items.url)) {
          if (flag) {//如果是递归进来的子级，直接返回子级组件
            d.component = () => import(`@/pages/${items.url}`)
          } else {
            //当只有一级的时候路由配置
            d.path = '/' + items.path
            d.alwaysShow = false
            d.component = Layout
            d.children = [{
              path: items.url.startsWith('http') ? items.url : '',
              component: items.url.startsWith('http') ? null : () => import(`@/pages/${items.url}`),
              meta: {
                title: items.name || '未配置title',
                icon: items.icon || 'el-icon-position',
                noCache: true,
                affix: true,
                roles: items.roles
              }
            }]
          }
        }
      }
      res.push(d)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({commit}, roles) {
    return new Promise(resolve => {
      let accessedRoutes = [];
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || []
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      resourceMenuTree().then(res => {
        if (res.success) {
          //accessedRoutes.concat(myAsyncRoutes(res.data.menus))
          accessedRoutes = myAsyncRoutes(res.data.menus, false)
          console.log(accessedRoutes);
        }
        accessedRoutes.push({
          path: '*',
          redirect: '/404',
          hidden: true
        })
        commit('SET_ROUTES', accessedRoutes)
        resolve(accessedRoutes)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
