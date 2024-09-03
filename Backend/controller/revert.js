const fs = require("fs");
const path = require("path");
const { promisify } = require("util");


const readdir = promisify(fs.readdir)
const copyFile = promisify(fs.copyFile);

const revertRepo = async (commitID) => {
              console.log("revert is called")


              const repoPath = path.resolve(process.cwd(), ".AddGit");
              const commitsPath = path.join(repoPath, "commits");
              try {
                            const commitDir = path.join(commitsPath, commitID);
                            const files = await readdir(commitDir);
                            const parentDir = path.resolve(repoPath, "..")


                            for (const file of files) {
                                          await copyFile(path.join(commitDir, file), path.join(parentDir, file))
                            }


                            console.log(`sucessfully reverted ${commitID}`)
              }

              catch (err) {
                            console.log("Error is occur", err);
              }
}
module.exports = { revertRepo }