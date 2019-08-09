<template>
  <div class="PostPreview" :id="postdata.id"
    @mouseover="this.onMouseOver"
    @mouseleave="this.onMouseLeave">
    <h1 class="PostPreview_Title">{{postdata.title}}</h1>
    <h2 class="PostPreview_ShortDescription">{{postdata.shortdescription}}</h2>
  </div>
    
</template>

<script>
export default {
  name: "PostPreview",
  props: ["postdata"],
  mounted: function () {
    console.log(this.postdata);
  },
  methods: {
    onMouseOver () {
      this.$emit('handleNewBackground', this.postdata.video, this.postdata.image);
    },
    onMouseLeave () {
      this.$emit('handleNewBackground', null);
    }
  }
}
</script>
