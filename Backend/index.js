const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controller/init");
const { addRepo } = require("./controller/add")
const { commitRepo } = require("./controller/commit")
const { pushRepo } = require("./controller/push")
const { revertRepo } = require("./controller/revert")
const { pullRepo } = require("./controller/pull")
yargs(hideBin(process.argv)).command(
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
