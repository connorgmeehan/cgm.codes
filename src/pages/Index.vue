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
              Hello my name is Connor and I'm interested in the intersection between humans and technology.
            </h1>
          </div>
          <div class="Hero_Sidebar">
            <div class="Hero_History">
              <HeroHistory />
            </div>
            <div class="Hero_CabinetWrapper">
              <div class="Hero_IconCabinet">
                <IconCabinet 
                  :data="$static.metaData.technologies"
                  title="Technologies" />
              </div>
              <div class="Hero_IconCabinet">
                <IconCabinet
                  :data="$static.metaData.socials"
                  title="Socials" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Works_Wrapper">
        <div lcass="Works container">
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