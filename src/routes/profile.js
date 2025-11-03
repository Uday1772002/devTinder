const express = require("express");
const profileRouter = express.Router();
const userAuth = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("profile validation failed");
    }

    const loggedInUser = req.user;
    // the req.body is what we feed this code basically mean:
    //takes the keys of the req.body for example "firstName", "lastName" which we allowed to update so for each key like forEach(firsName, lastName,---) loggedInUser in the cense the useData which we already have before updated one is equals to the req.body which we edited it replaces it so then we get the updated data
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key])); //important logic

    // res.send(`${loggedInUser.firstName} your profile has been updated Successfully`);
    res.json({
      message: `${loggedInUser.firstName} your profile has been updated Successfully`,
      data: loggedInUser,
    });
    await loggedInUser.save();
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/forgotPassword", userAuth, async (req, res) => {
  try {
    //decrypt the login password and compare it to the req.body if it is  same then throw error
    const { password } = req.body;
    const user = req.user;
    const passwordCompare = await user.validatePassword(password);
    if (passwordCompare) {
      throw new Error("Password is same as previous so update the password");
    }

    const newHashedPassword = bcrypt.hash(password, 10);

    user.password = await newHashedPassword;

    await user.save();
    res.send("password Updated");
  } catch (err) {
    res.status(401).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
