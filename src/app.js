const express = require("express");

const app = express(); //create server

app.use("/", (req, res) => {
  res.send("Welcome to the home page!");
});

app.use("/yo", (req, res) => {
  res.send("Hello from Express!");
});

app.use("/re", function (req, res) {
  res.send("Sorry, that route doesn't exist.");
});

app.use("/red", (req, res) => {
  res.send("So that route doesn't exist.");
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
3;
