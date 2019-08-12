<template>
  <div :class="getWrapperClassName" :id="postdata.id">
    <div class="PostPreview">
      <video v-if="postdata.video !== null"
      class="PostPreview_MediaBackground"
      :src="postdata.video" autoplay muted loop />
      <g-image v-if="postdata.video === null && postdata.image !== null"
        class="PostPreview_MediaBackground"
        :src="postdata.image" > </g-image>
      <h1 class="PostPreview_Title__Stroke">{{postdata.title}}</h1>
      <h1 class="PostPreview_Title" @mouseover="this.handleMouseOver" @mouseleave="this.handleMouseLeave">{{postdata.title}}</h1>
    </div>
    <div class="PostPreview_DescriptionBlock">
      <h2 class="PostPreview_ShortDescription">{{postdata.shortdescription}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostPreview",
  props: ["postdata"],
  data: () => ({
    isHover: false,
  }),
  mounted: function () {
    console.log(this.postdata);
  },
  methods: {
    handleMouseOver() {
      this.isHover = true;
    },
    handleMouseLeave() {
      this.isHover = false;
    }
  },
  computed: {
    getWrapperClassName() {
      return (this.isHover
        ? "PostPreview_Wrapper PostPreview_Wrapper__Hover"
        : "PostPreview_Wrapper");
    },
  }
}
</script>
