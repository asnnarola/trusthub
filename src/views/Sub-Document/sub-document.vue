<template>
  <h1>helo {{slug}}</h1>
</template>
<script>
export default {
  data(){
    slug : this.$router.params.slug
  },
}
</script>
