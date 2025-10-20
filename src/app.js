const express = require("express");
const { connectDB } = require("./config/database"); //database connection
const User = require("./models/user");
const app = express(); //create server

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "John",
    lastName: "Doe",
    email: "john@gmdail.com",
    password: "john123",
    // age: 25,
    // gender: "male",
  });
  await user.save();
  res.send("User signed up successfully");
});

connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });
