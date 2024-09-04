const express = require("express");
const Router = express.Router();
const issue = require("../controller/Issue/issue")



Router.post("/issue/create", issue.createIssue)
Router.delete("/issue/delete/:id", issue.deleteIssue)
Router.get("/issue/all", issue.getAllIssues);
Router.get("/issue/:id", issue.getIssueById)
Router.put("/issue/update/:id", issue.updateIssue);

module.exports = Router;
