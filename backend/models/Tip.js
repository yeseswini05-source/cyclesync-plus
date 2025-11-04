const mongoose = require('mongoose');
const TipSchema = new mongoose.Schema({
  phase:String,
  title:String,
  body:String,
});
module.exports = mongoose.model('Tip', TipSchema);