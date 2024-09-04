// const mongoose = require("mongoose");
// const userSchema = mongoose.Schema({


//               username:
//               {
//                             type: String,
//                             required: true,
//                             unique: true
//               },
//               email:
//               {
//                             type: String,
//                             required: true,
//                             unique: true
//               },
//               password:
//               {
//                             type: String

//               },
//               repositories: [
//                             {
//                                           default: [],
//                                           type: mongoose.Schema.Types.ObjectId,
//                                           ref: "Repository"
//                             },

//               ],
//               followedUsers: [
//                             {
//                                           default: [],
//                                           type: Schema.Types.ObjectId,
//                                           ref: "User"
//                             }
//               ],
//               starRepos: [
//                             {
//                                           default: [],
//                                           type: Schema.Types.ObjectId,
//                                           ref: "Repository"
//                             }
//               ]

// })

// const userModel = mongoose.model("User", userSchema)
// module.exports = userModel


const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({

              username: {
                            type: String,
                            required: true,
                            unique: true,
              },
              email: {
                            type: String,
                            required: true,
                            unique: true,
              },
              password: {
                            type: String,
              },
              repositories: [
                            {
                                          default: [],
                                          type: Schema.Types.ObjectId,
                                          ref: "Repository",
                            },
              ],
              followedUsers: [
                            {
                                          default: [],
                                          type: Schema.Types.ObjectId,
                                          ref: "User",
                            },
              ],
              starRepos: [
                            {
                                          default: [],
                                          type: Schema.Types.ObjectId,
                                          ref: "Repository",
                            },
              ],
},
              {
                            timestamps: true,
              });

const User = mongoose.model("User", UserSchema);

module.exports = User;