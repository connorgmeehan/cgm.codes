<template>
  <Layout>
    <div class="PostHeader_Wrapper" v-if="$page">
      <div class="PostHeader">
        <video v-if="$page.post.video !== null"
          class="PostHeader_Media"
          :src="$page.post.video" autoplay muted loop />
      </div>
      <div class="PostInfo_Wrapper">
        <div class="PostInfo container-narrow">
          <h5 class="PostInfo_Date">{{$page.post.date}} - ({{$page.post.duration}})</h5>

          <h1 class="PostInfo_Title">{{$page.post.title}}</h1>

          <h4 class="PostInfo_Description">{{$page.post.description}}</h4>
          <div class="PostInfo_TextCabinet">
            <TextCabinet title="My Role" :elements="$page.post.myrole" />
          </div>
          <div class="PostInfo_TextCabinet">
            <TextCabinet title="Team" :elements="$page.post.team" />
          </div>
        </div>
      </div>
      <div class="Post">
        <div class="Post_Content container-narrow" v-html="$page.post.content" />
      </div>
    </div>
  </Layout>
</template>

<script>
import TextCabinet from '../components/TextCabinet';

export default {
  name: "Post",
  metaInfo () {
    return {
      title: this.$page && this.$page.post.title,
      meta: [
        {
          name: 'description',
          content: this.$page && this.$page.post && this.$page.post.description
        }
      ]
    }
  },
  mounted: function () {
    if(this.$page) {
      console.log(this.$page.post)
      console.log(this.$page.post.team);
    }
  },
  components: {
    TextCabinet,
  }
};
</script>

<page-query>
query Post ($path: String!) {
  post: post (path: $path) {
    title
    path
    date (format: "D. MMMM YYYY")
    duration
    timeToRead
    team {
      name
      link
    }
    myrole {
      name
      link
    }
    description
    shortdescription
    content
    image
    video
  }
}
</page-query>
