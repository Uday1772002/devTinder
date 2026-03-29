const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://jayaramuday24_db_user"
  );
};

module.exports = { connectDB };
