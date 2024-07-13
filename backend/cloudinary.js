const {v2} = require("cloudinary")
require('dotenv').config();
v2.config({
    api_key: process.env.api_key,
    cloud_name: process.env.cloud_name,
    api_secret: process.env.api_Secret
})

module.exports = {
    v2
}