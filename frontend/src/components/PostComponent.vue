<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <AddPost v-on:add-post="addPost" />
    <hr/>
    <Posts v-bind:posts="posts" v-on:del-post="deletePost" v-on:edit-post="editPost"/>
  </div>
</template>

<script>
import AddPost from '../components/AddPost';
import Posts from '../components/Posts';

import axios from 'axios'
export default {
  name: 'PostComponent',
  components: {
    AddPost,
    Posts
  },

  data() {
    return {
      posts:[],
    }
  },
  
  
  methods: {
    deletePost(_id) {
      axios.delete(`http://localhost:5000/api/posts/${_id}`)
        .then(() => this.posts = this.posts.filter(post => post._id !== _id))
        .catch(err => console.log(err));
    },
    
     addPost(newPost) {
      const { title, description } = newPost;
      axios.post('http://localhost:5000/api/posts', {
        title,
        description
      })
        // .then(res => console.log(res.data.data))
        .then(res => this.posts = [...this.posts, res.data.data])
        .catch(err => console.log(err));
    },

    editPost(editedPost) {
      const { title, description, _id} = editedPost;
      axios.put(`http://localhost:5000/api/posts/${_id}`, {
        title,
        description
      })
        .then()
        .catch(err => console.log(err));
    },


  },
  
  created() {
    axios.get('http://localhost:5000/api/posts')
    .then(res => this.posts = res.data.data)
    // .then(res => console.log(res.data.data))
    .catch(err => console.log(err));
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>
