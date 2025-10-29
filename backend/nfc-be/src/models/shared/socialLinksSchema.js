import mongoose from 'mongoose';
import validator from 'validator';

export const socialLinksSchema = new mongoose.Schema(
  {
    facebook: {
      type: String,
      default: '',
      validate: {
        validator: (v) => !v || validator.isURL(v),
        message: 'Invalid Facebook URL',
      },
    },
    twitter: {
      type: String,
      default: '',
      validate: {
        validator: (v) => !v || validator.isURL(v),
        message: 'Invalid Twitter URL',
      },
    },
    instagram: {
      type: String,
      default: '',
      validate: {
        validator: (v) => !v || validator.isURL(v),
        message: 'Invalid Instagram URL',
      },
    },
    youtube: {
      type: String,
      default: '',
      validate: {
        validator: (v) => !v || validator.isURL(v),
        message: 'Invalid YouTube URL',
      },
    },
    linkedin: {
      type: String,
      default: '',
      validate: {
        validator: (v) => !v || validator.isURL(v),
        message: 'Invalid Linkedin URL',
      },
    },
  },
  { _id: false }
);
