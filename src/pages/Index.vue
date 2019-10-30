<template>
  <Layout>
    <div>
      <div class="Hero_Wrapper">
        <!-- <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" style="position: absolute; top: 0; width: 100%;"/> -->
        <div class="Hero container">
          <div
            id="Hero_CanvasContainer"
            class="Hero_Copy">
            <h1>
              Hi my name is Connor, I study <a href="">Design Computing</a> at <a href="">USYD</a> and I want to create technology creatively.
            </h1>
          </div>
          <div class="Hero_Sidebar">
            <div class="Hero_History">
              <HeroHistory />
            </div>
            <div class="Hero_CabinetWrapper">
              <div class="Hero_IconCabinet">
                <IconCabinet 
                  :data="$static.metadata.technologies"
                  title="Technologies" />
              </div>
              <div class="Hero_IconCabinet">
                <IconCabinet
                  :data="$static.metadata.socials"
                  title="Socials" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Blurb_Wrapper">
        <div class="Blurb container">
          <h3 class="article-heading-4">As a Design Computing student with a background in coding, I am interested in the future of creative technologies. I have wide ranging practice based knowledge using creative coding languages and have built several interactive artworks.<br>
          I have a particular interest in interaction design and exploring the ways we can use technology to build immersive playful or reflective environments.<br>
          <br>
          Here are some of my works...</h3>
        </div>
      </div>
      <div class="Works_Wrapper">
        <div class="Works">
          <div 
            v-for="post in posts"
            :key="post.id"
            class="Works_PostPreview">
            <PostPreview
              :postdata="post" />
          </div>
        </div>  
      </div>
    </div>
  </Layout>
</template>

<script>
import HeroHistory from '../components/HeroHistory';
import IconCabinet from '../components/IconCabinet';
import PostPreview from '../components/PostPreview';
export default {
  metaInfo: {
    title: 'cgm.codes'
  },
  components: {
    HeroHistory,
    IconCabinet,
    PostPreview
  },
  computed: {
    posts: function () {
      return this.$static.allPost.edges.map(el => el.node);
    }
  },
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
  metadata {
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