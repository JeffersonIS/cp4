const express = require('express');
const bodyParser = require("body-parser");

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/recipes', {
  useNewUrlParser: true
});

// Create a scheme for items in the museum: a title and a path to an image.
const recipeSchema = new mongoose.Schema({
  name: String,
  description: String,
  directions: String,
  path: String,
  ingredients: Array,
  cookTime: Number,
  setupTime: Number,
  publisher: String,
  category: String,
});

const personSchema = new mongoose.Schema({
  name: String,
  experience: Number,
  path: String,
  expertise: String,
  hometown: String,
  description: String,
});

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
});

// Create a model for items in the museum.
const Recipe = mongoose.model('Recipe', recipeSchema);
const Person = mongoose.model('Person', personSchema);
const Category = mongoose.model('Category', categorySchema);

// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/recipes', async (req, res) => {
  const recipe = new Recipe({
    name: req.body.name,
    description: req.body.description,
    directions: req.body.directions,
    setupTime: req.body.setupTime,
    cookTime: req.body.cookTime,
    publisher: req.body.publisher,
    category: req.body.category,
    path: req.body.path,
  });
  try {
    await recipe.save();
    res.send(recipe);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/people', async (req, res) => {
  const person = new Person({
    name: req.body.name,
    experience: req.body.experience,
    path: req.body.path,
    expertise: req.body.expertise,
    hometown: req.body.hometown,
    description: req.body.description,
  });
  try {
    await person.save();
    res.send(person);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/recipes', async (req, res) => {
  try {
    let recipes = await Recipe.find();
    res.send(recipes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/recipe/:id', async (req, res) => {
  try {
    let recipe = await Recipe.findOne({
      _id: req.params.id
    });
    res.send(recipe)
    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/person/:id', async (req, res) => {
  try {
    let person = await Person.findOne({
      _id: req.params.id
    });
    res.send(person)
    res.sendStatus(200);

  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/people/', async (req, res) => {
  try {
    let people = await Person.find();
    res.send(people);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Delete an item from the database
app.delete('/api/recipe/:id', async (req, res) => {
  try {
    await Recipe.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/person/:id', async (req, res) => {
  try {
    await Person.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/recipe/:id', async (req, res) => {
  try {
    let recipe = await Recipe.findOne({
      _id: req.params.id
    });

    recipe.name = req.body.name;
    recipe.description = req.body.description;
    recipe.directions = req.body.directions;
    recipe.setupTime = req.body.setupTime;
    recipe.cookTime = req.body.cookTime;
    recipe.publisher = req.body.publisher;
    recipe.category = req.body.category;
    recipe.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/person/:id', async (req, res) => {
  try {
    let person = await Person.findOne({
      _id: req.params.id
    });

    person.name = req.body.name;
    person.description = req.body.description;
    person.experience = req.body.experience;
    person.expertise = req.body.expertise;
    person.hometown = req.body.hometown;
    person.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
