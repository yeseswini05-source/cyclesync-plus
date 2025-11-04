const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
  icon: String,
  title: { type: String, required: true },
  body: { type: String, required: true },
  type: { 
    type: String, 
    enum: ["reminder", "alert", "post", "tip", "system"], 
    default: "system" 
  },
  priority: { 
    type: String, 
    enum: ["low", "normal", "high"], 
    default: "normal" 
  },
  time: { type: Date, default: Date.now },
  read: { type: Boolean, default: false }
});

module.exports = mongoose.model('Notification', notificationSchema);
