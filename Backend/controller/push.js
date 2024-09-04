
const fs = require("fs").promises;
const path = require("path");
const { s3, S3_BUCKET } = require("../config/aws-config");

const pushRepo = async () => {
              const repoPath = path.resolve(process.cwd(), ".AddGit");
              const commitsPath = path.join(repoPath, "commits");

              try {
                            const commitDirs = await fs.readdir(commitsPath);

                            for (const commitDir of commitDirs) {
                                          const commitPath = path.join(commitsPath, commitDir);
                                          const files = await fs.readdir(commitPath);

                                          for (const file of files) {
                                                        const filePath = path.join(commitPath, file);
                                                        const fileContent = await fs.readFile(filePath);

                                                        const params = {
                                                                      Bucket: S3_BUCKET,
                                                                      Key: `commits/${commitDir}/${file}`,
                                                                      Body: fileContent,
                                                        };

                                                        await s3.upload(params).promise();
                                          }
                            }

                            console.log("All commits have been uploaded");
              } catch (err) {
                            console.error("Error occurred while pushing repo:", err);
              }

              console.log("Push command is called");
};

module.exports = { pushRepo };

