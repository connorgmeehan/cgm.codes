<template>
  <div class="PostPreviewListFilters_Container">
    <div class="PostPreviewListFilters">
      <div
        v-for="(tag, i) in tags"
        :key="i" 
        :class="{
          PostPreviewListFilters_Filter: true,
          PostPreviewListFilters_Filter__Active: activeTags.includes(tag),
        }"
        v-on:click="toggleFilter(tag)">
        {{ tag }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostPreviewListFilters",
  props: {
    posts: {
      type: Array,
      default: () => [],
    }
  },
  data: function() {
    console.log(this.posts);
    const postTags = this.posts.map(post => {
      return post.tags
    });
    let uniqueTags = [];
    postTags.forEach(tags => tags.forEach(tag => {
      if(!uniqueTags.includes(tag)) {
        uniqueTags.push(tag);
      }
    }))
    return { tags: uniqueTags, activeTags: [] };
  },
  methods: {
    toggleFilter: function(tagName) {
      console.log(this.activeTags);
      if (this.activeTags.includes(tagName)) {
        this.activeTags = this.activeTags.filter(activeTag => activeTag != tagName);        
      } else {
        this.activeTags.push(tagName);
      }
      this.$emit('update-filter', this.activeTags);
    }
  }
}
</script>

