
// const repo = require("../../model/repo");
// const user = require("../../model/user");
// const issue = require("../../model/issue");
// const mongoose = require("mongoose");


// const creteRepository = async (req, res) => {

//               const { owner, name, issues, content, description, visibility } = req.body
//               try {
//                             if (!name) {
//                                           return res.status(400).json({
//                                                         error: "Repository anme is required"
//                                           })
//                             }


//                             if (!mongoose.Types.ObjectId.isValid(owner)) {
//                                           return res.status(400).json({ error: "Inavlid userId" })
//                             }
//                             const newRepo = new repo({
//                                           name,
//                                           description,
//                                           visibility,
//                                           owner,
//                                           content, issues
//                             })


//                             const result = await newRepo.save()

//                             return res.status(201).json({
//                                           message: "Repository created!...",
//                                           result
//                             })

//               }
//               catch (error) {
//                             console.error("Error occurred:", error.message);
//                             res.status(500).json({
//                                           message: "Server error",
//                                           error: error.message,
//                             });

//               }

const Repo = require("../../model/repo");
const User = require("../../model/user");
const Issue = require("../../model/issue");
const mongoose = require("mongoose");

const createRepository = async (req, res) => {
              const { owner, name, issues = [], content = [], description = "", visibility = true } = req.body;

              try {
                            // Check if the repository name is provided
                            if (!name) {
                                          return res.status(400).json({
                                                        error: "Repository name is required"
                                          });
                            }

                            // Validate if the owner is a valid ObjectId
                            if (!mongoose.Types.ObjectId.isValid(owner)) {
                                          return res.status(400).json({ error: "Invalid userId" });
                            }

                            // Check if the owner exists in the database
                            const ownerExists = await User.findById(owner);
                            if (!ownerExists) {
                                          return res.status(404).json({ error: "Owner not found" });
                            }

                            // Create a new repository
                            const newRepo = new Repo({
                                          name,
                                          description,
                                          visibility,
                                          owner,
                                          content,
                                          issues
                            });

                            // Save the repository to the database
                            const result = await newRepo.save();

                            // Return success response
                            return res.status(201).json({
                                          message: "Repository created!",
                                          result
                            });

              } catch (error) {
                            console.error("Error occurred:", error.message);
                            res.status(500).json({
                                          message: "Server error",
                                          error: error.message,
                            });
              }
};




const getAllRepositories = async (req, res) => {
              try {
                            const repositories = await Repo.find({}).populate("owner").populate("issues")
                            res.status(200).json({
                                          repositories
                            })

              }
              catch (error) {
                            console.error("Error occurred:", error.message);
                            res.status(500).json({
                                          message: "Server error",
                                          error: error.message,
                            });
              }
}

const fetchRepositoryById = async (req, res) => {

              const { id } = req.params;
              try {
                            const repositories = await Repo.find({ _id: id }).populate("owner").populate("issues")

                            res.json(repositories)

              }

              catch (error) {
                            console.error("Error occurred:", error.message);
                            res.status(500).json({
                                          message: "Server error",
                                          error: error.message,
                            });
              }
}

const fetchedRepositoryByName = async (req, res) => {
              const { name } = req.params;
              try {
                            const repositories = await Repo.find({ name }).populate("owner").populate("issues")
                            res.json({ repositories });

              }
              catch (error) {
                            console.error("Error occurred:", error.message);
                            res.status(500).json({
                                          message: "Server error",
                                          error: error.message,
                            });

              }
}

const fetchedRepositoryForCurrentUser = async (req, res) => {
              console.log(req.params);
              const { userId } = req.params;

              try {
                            const repositories = await Repo.find({ owner: userId });

                            if (!repositories || repositories.length == 0) {
                                          return res.status(404).json({ error: "User Repositories not found!" });
                            }
                            console.log(repositories);
                            res.json({ message: "Repositories found!", repositories });
              } catch (err) {
                            console.error("Error during fetching user repositories : ", err.message);
                            res.status(500).send("Server error");
              }
}

const updateRepositoryById = async (req, res) => {
              const { id } = req.params;
              const { content, description } = req.body;

              try {
                            const repository = await Repo.findById(id);
                            if (!repository) {
                                          return res.status(404).json({ error: "Repository not found!" });
                            }

                            repository.content.push(content);
                            repository.description = description;

                            const updatedRepository = await repository.save();

                            res.json({
                                          message: "Repository updated successfully!",
                                          repository: updatedRepository,
                            });
              } catch (err) {
                            console.error("Error during updating repository : ", err.message);
                            res.status(500).send("Server error");
              }
}

const visibilityById = async (req, res) => {
              const { id } = req.params;

              try {
                            const repository = await Repo.findById(id);
                            if (!repository) {
                                          return res.status(404).json({ error: "Repository not found!" });
                            }

                            repository.visibility = !repository.visibility;

                            const updatedRepository = await repository.save();

                            res.json({
                                          message: "Repository visibility toggled successfully!",
                                          repository: updatedRepository,
                            });
              } catch (err) {
                            console.error("Error during toggling visibility : ", err.message);
                            res.status(500).send("Server error");
              }
}

const deleteRepoById = async (req, res) => {
              const { id } = req.params;
              try {
                            const repository = await Repo.findByIdAndDelete(id);
                            if (!repository) {
                                          return res.status(404).json({ error: "Repository not found!" });
                            }

                            res.json({ message: "Repository deleted successfully!" });
              } catch (err) {
                            console.error("Error during deleting repository : ", err.message);
                            res.status(500).send("Server error");
              }
}

module.exports = {
              deleteRepoById,
              updateRepositoryById,
              visibilityById,
              createRepository,
              fetchRepositoryById,
              fetchedRepositoryByName,
              fetchedRepositoryForCurrentUser,
              getAllRepositories
}