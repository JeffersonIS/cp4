<template lang="html">
  <div class="">
    <h1>Upload a Recipe</h1>
    <div class="">
      <div class="form-row">
        <div class="form-group form-col col-md-4">
          <label>Recipe Name</label><input class="form-control" v-model="recipeName" placeholder="type here"><br>
          <label>Recipe Description</label><input class="form-control" v-model="recipeDescription" placeholder="type here"><br>
          <label>Setup Time <small>(mins)</small> </label><input class="form-control" type="number" v-model="setupTime" placeholder="enter time"><br>
          <label>Cook Time <small>(mins)</small></label><input class="form-control" type="number" v-model="cookTime" placeholder="enter time"><br>
          <label>Recipe Category</label><input class="form-control" v-model="recipeCategory" placeholder="select"><br>
          <div  v-if="uploadSuccess">
            <p style="color: green">Recipe '{{recipeAdded.name}}' uploaded successfully!</p>
            <!-- <h2>{{addItem.title}}</h2>
            <img :src="addItem.path" /> -->
          </div>
          <button class="btn btn-success upload" @click="upload">Upload Recipe</button>
        </div>
        <div class="form-group form-col col-md-4 ml-3">
          <label>Directions</label><textarea class="form-control" style="min-height: 6em;"  v-model="recipeDirections" placeholder="enter directions"></textarea><br>
          <label>Publisher/Author</label><input class="form-control" v-model="recipeAuthor" placeholder="select"><br>

          <label>Recipe Image</label>
          <input type="file" name="photo" @change="fileChanged">
        </div>
      </div>
    </div>
    <br>
    <hr>
    <h1>Upload a Person</h1>
      <div class="form-row">
        <div class="form-group form-col col-md-4">
          <label>Name</label><input class="form-control" v-model="personName" placeholder="name"><br>
          <label>Experience Level <small>(1-10)</small> </label><input type="number" class="form-control" v-model="personExperience" placeholder="enter number"><br>
          <label>Hometown<small></small> </label><input class="form-control" v-model="personHometown" placeholder="hometown"><br>
          <label>Cuisine Expertise<small></small></label><input class="form-control"  v-model="personExpertise" placeholder="enter cuisine"><br>
          <div  v-if="uploadSuccessPerson">
            <p style="color: green">Person '{{personAdded.name}}' uploaded successfully!</p>

          </div>
          <button class="btn btn-info upload" @click="uploadPerson">Upload Person</button>
        </div>
        <div class="form-group form-col col-md-4 ml-3">
          <label>Description</label><textarea class="form-control" v-model="personDescription" placeholder="add additional information"></textarea><br>

          <label>Add an profile image</label>
          <input type="file" name="photo" @change="fileChangedPerson">
        </div>
      </div>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Upload',
  data() {
    return {
      //Recipe
      recipeName: "",
      recipeDescription: "",
      recipeDirections: "",
      setupTime: null,
      cookTime: null,
      recipeAuthor: "",
      recipeCategory: "",
      file: null,
      //Person
      personName: '',
      personExperience: null,
      personExpertise: '',
      personHometown: '',
      personDescription: '',
      personFile: null,
      //Upload Updates
      uploadSuccess: null,
      uploadSuccessPerson: null,
      recipeAdded: null,
      personAdded: null,
      recipes: [],
      findTitle: "",
      findItem: null,
    }
  },
  computed: {
    suggestions() {
      // let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      // return items.sort((a, b) => a.title > b.title);
      return null
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    fileChangedPerson(event) {
      this.personFile = event.target.files[0]
    },
    async upload() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/recipes', {
          name: this.recipeName,
          description: this.recipeDescription,
          directions: this.recipeDirections,
          setupTime: this.setupTime,
          cookTime: this.cookTime,
          publisher: this.recipeAuthor,
          category: this.recipeCategory,
          path: r1.data.path
        });
        this.recipeAdded = r2.data;
        this.uploadSuccess = true;
        //this.reset();
      } catch (error) {
        this.uploadSuccess = false;
        console.log(error);
      }
    },
    async uploadPerson() {
      try {
        const formData = new FormData();
        formData.append('photo', this.personFile, this.personFile.name)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post('/api/people', {
          name: this.personName,
          experience: this.personExperience,
          path: r1.data.path,
          expertise: this.personExpertise,
          hometown: this.personHometown,
          description: this.personDescription,
        });
        this.personAdded = r2.data;
        this.uploadSuccessPerson = true;
        //this.reset();
      } catch (error) {
        this.uploadSuccessPerson = false;
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          title: this.findItem.title,
          description: this.findItem.description,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
    },
    // reset() {
    //   this.recipeName = "",
    //   this.recipeDescription = "",
    //   this.recipeDirections = "",
    //   this.recipeAuthor = "",
    //   this.recipeCategory = "",
    //   this.cookTime = null,
    //   this.setupTime = null,
    //   this.file = null,
    // }
  }
}
</script>

<style scoped>

.form label{
  margin-right: 2em;
}

.form *{
  margin-top: .5em;
}

.form-col{
  margin-right: 2em;
}

input, button {
  padding: 3px;
  margin-right: 5px;
}
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}

.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}
</style>
