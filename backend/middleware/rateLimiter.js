const rateLimit = require('express-rate-limit');
const globalLimiter = rateLimit({ windowMs:15*60*1000, max:200, standardHeaders:true, legacyHeaders:false, message:{ error:'Too many requests' } });
const authLimiter = rateLimit({ windowMs:15*60*1000, max:10, message:{ error:'Too many auth attempts' } });
module.exports = { globalLimiter, authLimiter };