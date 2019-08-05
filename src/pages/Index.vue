<template>
  <Layout>

    <div class="Hero_Wrapper">
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
          <div class="Hero_IconCabinet">
            <IconCabinet title="Technologies" :data="$static.metaData.technologies" />
          </div>
          <div class="Hero_IconCabinet">
            <IconCabinet title="Socials" :data="$static.metaData.socials" />
          </div>
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
import IconCabinet from '../components/IconCabinet';
export default {
  metaInfo: {
    title: 'Hello, world!'
  },
  components: {
    HeroHistory,
    IconCabinet
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