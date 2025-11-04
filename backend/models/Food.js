const mongoose = require('mongoose');
const FoodSchema = new mongoose.Schema({
  name:String,
  nutrients:[String],
  priceBand:{type:String, enum:['low','medium','high'], default:'medium'},
  tags:[String],
  image:String
});
module.exports = mongoose.model('Food', FoodSchema);