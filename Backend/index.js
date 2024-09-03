const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

const { initRepo } = require("./controller/init");
yargs(hideBin(process.argv)).command(
              "init",
              "Initialise a new repository",
              {},
              initRepo
).demandCommand(1, "You need at east one command").help().argv;
