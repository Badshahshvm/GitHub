// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcryptjs")
// var ObjectId = require("mongodb").ObjectId

// const { MongoClient, ObjectId } = require("mongodb")
// const dotenv = require("dotenv");
// const { updateIssue } = require("../Issue/issue");
// dotenv.config();



// const mongo_url = process.env.MONGO_URL;
// let client;

// async function connectClient() {
//               if (!client) {
//                             client = new MongoClient(mongo_url);

//                             await client.connect();
//               }
// }

// const getAllUsers = async (req, res) => {
//               try {
//                             await connectClient();
//                             const db = client.db("projectHub");
//                             const userCollection = db.collection("users");

//                             const user = await userCollection.find({}).toArray();
//                             return res.json({ user })


//               }
//               catch (error) {
//                             console.error("Error occurred:", error.message);
//                             res.status(500).send("Server error");
//               }
// };

// const signup = async (req, res) => {
//               const { username, password, email } = req.body;
//               try {
//                             await connectClient();
//                             const db = client.db("projectHub");
//                             const userCollection = db.collection("users");

//                             const user = await userCollection.findOne({ username });
//                             if (user) {
//                                           return res.status(400).json({
//                                                         message: "User already exists",
//                                           });
//                             }

//                             const salt = await bcrypt.genSalt(10);
//                             const hashedPassword = await bcrypt.hash(password, salt);

//                             const newUser = {
//                                           username,
//                                           password: hashedPassword,
//                                           email,
//                                           repositories: [],
//                                           followedUsers: [],
//                                           starRepos: [],
//                             };

//                             const result = await userCollection.insertOne(newUser);
//                             const token = jwt.sign(
//                                           { id: result.insertedId },
//                                           process.env.JWT_SECRET_KEY,
//                                           { expiresIn: "1h" }
//                             );

//                             res.json({
//                                           token,
//                                           newUser
//                             });
//               } catch (error) {
//                             console.error("Error occurred:", error.message);
//                             res.status(500).send("Server error");
//               }
// };
// const login = async (req, res) => {
//               const { email, password } = req.body;
//               try {
//                             await connectClient();
//                             const db = client.db("projectHub");
//                             const userCollection = db.collection("users");

//                             const user = await userCollection.findOne({ email });
//                             if (!user) {

//                                           return res.status(400).json({
//                                                         message: "Invalid Credentials"
//                                           })
//                             }
//                             const isMatch = await bcrypt.compare(password, user.password)
//                             if (!isMatch) {
//                                           return res.status(400).json({
//                                                         message: "Invalid Credentials"
//                                           })
//                             }
//                             const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
//                             res.json({ token, userId: user._id })

//               }
//               catch (error) {
//                             console.error("Error occurred:", error.message);
//                             res.status(500).send("Server error");
//               }
// }

// const getUserProfile = async (req, res) => {
//               const currId = req.params.id;
//               try {
//                             await connectClient();
//                             const db = client.db("projectHub");
//                             const userCollection = db.collection("users");

//                             const user = await userCollection.findOne({ _id: new ObjectIdjectId(currId) })
//                             if (!user) {
//                                           return res.status(400).json({
//                                                         message: "Invalid Credentials"
//                                           })
//                             }
//                             res.json({ user })


//               }
//               catch (error) {
//                             console.error("Error occurred:", error.message);
//                             res.status(500).send("Server error");
//               }
// }


// // const deleteProfile = async (req, res) => {

// //               const currId = req.params.id;
// //               try {
// //                             await connectClient();
// //                             const db = client.db("projectHub");
// //                             const userCollection = db.collection("users");

// //                             const result = await userCollection.deleteOne({ _id: new objectId(currId) })

// //                             if (result.deleteCount == 0) {
// //                                           return res.status(404).json({
// //                                                         message: "User not found"
// //                                           })
// //                             }
// //                             res.send({ message: "User not found" })


// //               }
// //               catch (error) {
// //                             console.error("Error occurred:", error.message);
// //                             res.status(500).send("Server error");
// //               }
// // }
// // const updateProfile = async (req, res) => {
// //               const currId = req.params.id;
// //               const { email, password } = req.body;
// //               try {
// //                             await connectClient();
// //                             const db = client.db("projectHub");
// //                             const userCollection = db.collection("users");



