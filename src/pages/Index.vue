<template>
  <Layout bigTitle="connorgmeehan.com">
    
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <g-image alt="Example image" src="~/favicon.png" width="135" />
    
    <h1>Hello, world!</h1>
   
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur excepturi labore tempore expedita, et iste tenetur suscipit explicabo! Dolores, aperiam non officia eos quod asperiores
    </p>

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
