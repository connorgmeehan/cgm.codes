<template>
  <Layout>
    <div class="PostHeader_Wrapper">
      <div class="PostHeader">
        <video v-if="$page.post.video !== null"
          class="PostHeader_Media"
          :src="$page.post.video" autoplay muted loop />
        <h1 class="PostHeader_Title">{{$page.post.title}}</h1>
        <h1 class="PostHeader_Title__Stroke">{{$page.post.title}}</h1>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  name: "Post",
  metaInfo () {
    return {
      title: this.$page.post.title,
      meta: [
        {
          name: 'description',
          content: this.$page.post.description
        }
      ]
    }
  }
};
</script>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    title
    path
    date (format: "D. MMMM YYYY")
    timeToRead
    shortdescription
    content
    image
    video
  }
}

</page-query>
