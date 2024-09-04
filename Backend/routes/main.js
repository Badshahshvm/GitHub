const express = require("express");
const Router = express.Router()
const user = require("./user")
const repo = require("./repo")
const issue = require("./issue")
Router.use(user)
Router.use(repo)
Router.use(issue)

Router.get("/", (req, res) => {
              res.send("welcome")
})



module.exports = Router