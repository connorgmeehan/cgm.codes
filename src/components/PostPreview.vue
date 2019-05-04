<template>
  <g-link :to="post.path">
    <div class="PostPreview">
      <h2 class="PostPreview_Title">{{post.title}}</h2>
      <p class="PostPreview_Description">{{post.desc}}</p>
    </div>
  </g-link>
</template>

<script>
export default {
  props: ['post']
}
</script>

<style lang="scss">
.PostPreview {
  &_Title {
    text-decoration: none;
    color: $title-color;
  }

  &_Description {
    text-decoration: none;
    color: $copy-color;
  }
}
</style>
