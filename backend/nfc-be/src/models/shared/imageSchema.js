import mongoose from 'mongoose';
import validator from 'validator';

export const imageSchema = new mongoose.Schema(
  {
    image_key: {
      type: String,
      default: null,
      validate: {
        validator: (v) => v === null || typeof v === 'string',
        message: 'Invalid image key',
      },
    },
    image_url: {
      type: String,
      default: null,
      validate: {
        validator: (v) => v === null || validator.isURL(v, { require_protocol: true }),
        message: 'Invalid image URL',
      },
    },
  },
  { _id: false }
);
