const express = require("express");
const app = express();
const Person = require("./models/person");
const PORT = 4000;
app.listen(PORT, () => console.log(`Server runnning on Port ${PORT}`));
const mongoose = require("mongoose");
require("dotenv").config();

const uri = process.env.MONGO_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connecté à MongoDB");
  })
  .catch((err) => {
    console.error("Erreur de connexion à MongoDB :", err);
  });

const newPerson = new Person({
  name: "John Doe",
  age: 30,
  favoriteFoods: ["Pizza", "Sushi"],
});

newPerson.save().then((data) => console.log(data));

// Array of people data
const arrayOfPeople = [
  { name: "John Doe", age: 30, favoriteFoods: ["Pizza", "Sushi"] },
  { name: "Jane Smith", age: 25, favoriteFoods: ["Pasta", "Salad"] },
  { name: "Mike Johnson", age: 35, favoriteFoods: ["Steak", "Burgers"] },
];
Person.create(arrayOfPeople)
  .then((createdPeople) => {
    console.log("Successfully created the following people:");
    console.log(createdPeople);
  })
  .catch((err) => {
    console.error("Error creating people:", err);
  });
// Create several people using Model.create()
Person.create(arrayOfPeople).then((data) => console.log(data));
const desiredName = "John";

// Use Model.find() to search for all people with the desired name
Person.find({ name: desiredName })
  .then((people) => {
    console.log(`People with the name "${desiredName}":`);
    console.log(people);
  })
  .catch((err) => {
    console.error("Error finding people:", err);
  });
async function findPersonByFavoriteFood(food) {
  try {
    const person = await Person.findOne({ favorites: food });
    if (person) {
      console.log(`Person found with ${food} in favorites:`);
      console.log(person);
    } else {
      console.log(`No person found with ${food} in favorites.`);
    }
  } catch (err) {
    console.error("Error finding person:", err);
  }
}
// Assuming your model is named "Person" and you have imported or defined it
// Define the function to find a person by _id
async function findPersonById(personId) {
  try {
    const person = await Person.findById(personId);
    if (person) {
      console.log("Person found by _id:");
      console.log(person);
    } else {
      console.log("No person found with the specified _id.");
    }
  } catch (err) {
    console.error("Error finding person by _id:", err);
  }
}
// Assuming your model is named "Person" and you have imported or defined it
// Define the function to update a person's favoriteFoods by _id
async function updatePersonFavoriteFoods(personId) {
  try {
    const person = await Person.findById(personId);
    if (!person) {
      console.log("No person found with the specified _id.");
      return;
    }

    // Add "hamburger" to the person's favoriteFoods array
    person.favoriteFoods.push("hamburger");

    // Mark favoriteFoods array as edited (required when using Mixed type)
    person.markModified("favoriteFoods");

    // Save the updated person
    // await person.save();
    // console.log("Person updated successfully:");
    // console.log(person);
  } catch (err) {
    console.error("Error updating person:", err);
  }
}

const desiredPersonId = "65f99033286273bd2d342def"; // Replace with the actual _id you want to update
// updatePersonFavoriteFoods(desiredPersonId);
// Assuming your model is named "Person" and you have imported or defined it
// Define the function to update a person's age by name
async function updatePersonAgeByName(personName) {
  try {
    const updatedPerson = await Person.findOneAndUpdate(
      { name: personName }, // Search criteria
      { age: 20 }, // Update age to 20
      { new: true } // Options to return the updated document
    );

    if (!updatedPerson) {
      console.log("No person found with the specified name.");
      return;
    }

    console.log("Person updated successfully:");
    console.log(updatedPerson);
  } catch (err) {
    console.error("Error updating person:", err);
  }
}

// Call the function with the desired personName as the argument
const desiredPersonName = "Mike Johnson"; // Replace with the actual name you want to update
// updatePersonAgeByName(desiredPersonName);

// Définir la fonction async pour supprimer une personne par _id
async function deletePersonById(personId) {
  try {
    const deletedPerson = await Person.findByIdAndDelete(personId);

    if (!deletedPerson) {
      console.log("Aucune personne trouvée avec l'_id spécifié.");
      return;
    }

    console.log("Personne supprimée avec succès :");
    console.log(deletedPerson);
  } catch (err) {
    console.error("Erreur lors de la suppression de la personne :", err);
  }
}

// Appel de la fonction avec l'_id désiré en argument
const deletePersonId = "65f98ce8e60f9fbec5cf9301"; // Remplacez par le véritable _id que vous souhaitez supprimer
// deletePersonById(deletePersonId);
// Assuming your model is named "Person" and you have imported or defined it
// Define the function to delete all people named "Mary"
async function deletePeopleByNameMikeJohnson() {
  try {
    const result = await Person.deleteOne({ name: "Jane Smith" });
    console.log("hhhhhhhhhhhhhhh", result);
    if (result.ok === 1) {
      console.log(
        `Successfully deleted ${result.deletedCount} people named Jane Smith.`
      );
    } else {
      console.log("No people named Jane Smith found to delete.");
    }
  } catch (err) {
    console.error("Error deleting people:", err);
  }
}

// Call the function to delete people named "John"
deletePeopleByNameMikeJohnson();
