<template>
    <div>
        <b-card :title="post.title">
            <b-button @click="$emit('del-post', post.id)" class="del" variant="danger">X</b-button>
            <!-- <b-button @click="$emit('edit-post', post)" class="del" variant="primary">Edit</b-button> -->
            <b-button v-b-modal.modal-prevent-closing class="edit">Edit</b-button>
            <b-card-text>
            {{post.description}}
            <p hidden=true>{{post._id}}</p>
            </b-card-text>
        </b-card>
        
        <b-modal
        :name="modalName"
        id="modal-prevent-closing"
        ref="modal"
        title="Edit your Post"
        @show="resetModal"
        @hidden="resetModal"
        @ok="handleOk"
        ok-only
        >
        <form ref="form" @submit.prevent="handleSubmit">
            <b-form-group
            :state="nameState"
            label="Post"
            label-for="name-input"
            invalid-feedback="All Content is required"
            >
                <b-form-input
                    id="name-input"
                    v-model="post.title"
                    :state="nameState"
                    required
                ></b-form-input>

                <b-form-textarea
                    id="textarea"
                    v-model="post.description"
                    name="description"
                    rows="3"
                    max-rows="6"
                    required>
                </b-form-textarea>
            </b-form-group>
      </form>
    </b-modal>        
</div>
</template>

<script>

export default {
  name: "PostItem",
  props: ["post", "modalName"],
  data() {
      return {
          title: "",
          description: "",
          id: "",
          nameState: null
      }
  },
  
  methods: {
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
      resetModal() {
        this.nameState = null
      },
      handleOk(bvModalEvt) {
        // Prevent modal from closing
        bvModalEvt.preventDefault()
        // Trigger submit handler
        this.handleSubmit()
      },
      handleSubmit() {
        // Exit when the form isn't valid
        if (!this.checkFormValidity()) {
          return
        }
        // Push the values to submitted names
        const newPost = {
            title: this.title,
            description: this.description,
        }
        // Send up to parent
        this.$emit('edit-post', newPost);
        this.title = '';
        this.description = '';
        
        // Hide the modal manually
        this.$nextTick(() => {
          this.$bvModal.hide('modal-prevent-closing')
        })
      },
      
  }
}

</script>

<style scoped>
  .post-item {
    background: #f4f4f4;
    padding: 10px;
    border-bottom: 1px #ccc dotted;
  }
  .del {
    /* border: none; */
    padding: 5px 9px;
    /* border-radius: 50%; */
    /* cursor: pointer; */
    float: right;
  }
  .edit {
    /* border: none; */
    padding: 5px 9px;
    /* border-radius: 50%; */
    /* cursor: pointer; */
    float: right;
  }
  .modal-header .close {
    display:none;
  }
  .modal-footer .cancel {
    display:none;
  }
  close {display: none;}
</style>