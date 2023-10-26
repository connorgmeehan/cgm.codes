const c1 = () => import(/* webpackChunkName: "page--src--templates--post-vue" */ "/Users/connormeehan/projects/personal/cgm.codes/src/templates/Post.vue")
const c2 = () => import(/* webpackChunkName: "page--node-modules--gridsome--app--pages--404-vue" */ "/Users/connormeehan/projects/personal/cgm.codes/node_modules/gridsome/app/pages/404.vue")
const c3 = () => import(/* webpackChunkName: "page--src--pages--index-vue" */ "/Users/connormeehan/projects/personal/cgm.codes/src/pages/Index.vue")

export default [
  {
    path: "/works/sea-of-tweets/",
    component: c1,
    meta: {
      $vueRemark: () => import(/* webpackChunkName: "vue-remark--blog--sea-of-tweets--index-md" */ "/Users/connormeehan/projects/personal/cgm.codes/blog/sea_of_tweets/index.md")
    }
  },
  {
    path: "/works/ulaanbaatar/",
    component: c1,
    meta: {
      $vueRemark: () => import(/* webpackChunkName: "vue-remark--blog--ulaanbaatar--index-md" */ "/Users/connormeehan/projects/personal/cgm.codes/blog/ulaanbaatar/index.md")
    }
  },
  {
    path: "/works/presence/",
    component: c1,
    meta: {
      $vueRemark: () => import(/* webpackChunkName: "vue-remark--blog--presence--index-md" */ "/Users/connormeehan/projects/personal/cgm.codes/blog/presence/index.md")
    }
  },
  {
    path: "/works/koala-n-joey/",
    component: c1,
    meta: {
      $vueRemark: () => import(/* webpackChunkName: "vue-remark--blog--koala-n-joey--index-md" */ "/Users/connormeehan/projects/personal/cgm.codes/blog/koala_n_joey/index.md")
    }
  },
  {
    path: "/works/face-d-tect/",
    component: c1,
    meta: {
      $vueRemark: () => import(/* webpackChunkName: "vue-remark--blog--face-d-tect--index-md" */ "/Users/connormeehan/projects/personal/cgm.codes/blog/face_d_tect/index.md")
    }
  },
  {
    path: "/works/codeflow/",
    component: c1,
    meta: {
      $vueRemark: () => import(/* webpackChunkName: "vue-remark--blog--codeflow--index-md" */ "/Users/connormeehan/projects/personal/cgm.codes/blog/codeflow/index.md")
    }
  },
  {
    name: "404",
    path: "/404/",
    component: c2
  },
  {
    name: "home",
    path: "/",
    component: c3
  },
  {
    name: "*",
    path: "*",
    component: c2
  }
]
