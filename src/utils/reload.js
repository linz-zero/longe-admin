import store from '@/store'
import router from '@/router'


export function reloadRouter() {
  let views = store.state.tagsView.visitedViews
  let view = null
  views.forEach(item=>{
    if(router.app._route.fullPath == item.fullPath){
      view = item
    }
  })
  if(view == null){
    return false
  }
  store.dispatch('tagsView/delCachedView', view).then(() => {
    const { fullPath } = view
      router.replace({
        path: '/redirect' + fullPath
      })
  })
}
