const mongoose = require('mongoose');
const SubscriptionSchema = new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
  endpoint:String,
  keys:{ p256dh:String, auth:String },
  createdAt:{type:Date, default:Date.now}
});
module.exports = mongoose.model('Subscription', SubscriptionSchema);