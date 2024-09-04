const yargs = require("yargs");
const Router = require("./routes/main")
const { hideBin } = require("yargs/helpers");
const mongoose = require("mongoose");
const express = require("express")
const dotenv = require('dotenv')
const cors = require("cors")
const bodyParser = require("body-parser")
const http = require("http")
const { Server } = require("socket.io")
dotenv.config()

const { initRepo } = require("./controller/init");
const { addRepo } = require("./controller/add")
const { commitRepo } = require("./controller/commit")
const { pushRepo } = require("./controller/push")
const { revertRepo } = require("./controller/revert")
const { pullRepo } = require("./controller/pull")
yargs(hideBin(process.argv)).command("start", "start a new server", {}, startServer).command(
              "init",
              "Initialise a new repository",
              {},
              initRepo
).command("add <file>", "File is added", (yargs) => {
              yargs.positional("file",
                            {
                                          describe: "File to add the staging arae",
                                          type: "string"
                            }
              )
}, (argv) => {
              addRepo(argv.file)
}).command("commit <message>", "commit the staged file", (yargs) => {
              yargs.positional("message",
                            {
                                          describe: "Commit message",
                                          type: "string"
                            })
}, (argv) => {
              commitRepo(argv.message)
}).command("push", "Push commits to S3", {}, pushRepo).command("pull", "Pull commits from S3", {}, pullRepo).command("revert <commitID>", "Revert to a specific commit", (yargs) => {
              yargs.positional("commitID",
                            {
                                          describe: "CommitID to revert to",
                                          type: "string"
                            })
},
              (argv) => {
                            revertRepo(argv.commitID)
              }

).demandCommand(1, "You need at east one command").help().argv;


function startServer() {
              const app = express();
              const port = process.env.PORT || 3000
              app.use(bodyParser.json())
              app.use(express.json())
              app.use(cors({ origin: "*" }))
              mongoose.connect(process.env.MONGO_URL).then(() => {
                            console.log("connected sucessfully")
              }).catch(error => console.log(error))
              app.use("/", Router)

              const httpsServer = http.createServer(app);
              const io = new Server(httpsServer, {
                            cors:
                            {
                                          origin: "*",
                                          methods: ["GET", "POST"]
                            }
              })


              io.on("connected", (socket) => {
                            socket.on("joinRoom", (userID) => {
                                          user = userID;
                                          console.log("++++++")
                                          console.log(user);
                                          console.log("++++++++")
                                          console.log(userID)
                            }
                            )
              })

              const db = mongoose.connection;
              db.once("open", async () => {
                            console.log("CRUD OPERATION IS CALLED")
              })


              httpsServer.listen(port, () => {
                            console.log(`server is live ${port}`)
              })

}