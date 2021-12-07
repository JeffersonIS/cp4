<template lang="html">
  <div class="mt-4">
    <h1>Recipes</h1>
    <div class="container">
      <div class="recipes" v-for="recipe in recipes" :key="recipe._id">
         <div class="item-row">
           <img class="thumbnail" :src="recipe.path" />
           <div class="item-info">
              <div>{{recipe.name}}</div>
              <div>Desc: {{recipe.description}}</div>
           </div>
           <div class="buttons ml-auto">
             <router-link :to="'/editrecipe/' + recipe._id">
             <button
               type="button"
               name="button"
               class="btn btn-warning btn-cust"
               >
               Edit</button></router-link>
               <button
                 type="button"
                 name="button"
                 class="btn btn-danger btn-cust"
                 @click="deleteRecipe(recipe._id)">
                 Delete</button>

           </div>
         </div>
      </div>
    </div>

    <h1 class="mt-4 pt-3">People</h1>
    <div class="container">
      <div class="people" v-for="person in people" :key="person._id">
        <div class="item-row">
          <img class="thumbnail" :src="person.path" />
          <div class="item-info">
             <div>{{person.name}}</div>
             <div>Hometown: {{person.hometown}}</div>
          </div>
          <div class="buttons ml-auto">
            <router-link :to="'/editperson/' + person._id">
            <button
              type="button"
              name="button"
              class="btn btn-warning btn-cust"
              >
              Edit</button></router-link>
              <button
                type="button"
                name="button"
                class="btn btn-danger btn-cust"
                @click="deletePerson(person._id)">
                Delete</button>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Admin',
  data() {
    return {
      recipes: [],
      people: [],
    }
  },
  computed: {
  },
  created() {
    this.getRecipes();
    this.getPeople();
  },
  methods: {
    async getRecipes() {
      try {
        let response = await axios.get("/api/recipes");
        this.recipes = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getPeople () {
      try {
        let response = await axios.get("/api/people");
        this.people = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteRecipe(id) {
      try {
        await axios.delete("/api/recipe/" + id)
        this.getRecipes();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deletePerson(id) {
      try {
        await axios.delete("/api/person/" + id)
        this.getPeople();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }

}
</script>

<style lang="css" scoped>
.btn-cust{
  margin: 1em .5em;
}

.container{
  box-shadow: .5px 1px 5px 0px lightgrey;
  padding: 0px;
  margin-left: 0px;
}

.thumbnail{
  height: 75px;
  width: 75px;
  margin-right: 1em;
}

.item-row{
  display: flex;
  border-top: .5px solid lightgrey;
  border-bottom: .5px solid lightgrey;

}

.item-info{
  padding: .5em;
}
</style>