// //                             let updatedFields = { email };
// //                             if (password) {
// //                                           const salt = await bcrypt.genSalt(10);
// //                                           const hashedPassword = await bcrypt.hash(password, salt)
// //                                           updatedFields.password = hashedPassword
// //                             }

// //                             const result = await userCollection.findOneAndUpdate({ _id: new objectId(currId) },
// //                                           { $set: updatedFields },
// //                                           {
// //                                                         returnDocument: "after"
// //                                           })

// //                             if (!result.value) {
// //                                           return res.status(404).json({
// //                                                         message: "user not found"
// //                                           })
// //                             }
// //                             res.send(result.value)

// //               }
// //               catch (error) {
// //                             console.error("Error occurred:", error.message);
// //                             res.status(500).send("Server error");
// //               }
// // }

// const deleteProfile = async (req, res) => {
//               const currId = req.params.id;
//               try {
//                 await connectClient();
//                 const db = client.db("projectHub");
//                 const userCollection = db.collection("users");

//                 const result = await userCollection.deleteOne({ _id: new ObjectId(currId) });

//                 if (result.deletedCount === 0) {
//                   return res.status(404).json({
//                     message: "User not found",
//                   });
//                 }

//                 res.send({ message: "User deleted successfully" });
//               } catch (error) {
//                 console.error("Error occurred:", error.message);
//                 res.status(500).send("Server error");
//               }
//             };

//             const updateProfile = async (req, res) => {
//               const currId = req.params.id;
//               const { email, password } = req.body;
//               try {
//                 await connectClient();
//                 const db = client.db("projectHub");
//                 const userCollection = db.collection("users");

//                 let updatedFields = { email };
//                 if (password) {
//                   const salt = await bcrypt.genSalt(10);
//                   const hashedPassword = await bcrypt.hash(password, salt);
//                   updatedFields.password = hashedPassword;
//                 }

//                 const result = await userCollection.findOneAndUpdate(
//                   { _id: new ObjectId(currId) },
//                   { $set: updatedFields },
//                   { returnDocument: "after" }
//                 );

//                 if (!result.value) {
//                   return res.status(404).json({
//                     message: "User not found",
//                   });
//                 }

//                 res.send(result.value);
//               } catch (error) {
//                 console.error("Error occurred:", error.message);
//                 res.status(500).send("Server error");
//               }
//             };


// module.exports = {
//               getAllUsers,
//               signup,
//               login,
//               getUserProfile,
//               deleteProfile,
//               updateProfile
// }
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Correct import
const { MongoClient, ObjectId } = require("mongodb");
const dotenv = require("dotenv");
const { updateIssue } = require("../Issue/issue");
dotenv.config();

const mongo_url = process.env.MONGO_URL;
let client;

async function connectClient() {
              if (!client) {
                            client = new MongoClient(mongo_url);
                            await client.connect();
              }
}

const getAllUsers = async (req, res) => {
              try {
                            await connectClient();
                            const db = client.db("projectHub");
                            const userCollection = db.collection("users");

                            const users = await userCollection.find({}).toArray();
                            return res.json({ users });
              } catch (error) {
                            console.error("Error occurred:", error.message);
                            res.status(500).send("Server error");
              }
};

const signup = async (req, res) => {
              const { username, password, email } = req.body;
              try {
                            await connectClient();
                            const db = client.db("projectHub");
                            const userCollection = db.collection("users");

                            const user = await userCollection.findOne({ username });
                            if (user) {
                                          return res.status(400).json({
                                                        message: "User already exists",
                                          });
                            }

                            const salt = await bcrypt.genSalt(10);
                            const hashedPassword = await bcrypt.hash(password, salt);

                            const newUser = {
                                          username,
                                          password: hashedPassword,
                                          email,
                                          repositories: [],
                                          followedUsers: [],
                                          starRepos: [],
                            };

                            const result = await userCollection.insertOne(newUser);
                            const token = jwt.sign(
                                          { id: result.insertedId },
                                          process.env.JWT_SECRET_KEY,
                                          { expiresIn: "1h" }
                            );

                            res.json({
                                          token,
                                          newUser,
                                          userId: result.insertedId,
                            });
              } catch (error) {
                            console.error("Error occurred:", error.message);
                            res.status(500).send("Server error");
              }
};

