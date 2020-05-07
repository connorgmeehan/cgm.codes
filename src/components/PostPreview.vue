<template>
  <div
    :class="getWrapperClassName"
    :id="postdata.id">
    <div class="PostPreview">
      <div class="PostPreview_MediaBlock">
        <video
          v-if="postdata.video !== null"
          :src="postdata.video"
          class="PostPreview_MediaBackground"
          autoplay
          muted
          loop />
        <g-image
          v-if="postdata.video === null && postdata.image !== null"
          :src="postdata.image"
          class="PostPreview_MediaBackground" />
        <g-link 
          :to="postdata.path"
          class="PostPreview_TitleContainer">
          <h1 class="PostPreview_Title__Stroke">
            {{ postdata.title }}
          </h1>
          <h1
            :ref="'title'"
            @scroll="handleMouseLeave"
            @mouseover="handleMouseOver"
            @mouseleave="handleMouseLeave"
            class="PostPreview_Title">
            {{ postdata.title }}
          </h1>
        </g-link>
      </div>
      <div class="PostPreview_DescriptionBlock container">
        <h3 class="PostPreview_ShortDescription">
          {{ postdata.shortdescription }}
        </h3>
        <h3 class="PostPreview_Date">
          {{ month }}<br>{{ year }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import DateFormatter from '~/helpers/DateFormatter';
import MouseHelper from '../helpers/MouseHelper';

export default {
  name: "PostPreview",
  props: ['postdata', 'index'],
  data: () => ({
    isHover: false,
    mouseHelper: {},
  }),
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
  },
  mounted: function() {
    this.mouseHelper = new MouseHelper();
  },
  methods: {
    handleMouseOver() {
      this.isHover = true;
      window.addEventListener('scroll', this.handleScroll);
      this.$emit('update-hover', this.index);
    },
    handleMouseLeave() {
      this.isHover = false;
      window.removeEventListener('scroll', this.handleScroll);
      this.$emit('update-hover', -1);
      console.log(this.mouseHelper.x);
    },
    handleScroll() {
      if(!this.mouseHelper.isMouseInsideBounds(this.$refs['title'])) {
        this.handleMouseLeave();
      }
    }
  }
}
</script>
