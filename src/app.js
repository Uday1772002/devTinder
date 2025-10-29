const express = require("express");
const { connectDB } = require("./config/database"); //database connection
const User = require("./models/user");
const validateSignupData = require("./utils/validation");
const { userAuth } = require("./middlewares/auth");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express(); //create server

app.use(express.json());
app.use(cookieParser());
//signup
app.post("/signup", async (req, res) => {
  try {
    //Validations
    validateSignupData(req);
    const { firstName, lastName, email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
    });
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(400).send("Error signing up user: " + err.message);
  }
});

//login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      const token = await jwt.sign({ _id: user._id }, "Jayadextor@45", {
        expiresIn: "10d",
      });

      res.cookie("token", token, { expires: new Date(Date.now() + 900000) });
      res.send("Login successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName);
});

//update
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  //allowed updates and validations
  try {
    const ALLOWED = [
      "firstName",
      "lastName",
      "password",
      "age",
      "photoUrl",
      "about",
      "skills",
    ];
    const updates = Object.keys(data).every((k) => ALLOWED.includes(k));
    if (!updates) {
      throw new Error("Invalid updates!");
    }
    // skills validation
    if (data?.skills.length > 10) {
      throw new Error("Cannot add more than 10 skills");
    }
    //remove duplicate skills
    const uniqueSkills = [...new Set(data.skills)];
    data.skills = uniqueSkills;

    await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("updated user Successfully");
  } catch (err) {
    res.status(500).send("Error updating user:" + err.message);
    console.log(err);
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
