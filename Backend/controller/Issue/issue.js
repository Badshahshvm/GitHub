
const Repository = require("../../model/repo");
const User = require("../../model/user");
const Issue = require("../../model/issue");
const mongoose = require("mongoose");


const createIssue = async (req, res) => {
              const { title, description } = req.body;
              const { id } = req.params;

              try {
                            const issue = new Issue({
                                          title,
                                          description,
                                          repository: id,
                            });

                            await issue.save();

                            res.status(201).json(issue);
              } catch (err) {
                            console.error("Error during issue creation : ", err.message);
                            res.status(500).send("Server error");
              }
}

const updateIssue = async (req, res) => {
              const { id } = req.params;
              const { title, description, status } = req.body;
              try {
                            const issue = await Issue.findById(id);

                            if (!issue) {
                                          return res.status(404).json({ error: "Issue not found!" });
                            }

                            issue.title = title;
                            issue.description = description;
                            issue.status = status;

                            await issue.save();

                            res.json(issue, { message: "Issue updated" });
              } catch (err) {
                            console.error("Error during issue updation : ", err.message);
                            res.status(500).send("Server error");
              }

}

const deleteIssue = async (req, res) => {
              const { id } = req.params;

              try {
                            const issue = Issue.findByIdAndDelete(id);

                            if (!issue) {
                                          return res.status(404).json({ error: "Issue not found!" });
                            }
                            res.json({ message: "Issue deleted" });
              } catch (err) {
                            console.error("Error during issue deletion : ", err.message);
                            res.status(500).send("Server error");
              }
}

const getAllIssues = async (req, res) => {
              const { id } = req.params;

              try {
                            const issues = Issue.find({ repository: id });

                            if (!issues) {
                                          return res.status(404).json({ error: "Issues not found!" });
                            }
                            res.status(200).json(issues);
              } catch (err) {
                            console.error("Error during issue fetching : ", err.message);
                            res.status(500).send("Server error");
              }
}

const getIssueById = async (req, res) => {
              const { id } = req.params;
              try {
                            const issue = await Issue.findById(id);

                            if (!issue) {
                                          return res.status(404).json({ error: "Issue not found!" });
                            }

                            res.json(issue);
              } catch (err) {
                            console.error("Error during issue updation : ", err.message);
                            res.status(500).send("Server error");
              }
}


module.exports = {
              createIssue,
              updateIssue, getAllIssues, getIssueById,
              deleteIssue
}
