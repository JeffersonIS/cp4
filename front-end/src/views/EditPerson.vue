<template lang="html">
  <div class="">
    <h1>Edit Person</h1>
    <div class="">
      <div class="form-row">
        <div class="form-group form-col col-md-4">
          <label>Name</label><input class="form-control" v-model="personName" placeholder="name"><br>
          <label>Experience Level <small>(1-10)</small> </label><input type="number" class="form-control" v-model="personExperience" placeholder="enter number"><br>
          <label>Hometown<small></small> </label><input class="form-control" v-model="personHometown" placeholder="hometown"><br>
          <label>Cuisine Expertise<small></small></label><input class="form-control"  v-model="personExpertise" placeholder="enter cuisine"><br>
          <div  v-if="editSuccess">
            <p style="color: green">Person '{{this.person.name}}' saved successfully!</p>

          </div>
          <button class="btn btn-info upload" @click="editPerson">Edit Person</button>
        </div>
        <div class="form-group form-col col-md-4 ml-3">
          <label>Description</label><textarea class="form-control" v-model="personDescription" placeholder="add additional information"></textarea><br>
          <img :src="this.person.path" class="thumbnail"/>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'EditRecipe',
  data() {
    return {
      person: null,
      personName: '',
      personExperience: null,
      personExpertise: '',
      personHometown: '',
      personDescription: '',
      editSuccess: null,
    }
  },
    created() {
      this.getItem()
    },
    methods: {
      async getItem() {
        try {
          let response = await axios.get("/api/person/" + this.$route.params.id);
          this.person = response.data;
          this.personName = this.person.name;
          this.personExperience = this.person.experience;
          this.personExpertise = this.person.expertise;
          this.personHometown = this.person.hometown;
          this.personDescription = this.person.description;
          console.log(response)
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async editPerson() {
        try {
          await axios.put("/api/person/" + this.person._id, {
            name: this.personName,
            description: this.personDescription,
            experience: this.personExperience,
            expertise: this.personExpertise,
            hometown: this.personHometown,
          });
          this.getItem();
          this.editSuccess = true;
          return true;
        } catch (error) {
          this.editSuccess = false;
          console.log(error);
        }
      },
    }
}
</script>

<style lang="css" scoped>
.thumbnail{
  max-height: 200px;
  width: auto;
}
</style>
