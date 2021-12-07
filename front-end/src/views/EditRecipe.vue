<template lang="html">
  <div class="">
    <h1>Edit Recipe</h1>
    <div class="">
      <div class="form-row">
        <div class="form-group form-col col-md-4">
          <label>Recipe Name</label><input class="form-control" v-model="recipeName" placeholder="type here"><br>
          <label>Recipe Description</label><input class="form-control" v-model="recipeDescription" placeholder="type here"><br>
          <label>Setup Time <small>(mins)</small> </label><input class="form-control" type="number" v-model="setupTime" placeholder="enter time"><br>
          <label>Cook Time <small>(mins)</small></label><input class="form-control" type="number" v-model="cookTime" placeholder="enter time"><br>
          <label>Recipe Category</label><input class="form-control" v-model="recipeCategory" placeholder="select"><br>
          <div  v-if="editSuccess">
            <p style="color: green">Recipe '{{this.recipe.name}}' saved successfully!</p>
          </div>
          <button class="btn btn-success upload" @click="editRecipe">Edit Recipe</button>
        </div>
        <div class="form-group form-col col-md-4 ml-3">
          <label>Directions</label><textarea class="form-control" style="min-height: 6em;"  v-model="recipeDirections" placeholder="enter directions"></textarea><br>
          <label>Publisher/Author</label><input class="form-control" v-model="recipeAuthor" placeholder="select"><br>
          <img :src="this.recipe.path" class="thumbnail"/>

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
      recipe: null,
      recipeName: '',
      recipeDescription: '',
      recipeDirections: '',
      setupTime: null,
      cookTime: null,
      recipeAuthor: '',
      recipeCategory: '',
      recipePath: '',
      editSuccess: null,
    }
  },
    created() {
      this.getItem()
    },
    methods: {
      async getItem() {
        try {
          let response = await axios.get("/api/recipe/" + this.$route.params.id);
          this.recipe = response.data;
          this.recipeName = this.recipe.name;
          this.recipeDescription = this.recipe.description;
          this.recipeDirections = this.recipe.directions;
          this.setupTime = this.recipe.setupTime;
          this.cookTime = this.recipe.cookTime;
          this.recipeAuthor = this.recipe.publisher;
          this.recipeCategory = this.recipe.category;
          this.recipePath = this.recipe.path;

          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async editRecipe() {
        try {
          await axios.put("/api/recipe/" + this.recipe._id, {
            name: this.recipeName,
            description: this.recipeDescription,
            directions: this.recipeDirections,
            setupTime: this.setupTime,
            cookTime: this.cookTime,
            publisher: this.recipeAuthor,
            category: this.recipeCategory,
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
