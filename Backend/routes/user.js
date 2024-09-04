const express = require("express");
const Router = express.Router();
const user = require("../controller/user/user")
Router.get("/allUsers", user.getAllUsers)
Router.post("/signup", user.signup)
Router.post("/login", user.login)
Router.get("/userProfile/:id", user.getUserProfile)
Router.put("/updateProfile/:id", user.updateProfile)
Router.delete("/deleteProfile/:id", user.deleteProfile)

module.exports = Router