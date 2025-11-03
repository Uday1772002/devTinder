const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://jayaramuday24_db_user:GETeEVFLD2KBTrMV@cluster0.hvdeeyq.mongodb.net/devTinder?appName=Cluster0"
  );
};

module.exports = { connectDB };
