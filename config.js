const dotenv = require('dotenv');
dotenv.config();
module.exports = {
 fbACCESS: process.env.FACEBOOK_ACCESS,
 googleMaps: process.env.GOOGLE_MAPS
};