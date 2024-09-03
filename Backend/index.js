const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controller/init");
const { addRepo } = require("./controller/add")
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
}, addRepo).demandCommand(1, "You need at east one command").help().argv;
