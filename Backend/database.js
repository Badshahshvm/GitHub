const mongoose = require("mongoose");


const dbConnect = mongoose.connect("").then(() => {
              console.log("connected sucessfully")
}).catch(error => console.log(error))

module.exports = dbConnect;