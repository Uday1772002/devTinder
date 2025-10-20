const express = require("express");
const { connectDB } = require("./config/database"); //database connection
const User = require("./models/user");
const app = express(); //create server

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  console.log(user);
  await user.save();
  res.send("User signed up successfully");
});

app.get("/user", async (req, res) => {
  const userMail = req.body.email;
  const user = await User.find({ email: userMail });
  if (user.length === 0) {
    return res.status(404).send("User not found");
  }
  res.send(user);
});

app.delete("/userd", async (req, res) => {
  const deleteMail = req.body.email;
  try {
    const deleteUser = await User.deleteOne({ email: deleteMail });
    res.send(deleteUser);
  } catch (err) {
    res.status(500).send("Error deleting user");
  }
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
