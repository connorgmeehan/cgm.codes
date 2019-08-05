<template>
  <div class="IconCabinet">
    <h3 class="IconCabinet_Title">{{title}}</h3>
    <div class="IconCabinet_Track">
      
      <a v-for="(el, i) in data" :key="i"
        :href="el.link"
        class="IconCabinet_Icon">
        <i :class="el.icon" />
        <span class="IconCabinet_Name">{{el.name}}</span>
      </a>
    </div>
  </div>

</template>

<script>
export default {
    props: ["title", "data"]
}
</script>