const express = require("express");
const Router = express.Router()
const repo = require("../controller/repository/repository")

Router.post("/repo/create", repo.createRepository)
Router.get("/repo/all", repo.getAllRepositories);
Router.get("/repo/:id", repo.fetchRepositoryById);
Router.get("/repo/name/:name", repo.fetchedRepositoryByName);
Router.get("/repo/user/:userID", repo.fetchedRepositoryForCurrentUser);
Router.put("/repo/update/:id", repo.updateRepositoryById)
Router.delete("/repo/delete/:id", repo.deleteRepoById)
Router.patch("/repo/update/:id", repo.visibilityById)

module.exports = Router;