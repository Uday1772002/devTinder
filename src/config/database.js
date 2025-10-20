const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://jayaramuday24_db_user:aEXpF95CIw6WFOXu@cluster0.hvdeeyq.mongodb.net/devTinder?retryWrites=true&w=majority&appName=Cluster0"
  );
};

module.exports = { connectDB };
