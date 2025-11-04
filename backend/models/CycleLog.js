const mongoose = require('mongoose');
const CycleLogSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
  date:Date,
  phase:String,
  moodRating:Number,
  symptoms:[String],
  meals:[String],
  notes:String
});
module.exports = mongoose.model('CycleLog', CycleLogSchema);