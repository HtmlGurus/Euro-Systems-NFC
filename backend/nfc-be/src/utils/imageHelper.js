import { uploadToS3, deleteFromS3 } from '../services/s3Uploader.js';
import { processImage } from './imageProcessor.js';
import { generatePresignedUrl } from './s3.js';

export const replaceImage = async (doc, buffer, prefix, field = 'image') => {
  const current = doc[field];

  if (current?.image_key) {
    await deleteFromS3(current.image_key);
  }

  const optimizedBuffer = await processImage(buffer);
  const filename = `${prefix}-${doc._id || Date.now()}.webp`;

  const uploaded = await uploadToS3(optimizedBuffer, filename, 'image/webp');

  doc[field] = {
    image_key: uploaded?.key || null,
    image_url: uploaded?.url || null,
  };
};

export const removeImage = async (doc, field = 'image') => {
  const current = doc[field];

  if (current?.image_key) {
    await deleteFromS3(current.image_key);
  }

  doc[field] = { image_key: null, image_url: null };
};

export const attachPresignedImageUrl = async (doc, field = 'image') => {
  const imageKey = doc?.[field]?.image_key;
  if (!imageKey) return;

  try {
    doc[field].image_url = await generatePresignedUrl(imageKey);
  } catch (err) {
    // Optional: log error
    doc[field].image_url = null;
  }
};

export const uploadImage = async (buffer, prefix) => {
  const optimizedBuffer = await processImage(buffer);
  const filename = `${prefix}-${Date.now()}.webp`;

  const uploaded = await uploadToS3(optimizedBuffer, filename, 'image/webp');

  return {
    image_key: uploaded?.key || null,
    image_url: uploaded?.url || null,
  };
};
