<template>
  <Layout>
    <div>
      <div class="Hero_Wrapper">
        <!-- <video src="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4" style="position: absolute; top: 0; width: 100%;"/> -->
        <div class="Hero container">
          <div
            id="Hero_CanvasContainer"
            class="Hero_Copy container-narrow">
            <h1>
              Hi my name is Connor. <br>

              Bach. <a href="https://sydney.edu.au/courses/courses/uc/bachelor-of-design-computing.html" class="u--hyphens-auto">Design Computing</a> @ <a href="https://sydney.edu.au/">U. of Sydney</a>. <br>

              Jr. Frontend Engineer @ <a href="http://www.pacificmags.com.au/">Pacific Magazines</a>.

              <br>I am passionate about HCI &amp; creative tech.
            </h1>
          </div>
        </div>
      </div>
      <div 
        id="about" 
        class="Blurb_Wrapper">
        <div class="Blurb container-narrow">
          <h3 class="article-heading-4">
            As a Design Computing student with experience in software engineering I'm interested in the creative fusion of these two disciplines.  I combine design thinking with feasibility to create wonderful exploratory experiences, aiding in projects from problem area analysis to completion. 
            <br>
          </h3>
        </div>
      </div>
      <div 
        id="work"
        class="Works_Wrapper">
        <div class="Works">
          <h2 class="Works_Title">Previous Work</h2>
          <PostPreviewList :posts="posts" />
        </div>  
      </div>
    </div>
  </Layout>
</template>

<script>
import PostPreviewList from '../components/PostPreviewList';
export default {
  metaInfo: {
    title: 'cgm.codes'
  },
  components: {
    PostPreviewList
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
        tags
      }
    }
  }
}
</static-query>