<template>
  <div>
    <div v-bind:key="post.id" v-for="post in posts">
      <PostItem v-bind:post="post" v-on:del-post="$emit('del-post', post._id)" v-on:edit-post="$emit('edit-post', post)" modalName=post._id />
    </div>
  </div>
</template>

<script>
import PostItem from './PostItem.vue';
export default {
  name: "Posts",
  components: {
    PostItem
  },
  props: ["posts"]
}
</script>

<style scoped>
</style>