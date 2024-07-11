const mongoose = require('mongoose');

require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log("monogodb connection succesful"))
        .catch(() => console.log("Connection nhi hua"))
}

module.exports = dbConnect;