const login = async (req, res) => {
              const { email, password } = req.body;
              try {
                            await connectClient();
                            const db = client.db("projectHub");
                            const userCollection = db.collection("users");

                            const user = await userCollection.findOne({ email });
                            if (!user) {
                                          return res.status(400).json({
                                                        message: "Invalid Credentials",
                                          });
                            }

                            const isMatch = await bcrypt.compare(password, user.password);
                            if (!isMatch) {
                                          return res.status(400).json({
                                                        message: "Invalid Credentials",
                                          });
                            }

                            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
                                          expiresIn: "1h",
                            });
                            res.json({ token, userId: user._id });
              } catch (error) {
                            console.error("Error occurred:", error.message);
                            res.status(500).send("Server error");
              }
};

const getUserProfile = async (req, res) => {
              const currId = req.params.id;
              try {
                            await connectClient();
                            const db = client.db("projectHub");
                            const userCollection = db.collection("users");

                            const user = await userCollection.findOne({ _id: new ObjectId(currId) });
                            if (!user) {
                                          return res.status(400).json({
                                                        message: "User not found",
                                          });
                            }
                            res.json({ user });
              } catch (error) {
                            console.error("Error occurred:", error.message);
                            res.status(500).send("Server error");
              }
};

const deleteProfile = async (req, res) => {
              const currId = req.params.id;
              try {
                            await connectClient();
                            const db = client.db("projectHub");
                            const userCollection = db.collection("users");

                            const result = await userCollection.deleteOne({ _id: new ObjectId(currId) });

                            if (result.deletedCount === 0) {
                                          return res.status(404).json({
                                                        message: "User not found",
                                          });
                            }

                            res.send({ message: "User deleted successfully" });
              } catch (error) {
                            console.error("Error occurred:", error.message);
                            res.status(500).send("Server error");
              }
};

// const updateProfile = async (req, res) => {
//               const currId = req.params.id;
//               const { email, password } = req.body;
//               try {
//                             await connectClient();
//                             const db = client.db("projectHub");
//                             const userCollection = db.collection("users");

//                             let updatedFields = { email };
//                             if (password) {
//                                           const salt = await bcrypt.genSalt(10);
//                                           const hashedPassword = await bcrypt.hash(password, salt);
//                                           updatedFields.password = hashedPassword;
//                             }

//                             const result = await userCollection.findOneAndUpdate(
//                                           { _id: new ObjectId(currId) },
//                                           { $set: updatedFields },
//                                           { returnDocument: "after" }
//                             );

//                             if (!result.value) {
//                                           return res.status(404).json({
//                                                         message: "User not found",
//                                           });
//                             }

//                             res.send(result.value);
//               } catch (error) {
//                             console.error("Error occurred:", error.message);
//                             res.status(500).send("Server error");
//               }
// };
const updateProfile = async (req, res) => {
              const currId = req.params.id;
              const { email, password } = req.body;

              try {
                            await connectClient();
                            const db = client.db("projectHub");
                            const userCollection = db.collection("users");

                            let updatedFields = {};

                            if (email) {
                                          updatedFields.email = email;
                            }

                            if (password) {
                                          const salt = await bcrypt.genSalt(10);
                                          const hashedPassword = await bcrypt.hash(password, salt);
                                          updatedFields.password = hashedPassword;
                            }

                            const result = await userCollection.findOneAndUpdate(
                                          { _id: new ObjectId(currId) },
                                          { $set: updatedFields },
                                          { returnDocument: "after" }
                            );

                            if (!result.value) {
                                          return res.status(404).json({
                                                        message: "User not found",
                                          });
                            }

                            res.json({
                                          message: "Profile updated successfully",
                                          user: result.value,
                            });

              } catch (error) {
                            console.error("Error occurred:", error.message);
                            res.status(500).json({
                                          message: "Server error",
                                          error: error.message,
                            });
              }
};

module.exports = {
              getAllUsers,
              signup,
              login,
              getUserProfile,
              deleteProfile,
              updateProfile,
};
