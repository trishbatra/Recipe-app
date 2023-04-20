const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String 
  },
  ingredients: {
    type: [String],
    required: true
  }
});

const recipeModell = mongoose.model('Recipe', recipeSchema);
module.exports = {recipeModell} 
