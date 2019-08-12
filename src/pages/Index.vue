<template>
  <Layout>

    <div class="Hero_Wrapper" id="Hero_CanvasContainer">
      <!-- <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" style="position: absolute; top: 0; width: 100%;"/> -->
      <div class="Hero container">
        <div class="Hero_Copy">
          <h1>
            Hello my name is Connor and I'm interested in the intersection between humans and technology.
          </h1>
        </div>
        <div class="Hero_Sidebar">
          <div class="Hero_History">
            <HeroHistory />
          </div>
          <div class="Hero_CabinetWrapper">
            <div class="Hero_IconCabinet">
              <IconCabinet title="Technologies" :data="$static.metaData.technologies" />
            </div>
            <div class="Hero_IconCabinet">
              <IconCabinet title="Socials" :data="$static.metaData.socials" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="Works_Wrapper">
      <div lcass="Works container">
        <div class="Works">

          <div class="Works_PostPreview" v-for="post in this.posts" :key="post.id">
            <PostPreview
              :postdata="post"/>
          </div>

        </div>  
      </div>
    </div>
  </Layout>
</template>

<script>
import PerlinBackground from '../classes/PerlinBackground';

import HeroHistory from '../components/HeroHistory';
import IconCabinet from '../components/IconCabinet';
import PostPreview from '../components/PostPreview';
export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    HeroHistory,
    IconCabinet,
    PostPreview
  },
  data: function() {
    return {
      perlinBackground: null,
    };
  },
  computed: {
    posts: function () {
      return this.$static.allPost.edges.map(el => el.node);
    }
  },
  mounted: function () {
    console.log("mounted again");
    const perlinTarget = document.querySelector('.Hero_Wrapper');
    const backgroundColor = '#F88379';
    if (this.perlinBackground === null) {
      this.perlinBackground = new PerlinBackground(perlinTarget, backgroundColor);
    }
  },
  beforeDestroy: function () {
    if (this.perlinBackground !== null) {
      this.perlinBackground.kill();
      this.perlinBackground = null;
    }
  }
  
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>


<static-query>
query {
  allPost {
    edges {
      node {
        id
        title
        shortdescription
        image
        video
        path
        date
      }
    }
  }
  metaData {
    technologies {
      name
      icon
      link
    }
    socials {
      name
      icon
      link
    }
  }
}
</static-query>