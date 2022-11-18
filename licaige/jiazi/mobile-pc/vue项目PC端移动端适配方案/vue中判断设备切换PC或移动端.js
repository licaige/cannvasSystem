export const isPhone = () => {
  const flag = navigator.userAgent.match( // match方法可在字符串内检索指定的值，
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
  if (flag) {
    return false
  } else {
    return true
  }
}


router.beforeEach((to, from, next) => { // 判断设备切换PC或移动端
  if (isPhone()) {
    const routerpc = router.options.routes.filter(v => v.name === 'Pc')[0].children // 过滤出m_index下的路由
    let add = '' // 定义即将跳转的path地址
    routerpc.filter((item) => { // 遍历刚才取出来路由组routers
      if (item.name === to.path.split('/')[1]) { // 判断 item在“_”分割后的值 和 即将跳转的path在"_" 分割后的值 是否有相同，这一步判断要求 在设置路由时，尽量保持和 格式名称一致，eg:"p_home" / "m_home"
        add = item.path
      }
    })
    if (add) {
      next()
    } else {
      next('/Pc')
    }
  } else {
    const routersphone = router.options.routes.filter(v => v.name === 'Phone')[0].children // 过滤出m_index下的路由
    let res = '' // 定义即将跳转的path地址
    routersphone.filter((item) => { // 遍历刚才取出来路由组routers
      if (item.name === to.path.split('/')[1]) { // 判断 item在“_”分割后的值 和 即将跳转的path在"_" 分割后的值 是否有相同，这一步判断要求 在设置路由时，尽量保持和 格式名称一致，eg:"p_home" / "m_home"
        res = item.path
      }
    })
    if (res) {
      next()
    } else {
      next('/Phone')
    }
  }
})
