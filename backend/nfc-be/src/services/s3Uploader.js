import AWS from 'aws-sdk';
import path from 'path';
import { envConfig } from '../config/envConfig.js';
import { CustomError } from '../utils/customError.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';

const s3 = new AWS.S3({
  region: envConfig.s3.region,
  endpoint: envConfig.s3.endpoint,
  accessKeyId: envConfig.s3.accessKey,
  secretAccessKey: envConfig.s3.secretKey,
  signatureVersion: 'v4',
  s3ForcePathStyle: true,
});

const isSupportedMime = (type) =>
  ['image/webp', 'image/jpeg', 'image/png', 'image/jpg'].includes(type);

// Upload to S3
export const uploadToS3 = async (fileBuffer, fileName, mimeType) => {
  if (!Buffer.isBuffer(fileBuffer)) {
    throw new CustomError(HTTP_STATUS.BAD_REQUEST, 'Uploaded file is not a valid buffer');
  }

  if (!mimeType || !isSupportedMime(mimeType)) {
    throw new CustomError(HTTP_STATUS.UNSUPPORTED_MEDIA_TYPE, 'Unsupported image MIME type');
  }

  if (!fileName || typeof fileName !== 'string') {
    throw new CustomError(HTTP_STATUS.BAD_REQUEST, 'Invalid or missing file name');
  }

  const safeFileName = fileName.replace(/\s+/g, '-').toLowerCase();
  const ext = path.extname(safeFileName) || '.webp';
  const timestamp = Date.now();
  const key = `${timestamp}-${safeFileName}`; // filename should already include admin id

  const params = {
    Bucket: envConfig.s3.bucket,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
    CacheControl: 'public, max-age=31536000',
  };

  const uploaded = await s3.upload(params).promise();

  return {
    key: uploaded.Key,
    url: uploaded.Location,
  };
};

// Delete from S3
export const deleteFromS3 = async (key) => {
  if (!key || typeof key !== 'string') {
    throw new CustomError(HTTP_STATUS.BAD_REQUEST, 'Invalid S3 key');
  }

  const params = {
    Bucket: envConfig.s3.bucket,
    Key: key,
  };

  await s3.deleteObject(params).promise();
};
