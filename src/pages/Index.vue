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

              I study <a href="https://sydney.edu.au/courses/courses/uc/bachelor-of-design-computing.html" class="u--hyphens-auto">Design Computing</a> @ <a href="https://sydney.edu.au/">The University of Sydney</a>. <br>

              I'm a Creative Developer @ <a href="http://www.codeoncanvas.cc/">Code On Canvas</a>.

              <br>I am passionate about the creative application of new technlogies.
            </h1>
          </div>
        </div>
        <ScrollArrow target="#about" />
      </div>
      <div 
        id="about" 
        class="Blurb_Wrapper">
        <div class="Blurb container-narrow">
          <h3 class="article-heading-4">
            As a Design Computing student with experience in software engineering I aim to combine an understanding of user focused design with frontend development to understand all stakeholders needs and rapidly develop products that users will love. 
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
import ScrollArrow from '../components/ScrollArrow';
export default {
  metaInfo: {
    title: 'cgm.codes'
  },
  components: {
    PostPreviewList,
    ScrollArrow
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