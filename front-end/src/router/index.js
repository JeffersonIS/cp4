import Vue from 'vue'
import VueRouter from 'vue-router'
import Recipes from '../views/Recipes.vue'
import People from '../views/People.vue'
import Upload from '../views/Upload.vue'
import Recipe from '../views/Recipe.vue'
import Admin from '../views/Admin.vue'
import EditPerson from '../views/EditPerson.vue'
import EditRecipe from '../views/EditRecipe.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'recipes',
    component: Recipes
  },
  {
    path: '/people',
    name: 'people',
    component: People
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
  },
  {
    path: '/upload',
    name: 'upload',
    component: Upload
  },
  {
    path: '/recipe/:id',
    name: 'recipe',
    component: Recipe
  },
  {
    path: '/editrecipe/:id',
    name: 'editrecipe',
    component: EditRecipe
  },
  {
    path: '/editperson/:id',
    name: 'editperson',
    component: EditPerson
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
