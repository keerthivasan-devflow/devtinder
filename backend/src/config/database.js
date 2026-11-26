const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://keerthivasan:1kRvsCPcobjXmizm@nodestore.psrbupi.mongodb.net/devtinder",
  );
};

module.exports = connectDB