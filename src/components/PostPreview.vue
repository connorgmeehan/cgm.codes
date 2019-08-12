<template>
  <div :class="getWrapperClassName" :id="postdata.id">
    <div class="PostPreview">
      <video v-if="postdata.video !== null"
      class="PostPreview_MediaBackground"
      :src="postdata.video" autoplay muted loop />
      <g-image v-if="postdata.video === null && postdata.image !== null"
        class="PostPreview_MediaBackground"
        :src="postdata.image" > </g-image>
      <g-link :to="postdata.path">
        <h1 class="PostPreview_Title__Stroke">{{postdata.title}}</h1>
        <h1 class="PostPreview_Title"
          @scroll="this.handleMouseLeave"
          @mouseover="this.handleMouseOver"
          @mouseleave="this.handleMouseLeave">
            {{postdata.title}}
          </h1>
      </g-link>
    </div>
    <div class="PostPreview_DescriptionBlock container">
      <h3 class="PostPreview_ShortDescription">{{postdata.shortdescription}}</h3>
      <h3 class="PostPreview_Date">{{month}}<br>{{year}}</h3>
    </div>
  </div>
</template>

<script>
import DateFormatter from '~/helpers/DateFormatter';

export default {
  name: "PostPreview",
  props: ["postdata"],
  data: () => ({
    isHover: false,
  }),
  methods: {
    handleMouseOver() {
      this.isHover = true;
      window.addEventListener('scroll', this.handleScroll);
    },
    handleMouseLeave() {
      this.isHover = false;
      window.removeEventListener('scroll', this.handleScroll);
    },
    handleScroll(e) {
      this.handleMouseLeave();
    }
  },
  computed: {
    getWrapperClassName() {
      return (this.isHover
        ? "PostPreview_Wrapper PostPreview_Wrapper__Hover"
        : "PostPreview_Wrapper");
    },
    month() {
      const dateFormatter = new DateFormatter(this.postdata.date);
      return dateFormatter.getMonth()
    },
    year() {
      const dateFormatter = new DateFormatter(this.postdata.date);
      return dateFormatter.getYear();
    }
  }
}
</script>
