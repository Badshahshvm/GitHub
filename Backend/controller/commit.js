const fs = require("fs").promises
const { File } = require("buffer")
const path = require("path")
const { v4: uuidv4 } = require("uuid")
const { detectLocale } = require("yargs")

const commitRepo = async (message) => {
              console.log("commit repo is called")
              const repoPath = path.resolve(process.cwd(), ".AddGit");
              const staggedPath = path.join(repoPath, "staging")
              const commitPath = path.join(repoPath, "commits");
              try {
                            const commitId = uuidv4();
                            const commitDir = path.join(commitPath, commitId)
                            await fs.mkdir(commitDir, { recursive: true })

                            const files = await fs.readdir(staggedPath);
                            for (const file of files) {
                                          await fs.copyFile(path.join(staggedPath, file), path.join(commitDir, file))
                            }

                            await fs.writeFile(path.join(commitDir, "commit.json"), JSON.stringify({
                                          message, date: new Date().toISOString()
                            }))



                            console.log(`commit ${commitId}`)
              }
              catch (err) {
                            console.error("error occur", err);
              }
}

module.exports = { commitRepo }