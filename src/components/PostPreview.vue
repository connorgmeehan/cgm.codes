<template>
  <div
    :class="getWrapperClassName"
    :id="postdata.id">
    <div class="PostPreview">
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
      <g-link :to="postdata.path">
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
</template>

<script>
import DateFormatter from '~/helpers/DateFormatter';
import MouseHelper from '../helpers/MouseHelper';

export default {
  name: "PostPreview",
  props: ['postdata'],
  data: () => ({
    isHover: false,
    mouseHelper: {},
  }),
  mounted: function() {
    console.log(this);
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
  },
  mounted: function() {
    this.mouseHelper = new MouseHelper().get();
  },
  methods: {
    handleMouseOver() {
      this.isHover = true;
      window.addEventListener('scroll', this.handleScroll);
    },
    handleMouseLeave() {
      this.isHover = false;
      window.removeEventListener('scroll', this.handleScroll);
    },
    handleScroll() {
      if(!this.mouseHelper.isMouseInsideBounds(this.$refs['title'])) {
        this.handleMouseLeave();
      }
    }
  }
}
</script>
