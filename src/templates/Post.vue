<template>
  <Layout>
    <div 
      v-if="$page"
      class="PostHeader_Wrapper">
      <div class="PostHeader">
        <video
          v-if="$page.post.video !== null"
          :src="$page.post.video"
          class="PostHeader_Media"
          autoplay
          muted
          loop />
      </div>
      <div class="PostInfo_Wrapper">
        <div class="PostInfo container-narrow">
          <h5 class="PostInfo_Date">
            {{ $page.post.date }} - ({{ $page.post.duration }})
          </h5>
          <h1 class="PostInfo_Title">
            {{ $page.post.title }}
          </h1>
          <p class="PostInfo_Description">
            {{ $page.post.description }}
          </p>
          <div 
            v-if="$page.post.myrole.length > 0"
            class="PostInfo_TextCabinet">
            <TextCabinet
              :elements="$page.post.myrole"
              :useTitleFont="true"
              title="My Role" /> 
          </div>
          <div
            v-if="$page.post.team.length > 0"
            class="PostInfo_TextCabinet">
            <TextCabinet
              :elements="$page.post.team"
              :useTitleFont="true"
              title="Team" />
          </div>
          <div class="PostInfo_IconTray">
            <a
              v-if="$page.post.git"
              :href="$page.post.git"
              class="PostInfo_IconTray_Icon">
              <span class="icon-github-logo" />
            </a>
          </div>
        </div>
      </div>
      <div class="Post">
        <div
          v-if="$page.post.iframe !== null"
          class="Post_FrameWrapper">
          <IFrameDisplay
            :url="$page.post.iframe.url"
            :fullscreen="$page.post.iframe.fullwidth" />
        </div>
        <div class="Post_Content container-narrow">
          <VueRemarkContent />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import TextCabinet from '../components/TextCabinet';
import IFrameDisplay from '../components/IFrameDisplay';

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
    components: {
    TextCabinet,
    IFrameDisplay,
  },
  mounted: function () {
    if(this.$page) {
      console.log(this.$page.post)
      console.log(this.$page.post.team);
    }
  }
};
</script>

<page-query>
query Post($path: String!) {
  post: post(path: $path) {
    title
    path
    date(format: "D. MMMM YYYY")
    duration
    iframe {
      url
      fullwidth
    }
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
    git
  }
}
</page-query>
