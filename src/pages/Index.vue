<template>
  <Layout bigTitle="connorgmeehan.com">
    <br>
    <br>
    <br>
    <br>
    <br>
    <h1>▇▇▇▇▇▇▇▇▇▇!</h1>
   
    <p>
      ▇▇▇▇▇▇▇▇ ▇▇▇▇▇▇▇▇▇ ▇▇ ▇▇▇▇▇▇ ▇▇▇▇▇▇ ▇▇▇▇▇▇ ▇▇▇▇▇▇▇▇▇▇▇ ▇ ▇▇▇ ▇▇▇▇ ▇▇▇ ▇▇▇▇ ▇▇ ▇▇▇ ▇▇▇▇▇▇ ▇▇▇▇▇▇ ▇▇▇▇▇▇ ▇▇▇▇▇▇▇▇▇▇▇ ▇▇▇▇▇ ▇ ▇▇▇ ▇▇▇▇▇ ▇▇▇ ▇▇▇▇▇ ▇▇▇
    </p>
    <br><br>

    <div class="Posts">
      <PostPreview v-for="post in posts" :key="post.id" :post="post.node" />
    </div>
  </Layout>
</template>

<page-query>
query {
  allPost {
    totalCount
    edges {
      node {
        id
        title
        slug
        path
        date
        desc
      }
    }
  }
}
</page-query> 

<script>
import PostPreviewVue from '../components/PostPreview.vue';

export default {
  components: {
    "PostPreview": PostPreviewVue
  },

  metaInfo: {
    title: 'Hello, world!'
  },

  data () {
    return {
      imgUrl: require("@/favicon.png")
    }
  },

  computed: {
    posts () {
      return this.$page.allPost.edges
    },
    totalCount () {
      return this.$page.allPost.totalCount
    }
  },

  methods: {
    onClick(post) {
      this.$router.push({path:post.node.path})
    }
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
