// const mongoose = require("mongoose");
// const issueSchema = mongoose.Schema({
//               title:
//               {
//                             type: String,
//                             required: true
//               },
//               description:
//               {
//                             type: String,
//                             required: true
//               },
//               status:
//               {
//                             type: String,
//                             enum: ["open", "closed"]
//               },
//               repository:
//               {
//                             type: Schema.types.ObjectId,
//                             ref: "Repository",
//                             required: true
//               }

// });


// const issueModel = mongoose.model("Issue", issueSchema)

// module.exports = issueModel
const mongoose = require("mongoose");
const { Schema } = mongoose;

const IssueSchema = new Schema({

              title: {
                            type: String,
                            required: true,
              },
              description: {
                            type: String,
                            required: true,
              },
              status: {
                            type: String,
                            enum: ["open", "closed"],
                            default: "open",
              },
              repository: {
                            type: Schema.Types.ObjectId,
                            ref: "Repository",
                            required: true,
              },
},
              {
                            timestamps: true,
              });

const Issue = mongoose.model("Issue", IssueSchema);
module.exports = Issue;