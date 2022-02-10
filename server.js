const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");
// required npm(s).
const express = require("express");

const fs = require("fs");
const path = require("path");

// json file to be used (require).
const { animals } = require("./data/animals.json");

//  port.
const PORT = process.env.PORT || 3001;

// instantiate the server.
const app = express();

// parse incoming string or array data.
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data.
app.use(express.json());
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);
app.use(express.static("public"));

function findById(id, animalsArray) {
  const result = animalsArray.filter((animal) => animal.id === id)[0];
  return result;
}

function createNewAnimal(body, animalsArray) {
  console.log(body);
  // our function's main code will go here!
  const animal = body;
  animalsArray.push(animal);
  // return finished code to post route for response.
  fs.writeFileSync(path.join(__dirname, "./data/animals.json"), JSON.stringify({ animals: animalsArray }, null, 2));
  return animal;
}

function validateAnimal(animal) {
  if (!animal.name || typeof animal.name !== "string") {
    return false;
  }
  if (!animal.species || typeof animal.species !== "string") {
    return false;
  }
  if (!animal.diet || typeof animal.diet !== "string") {
    return false;
  }
  if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
    return false;
  }
  return true;
}

// method to make our server listen.
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
