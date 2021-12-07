<template lang="html">
  <div class="">
    Recipes
    <br>
      <form class="" action="index.html" method="post">
        <div class="form-group">
          <input v-model="findName" class="form-control" placeholder="Search">
        </div>
      </form>

      <div class="home">
        <div class="">
          <small>Results: Found {{recipes.length}} recipes in search</small>
        </div>
          <div v-for="recipe in recipes" :key="recipe._id">
            <router-link :to="'/recipe/' + recipe._id">
              <div class="recipeCard">
                <div class="recipeFlex">
                  <img class="thumbnail" :src="recipe.path" />
                  <div class="recipeInfo">
                    <div class="primary-info-col">
                      <h2>{{recipe.name}}</h2>
                      <p>Description: {{recipe.description}}</p>
                      <p>Setup Time: {{recipe.setupTime}} mins</p>
                      <p>Cook Time: {{recipe.cookTime}} mins</p>
                      <p>Recipe By: {{recipe.publisher}}</p>
                      <p>Category: {{recipe.category}}</p>
                    </div>
                    <div class="directions-col">
                      <p>Directions: {{recipe.directions}}</p>
                    </div>
                  </div>
                </div>
              </div>
            </router-link>
          </div>
      </div>

    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Recipes',
  data() {
    return {
      findName: '',
      recipeData: [],
    }
  },
  computed: {
    recipes() {
      let recipes = this.recipeData.filter(item => item.name.toLowerCase().startsWith(this.findName.toLowerCase()));
      return recipes.sort((a, b) => a.name > b.name);
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipeData = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style lang="css" scoped>
.home a:hover{
  color: black;
}
.thumbnail{
  height: 250px;
  width: 250px;
}

.recipeCard{
  border: 1px solid lightgrey;
  border-radius: 5px;
  margin-top: 1em;
  box-shadow: .5px 1px 5px 0px lightgrey;
  height: 250px;
}

.recipeCard:hover{
  box-shadow: 0px 1px 5px 0px grey;}

.recipeFlex {
  display: flex;
}

.recipeInfo{
  padding: 1.75em;
  display: flex;
}


.recipeInfo h2{
  font-weight: bold;
  font-size: 130%;
}

.primary-info-col{
  width: 25vw;
}

.directions-col{
  padding-top: 1.8em;
}
</style>
