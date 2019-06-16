import axios from 'axios'
// npm install axios的时候默认会安装qs
// qs相关的问题请搜索"nodejs qs"或者看这里https://www.npmjs.com/package/qs
import qs from 'qs'
import store from '@/store'
import {MessageBox, Message, Notification} from 'element-ui'
import {getToken, getRefreshToken} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.data = config.data || {}
    // do something before request is sent
    if (getToken() != '') {
      // let each request carry token --['X-Token'] as a custom key.
      // please modify it according to the actual situation.
      config.headers['Authorization'] = 'bearer ' + getToken()
    }
    if (config.method.toLocaleLowerCase() === 'post') {
      config.headers['content-type'] = 'application/x-www-form-urlencoded;charset=utf-8'
      config.data = qs.stringify(config.data)
    }
    console.log(config);
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code.
   */
  response => {
    const res = response.data

    if (res.access_token) {
      return res
    }

    // if the custom code is not 20000, it is judged as an error.
    if (!res.success) {
      if (res.code == '10000') {
        store.dispatch('user/refreshToken').catch((e) => {
          MessageBox.confirm('您的登录已过期,您可以选择重新登录', 'Confirm logout', {
            confirmButtonText: 'Re-Login',
            cancelButtonText: 'Cancel',
            type: 'warning'
          }).then(() => {
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          }).catch(() => {});
        })
        return res
      }
      if (res.errors) {
        res.errors.forEach(item => {
          setTimeout(() => {
            Notification.error({
              // title: item.name,
              message: item.msg
            });
          }, 500)
        })
      }
      if (res.code == '0000') {
         return res
      }
      // Message({
      //   message: res.respMsg || 'error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//    if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
// //      // to re-login
// //      MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
// //        confirmButtonText: 'Re-Login',
// //        cancelButtonText: 'Cancel',
// //        type: 'warning'
// //      }).then(() => {
// //        store.dispatch('user/resetToken').then(() => {
// //          location.reload()
// //        })
// //      })
//    }
      return Promise.reject(res || 'error')
    } else {
      return res
    }
  },
  error => {
    if (error.response.status != '401' && error.response.data && error.response.data.error != "invalid_token") {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(error)
    }
    return Promise.reject();
  }
)

export default service
