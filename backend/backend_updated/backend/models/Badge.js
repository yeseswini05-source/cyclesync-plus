const mongoose = require('mongoose');
const BadgeSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
  key:String,
  title:String,
  description:String,
  awardedAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Badge', BadgeSchema);