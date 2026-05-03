const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { validateSignupData } = require("../utils/validation");
const userAuth = express.Router();

userAuth.post("/signup", async (req, res) => {
  try {
    //Validations req from user
    validateSignupData(req);
    const { firstName, lastName, email, password, about, age, skills } =
      req.body;
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      about,
      age,
      skills,
    });
    await user.save();
    res.send("User signed up successfully");
  } catch (err) {
    res.status(400).send("Error signing up user: " + err.message);
  }
});

userAuth.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      res.send(user);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userAuth.post("/logout", async (req, res) => {
  try {
    // res.cookie("token", null, { expires: new Date(Date.now()) });
    await res.clearCookie("token", null);
    res.send("logged out successfully");
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
});

module.exports = userAuth;
