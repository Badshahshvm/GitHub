// const fs = require("fs").promises
// const path = require("path")

// const addRepo = async (filePath) => {

//               const repPath = path.resolve(process.cwd(), ".AddGit")
//               const stagingPath = path.join(repPath, "staging")
//               console.log("Add command is called");

//               try {

//                             await fs.mkdir(stagingPath, { recursive: true })
//                             const fileName = path.basename(filePath);

//                             await fs.copyFile(filePath, path.join(stagingPath, fileName));

//               }

//               catch (err) {
//                             console.error("Error occur", err)
//               }
// }

// module.exports = { addRepo }

const fs = require("fs").promises;
const path = require("path");

const addRepo = async (filePath) => {
              const repPath = path.resolve(process.cwd(), ".AddGit");
              const stagingPath = path.join(repPath, "staging");
              console.log("Add command is called");

              try {
                            // Create the staging directory if it doesn't exist
                            await fs.mkdir(stagingPath, { recursive: true });

                            // Get the filename from the provided file path
                            const fileName = path.basename(filePath);

                            // Copy the file to the staging directory
                            await fs.copyFile(filePath, path.join(stagingPath, fileName));

                            console.log(`File ${fileName} added to staging.`);
              } catch (err) {
                            console.error("Error occurred while adding the file to the repository:", err);
              }
};

module.exports = { addRepo };
