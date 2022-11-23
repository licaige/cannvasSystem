//pc端的路由
export const pcRoutes = [
  //页面初始化
  {
    path: "/",
    redirect: "/HomePage",
  },
  //首页
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "/" */ "@views/Pc/Layout/index.vue"),
    meta: { title: "页面初始化" },
    children: [
      //首页
      {
        path: "/HomePage",
        name: "HomePage",
        component: () =>
          import(
            /* webpackChunkName: "HomePage" */ "@views/Pc/HomePage/index.vue"
          ),
        meta: { title: "首页" },
      },
      //首页详情页
      {
        path: "/HomePageDetail",
        name: "HomePageDetail",
        component: () =>
          import(
            /* webpackChunkName: "HomePageDetail" */ "@views/Pc/HomePage/HomePageDetail.vue"
          ),
        meta: { title: "首页详情页" },
      },
    ],
  },
  //解决方案
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "/" */ "@views/Pc/Layout/index.vue"),
    meta: { title: "页面初始化" },
    children: [
      //解决方案
      {
        path: "/Solution",
        name: "Solution",
        component: () =>
          import(
            /* webpackChunkName: "Solution" */ "@views/Pc/Solution/index.vue"
          ),
        meta: { title: "解决方案" },
      },
    ],
  },
  //产品
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "/" */ "@views/Pc/Layout/index.vue"),
    meta: { title: "页面初始化" },
    children: [
      //产品
      {
        path: "/Product",
        name: "Product",
        component: () =>
          import(
            /* webpackChunkName: "Product" */ "@views/Pc/Product/index.vue"
          ),
        meta: { title: "产品" },
      },
    ],
  },
  //生态建设
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "/" */ "@views/Pc/Layout/index.vue"),
    meta: { title: "页面初始化" },
    children: [
      //生态建设
      {
        path: "/Solution",
        name: "Solution",
        component: () =>
          import(
            /* webpackChunkName: "Solution" */ "@views/Pc/Solution/index.vue"
          ),
        meta: { title: "生态建设" },
      },
    ],
  },
  //人才发展
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "/" */ "@views/Pc/Layout/index.vue"),
    meta: { title: "页面初始化" },
    children: [
      //人才发展
      {
        path: "/Talent",
        name: "Talent",
        component: () =>
          import(/* webpackChunkName: "Talent" */ "@views/Pc/Talent/index.vue"),
        meta: { title: "人才发展" },
      },
    ],
  },
  //公司介绍
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "/" */ "@views/Pc/Layout/index.vue"),
    meta: { title: "页面初始化" },
    children: [
      //公司介绍
      {
        path: "/CompanyProfile",
        name: "CompanyProfile",
        component: () =>
          import(
            /* webpackChunkName: "CompanyProfile" */ "@views/Pc/CompanyProfile/index.vue"
          ),
        meta: { title: "公司介绍" },
      },
    ],
  },
];
