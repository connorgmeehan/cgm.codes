export default [
  {
    name: "home",
    path: "/",
    component: () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/home/connorgm/workspace/connorgmeehan.com/src/pages/Index.vue")
  },
  {
    path: "/blog/gamma-flow",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/home/connorgm/workspace/connorgmeehan.com/src/templates/Post.vue"),
    meta: {
      data: [1,"61caedf8"]
    }
  },
  {
    path: "/blog/koala-n-joey",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/home/connorgm/workspace/connorgmeehan.com/src/templates/Post.vue"),
    meta: {
      data: [1,"5c0a00b6"]
    }
  },
  {
    path: "/blog/ulaanbaatar",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/home/connorgm/workspace/connorgmeehan.com/src/templates/Post.vue"),
    meta: {
      data: [1,"3736a087"]
    }
  },
  {
    path: "/blog/presence",
    component: () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/home/connorgm/workspace/connorgmeehan.com/src/templates/Post.vue"),
    meta: {
      data: [1,"278b732b"]
    }
  },
  {
    name: "404",
    path: "/404",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/home/connorgm/workspace/connorgmeehan.com/node_modules/gridsome/app/pages/404.vue")
  },
  {
    name: "*",
    path: "*",
    component: () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/home/connorgm/workspace/connorgmeehan.com/node_modules/gridsome/app/pages/404.vue")
  }
]

