// const fs = require("fs").promises;
// const path = require("path")

// const initRepo = async () => {
//   console.log("Init command is called");

//   const repoPath = path.resolve(process.cwd(), ".AddGit")
//   const commitsPath = path.join(repoPath, "commits")
//   try {

//     await fs.mkdir(repoPath, { recursive: true })// repo folder creation
//     await fs.mkdir(commitsPath, { recursive: true })

//     await fs.writeFile(
//       path.join(repoPath, "Config.json", JSON.stringify({
//         bucket: "s3 bucket"
//       }))
//     )
//     console.log("repository initialized");


//   }

//   catch (err) {
//     console.error("Error initialising repositiory".err)
//   }
// };

// module.exports = { initRepo };
const fs = require("fs").promises;
const path = require("path");

const initRepo = async () => {
  console.log("Init command is called");

  const repoPath = path.resolve(process.cwd(), ".AddGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    // Create the repository folder
    await fs.mkdir(repoPath, { recursive: true });
    // Create the commits folder
    await fs.mkdir(commitsPath, { recursive: true });

    // Write the Config.json file
    const configPath = path.join(repoPath, "Config.json");
    const configData = JSON.stringify({
      bucket: "s3 bucket"
    }, null, 2); // pretty print with 2 spaces
    await fs.writeFile(configPath, configData);

    console.log("Repository initialized");
  } catch (err) {
    console.error("Error initializing repository:", err);
  }
};

module.exports = { initRepo };
