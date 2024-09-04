

const AWS = require('aws-sdk');

AWS.config.update({
              region: "eu-north-1",
              accessKeyId: process.env.AWS_ACCESS_KEY_ID,
              secretAccessKey: process.env.AWS_PASSWORD
});

const s3 = new AWS.S3();
const S3_BUCKET = "samplebucketapna";

module.exports = { s3, S3_BUCKET };

