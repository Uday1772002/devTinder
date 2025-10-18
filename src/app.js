const express = require("express");

const app = express(); //create server

app.use("/", (req, res, next) => {
  console.log("Middleware executed");
  // res.send("Hello World");
  next();
});

app.get("/user", (req, res, next) => {
  res.send({ name: "John", age: 30 });
  next();
});

app.use("/test", (req, res) => {
  res.send("Welcome to the home page!");
});

app.use(
  "/User",
  (req, res, next) => {
    console.log("First callback function executed");
    next();
    // res.send("Yo man Welcome");
  },
  (req, res, next) => {
    console.log("Second callback function executed");
    res.send("This is the second callback function");
    next();
  }
);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
