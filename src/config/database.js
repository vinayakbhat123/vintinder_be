const mongoose = require("mongoose");

const connectDB = async () => {
   await mongoose.connect(
    "mongodb+srv://vindata_db:lahCkjGlOkk6lXEP@vindata.dtuywra.mongodb.net/vintinder");
}

module.exports = {connectDB}
