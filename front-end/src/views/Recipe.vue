<template lang="html">
  <div class="">
    <div class="breadcrumb">
      <router-link :to="'/'">&#8592; Back</router-link>
    </div>

    <div class="wrapper">
      <div class="img-col">
        <img class="thumbnail" :src="recipe.path" />
      </div>

      <div class="item-details-col">
        <div class="item-details">
          <h1>{{recipe.name}}</h1>
          <small><span class="detail-item">Recipe By: {{recipe.publisher}}</span></small>
          <hr>
          <div class="detail-item"><strong>Category: </strong>{{recipe.category}}</div>
          <div class="detail-item"><strong>Description: </strong> {{recipe.description}}</div>
          <div class="detail-item"><strong>Setup Time: </strong> {{recipe.setupTime}} mins</div>
          <div class="detail-item"><strong>Cook Time: </strong> {{recipe.cookTime}} mins</div>
          <div class="detail-item"><strong>Directions: </strong>{{recipe.directions}}</div>

        </div>
        <!-- <div class="purchase">
          <router-link :to="'/publisher/' + recipe.publisher">
          <button
            type="button"
            name="button"
            class="btn btn-warning btn-blue"
            href="/join.html">
            Edit</button>
            <button
              type="button"
              name="button"
              class="btn btn-danger btn-blue"
              href="/join.html">
              Delete</button>

          </router-link>
        </div> -->
      </div>
    </div>
    <div class="spacer">

    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Recipe',
  data() {
    return {
      recipe: null,
      recipeData: null,
    }
  },
  created() {
    this.getItem()
  },
  computed: {

  },
  methods: {
    async getItem() {
      try {
        let response = await axios.get("/api/recipe/" + this.$route.params.id);
        this.recipe = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style lang="css" scoped>
.spacer{
  height: 100px;
}

.btn-blue:hover{
  background-color: blue;
  opacity: .8;
}

img {
  height: auto;
  width: 30vw;
}

.img-col{
  min-width: 35vw;
}

.img-col img{
  padding: 8px;
  box-shadow: 1px 1px 10px 1px grey;
}

.item-details-col{
  display: flex;
  width: 65vw;
  color: black;
  text-align: left;
  flex-direction: column;
}

.item-details div{
  margin-top: 1em;
}

.purchase{
  margin-right: auto;
  margin-top: 3em;
}

.purchase div{
  margin-top: .5em;
  margin-left: .25em;
}

.purchase div:hover{
  text-decoration: underline;
  cursor: pointer;
}

.router-link-active{
  color: black;
}

.breadcrumb{
  text-decoration: none;
  background-color: white;
}

.wrapper{
  display: flex;
  justify-content: space-around;
  margin: 0em 1em;
}

@media only screen and (max-width: 1100px) {
  .wrapper {
    flex-direction: column;
  }

  .item-details-col{
    margin-top: 2em;
  }

}

</style>
