<template>
  <div>
    <b-form @submit.prevent="addPost" >
      <b-form-group id="input-group-2" label="Write a new post:" label-for="input-2">
        <b-form-input
        id= "input-2"
         type="text" v-model="title" name="title" placeholder="Post Title" required></b-form-input>
      </b-form-group>
      <b-form-textarea
      id="textarea"
      v-model="description"
      name="description" placeholder="Post Description"
      rows="3"
      max-rows="6"
      required></b-form-textarea>
      <b-button type="submit" variant="success">Add Post</b-button>

    </b-form>
  </div>
</template>

<script>

export default {
  name: "AddPost",
  data() {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    addPost() {
      const newPost = {
        title: this.title,
        description: this.description,
      }
      // Send up to parent
      this.$emit('add-post', newPost);
      this.title = '';
      this.description = '';
    }
  }
}
</script>

<style scoped>
</style>
