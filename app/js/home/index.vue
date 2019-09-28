<template>
  <div :class="$style.home">
    <h1>
      Home
      <p class="title">Description</p>  
    </h1>
  </div>
</template>

<script>
function multi(a, b) {
  return a * c
}
  export default {
    name: 'Home'
  }
</script>

<style lang="scss" module>
  @import "../../css/reset.scss";

  .home {
    background-color: #ddd;
    font-size: 80px;
  }
</style>