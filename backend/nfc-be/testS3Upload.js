import AWS from 'aws-sdk';
import envConfig from './src/config/envConfig.js'; // Adjust the path as necessary
const s3 = new AWS.S3({
  region: envConfig.s3.region,
  accessKeyId: envConfig.s3.accessKey,
  secretAccessKey: envConfig.s3.secretKey,
});

s3.upload(
  {
    Bucket: envConfig.s3.bucket,
    Key: 'test.txt',
    Body: 'Hello world!',
    ContentType: 'text/plain',
  },
  (err, data) => {
    if (err) return console.error('❌ Upload failed:', err);
    console.log('✅ Upload success:', data);
  }
);
