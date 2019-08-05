<template>
  <div class="IconCabinet">
    <h3 class="IconCabinet_Title">{{title}}</h3>
    <div class="IconCabinet_Track">

      <div class="IconCabinet_Element" v-for="(icon, i) in data" :key="i">
        {{i}}
      </div>

    </div>
  </div>

</template>

<script>
export default {
    props: ["title", "data"]
}
</script>