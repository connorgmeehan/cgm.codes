<template>
  <Layout>

    <div class="Hero_Wrapper">
      <div class="Hero">
        <div class="Hero_Copy">
          <h1>
            Hello my name is Connor and I'm interested in the intersection between humans and technology.
          </h1>
        </div>
        <div class="Hero_History">
          <HeroHistory />
        </div>
      </div>
    </div>
    <div class="Works_Wrapper">
      <div class="Works">
        <h2>My Works</h2>

      </div>  
    </div>
  </Layout>
</template>

<script>
import HeroHistory from '../components/HeroHistory';
export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    HeroHistory
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
