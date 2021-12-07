<template>
  <div class="">
    <div class="breadcrumb">
      <router-link :to="'/'">&#8592; Back</router-link>
    </div>
    <div class="home">
      <div class="">
        <small>Results: Found {{people.length}} people in search</small>
      </div>
        <div v-for="person in people" :key="person._id">
            <div class="recipeCard">
              <div class="recipeFlex">
                <img class="thumbnail" :src="person.path" />
                <div class="recipeInfo">
                  <div class="primary-info-col">
                    <h2>{{person.name}}</h2>
                    <p>Hometown: {{person.setupTime}} mins</p>
                    <p>Experience: {{person.cookTime}} mins</p>
                    <p>Expertise: {{person.publisher}}</p>
                  </div>
                  <div class="directions-col">
                    <p>About: {{person.description}}</p>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="spacer">

        </div>
    </div>

  </div>

</template>

<script>
// @ is an alias to /src
import axios from 'axios';

export default {
  name: 'People',
  data() {
    return {
     people: [],
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/people");
        this.people = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>
.spacer{
  height: 100px;
}
.breadcrumb{
  text-decoration: none;
  background-color: white;
}

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
  margin-top: 2em;
  box-shadow: .5px 1px 5px 0px lightgrey;
}

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
