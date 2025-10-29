import AWS from 'aws-sdk';
import { envConfig } from '../config/envConfig.js';
import { CustomError } from '../utils/customError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

export const s3 = new AWS.S3({
  region: envConfig.s3.region,
  endpoint: envConfig.s3.endpoint,
  accessKeyId: envConfig.s3.accessKey,
  secretAccessKey: envConfig.s3.secretKey,
  signatureVersion: 'v4',
  s3ForcePathStyle: true,
});

export const generatePresignedUrl = async (key, expiresIn = 60 * 60) => {
  if (!key || typeof key !== 'string') {
    throw new CustomError(HTTP_STATUS.BAD_REQUEST, 'Invalid S3 object key');
  }

  const params = {
    Bucket: envConfig.s3.bucket,
    Key: key,
    Expires: expiresIn,
  };

  try {
    return await s3.getSignedUrlPromise('getObject', params);
  } catch (error) {
    throw new CustomError(HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Failed to generate presigned URL');
  }
};
