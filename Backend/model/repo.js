// const mongoose = require("mongoose");

// const repoSchema = new mongoose.Schema({
//               name: {
//                             type: String,
//                             required: true,
//                             unique: true,
//               },
//               description: {
//                             type: String,
//               },
//               content: [
//                             {
//                                           type: String,
//                             }
//               ],
//               visibility: {
//                             type: Boolean,
//                             default: true, // assuming most repositories are public by default
//               },
//               owner: {
//                             type: mongoose.Schema.Types.ObjectId,
//                             ref: "User",
//                             required: true, // assuming a repository must have an owner
//               },
//               issues: [
//                             {
//                                           type: mongoose.Schema.Types.ObjectId,
//                                           ref: "Issue",
//                             }
//               ]
// }, {
//               timestamps: true // adds createdAt and updatedAt fields
// });

// // const RepoModel = mongoose.model("Repository", repoSchema);

// // module.exports = RepoModel;
// // const mongoose = require("mongoose");
// // const { Schema } = mongoose;

// // const repoSchema = new Schema({

// //               name: {
// //                             type: String,
// //                             required: true,
// //                             unique: true,
// //               },
// //               description: {
// //                             type: String,
// //               },
// //               content: [
// //                             {
// //                                           type: String,
// //                             },
// //               ],
// //               visibility: {
// //                             type: Boolean,
// //               },
// //               owner: {
// //                             type: Schema.Types.ObjectId,
// //                             ref: "User",
// //                             required: true,
// //               },
// //               issues: [
// //                             {
// //                                           type: Schema.Types.ObjectId,
// //                                           ref: "Issue",
// //                             },
// //               ],
// // });


// const RepoModel = mongoose.model("Repository", repoSchema);

// module.exports = RepoModel;const mongoose = require("mongoose");
const mongoose = require("mongoose")
const { Schema } = mongoose;

const RepositorySchema = new Schema({

              name: {
                            type: String,
                            required: true,
                            unique: true,
              },
              description: {
                            type: String,
              },
              content: [
                            {
                                          type: String,
                            },
              ],
              visibility: {
                            type: Boolean,
              },
              owner: {
                            type: Schema.Types.ObjectId,
                            ref: "User",
                            required: true,
              },
              issues: [
                            {
                                          type: Schema.Types.ObjectId,
                                          ref: "Issue",
                            },
              ],
},
              {
                            timestamps: true,
              });

const Repository = mongoose.model("Repository", RepositorySchema);
module.exports = Repository;