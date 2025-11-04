const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Notification = require('./models/Notification');

async function run() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/cyclesync_plus');
  await User.deleteMany({ email: 'demo@local' });
  await Notification.deleteMany({});
  const pw = await bcrypt.hash('password123', 10);
  const u = await User.create({ name: 'Demo User', email: 'demo@local', password: pw, cycleLength: 29, lastPeriodStart: new Date(Date.now() - (24 * 6 * 60 * 60 * 1000)) });
  await Notification.create({ user: u._id, icon: '💧', title: 'Hydrate check', body: 'Drink water', read: false });
  await Notification.create({ user: u._id, icon: '🩸', title: 'Period is close', body: 'Stock pads', read: true });
  console.log('Seed created: demo@local / password123');
  process.exit(0);
}
run().catch(e => { console.error(e); process.exit(1); });
