const push = require("fs").promises;
const path = require("path");


const pushRepo = async () => {
              const repoPath = path.resolve(process.cwd(), ".AddGit");
              const commitsPath = path.join(repoPath, commits)
              try {
                            const commitDirs = await fs.readdir(commitsPath)
                            for (const commitdir of commitDirs) {
                                          const commitPath = path.join(commitsPath, commitdir);
                                          const files = await fs.readdir(commitPath);

                                          for (const file of files) {
                                                        const filePath = path.join(commitPath, file);
                                                        const fileContent = await fs.readFile(filePath);
                                                        const params = {
                                                                      Bucket: "___",
                                                                      Key: `commits/${commitdir}/${file}`,
                                                                      Body: fileContent
                                                        }
                                          }
                            }
                            {

                            }
              }
              catch (err) {
                            console.error("error occured ", err)
              }
              console.log("Push command is called");
}


module.exports = { pushRepo }