// The Celebrity model should have:

// name - String (like Tom Cruise, Beyoncé, Daffy Duck, etc.).
// occupation - String (what the celebrity does, why they are famous. For example actor, singer, comedian, or you can put unknown if your celebrity is someone like Kim Kardashian).
// catchPhrase - String (every celebrity needs a good catch phrase. Well maybe not all of them have one in real life, but all of our celebrities will have a catch phrase. This can be pretty much anything).
// Steps we will follow in this iteration:
// Create the celebrity.js model file in the models/ folder.
// In the celebrity.js model file:
// Create the celebrity schema with the properties name, occupation and catchPhrase.
// Create the Celebrity model with the schema.
//  Export the Celebrity model.

const mongoose = require('mongoose');

const celebritySchema = new mongoose.Schema({
  name: String,
  occupation: String,
  catchPhrase: String
});

const Celebrity = mongoose.model('Celebrity', celebritySchema);

module.exports = Celebrity;
