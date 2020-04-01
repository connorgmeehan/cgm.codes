<template>
  <div class="PostPreviewList">
    <PostPreviewListFilters
      :posts="posts"
      v-on:update-filter="activeFilters = $event" />
    <div class="PostPreviewList_Container">
      <div 
        v-for="(post, i) in posts"
        :key="post.id"
        :class="{
          PostPreviewList_Preview: true,
          PostPreviewList_Preview__BeforeHovered: activePostIndex != -1 && i < activePostIndex,
          PostPreviewList_Preview__AfterHovered: activePostIndex != -1 && i > activePostIndex,
          PostPreviewList_Preview__Hidden: shouldHidePost(post),
        }">
        <PostPreview
          :postdata="post"
          :index="i" 
          v-on:update-hover="activePostIndex = $event" />
      </div>
    </div>
  </div>
</template>

<script>
import PostPreview from '../components/PostPreview';
import PostPreviewListFilters from './PostPreviewListFilters';

export default {
  name: "PostPreviewList",
  components: {
    PostPreview,
    PostPreviewListFilters
  },
  props: {
    posts: {
      type: Array,
      default: () => [],
    }
  },
  data: function() {
    return {
      activeFilters: [],
      activePostIndex: -1,
    }
  },
  methods: {
    filteredPosts: function() {
      console.log(this.activeFilters);
      if (!this.activeFilters.length) {
        return this.posts;
      }
      return this.posts.filter(post => post.tags.some(tag => this.activeFilters.includes(tag)));
    },
    shouldHidePost: function(post) {
      if (!this.activeFilters.length) {
        return false;
      }
      return !this.activeFilters.every(tag => post.tags.includes(tag));
    }
  },
}
</script>