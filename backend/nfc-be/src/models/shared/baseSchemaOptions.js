export const baseSchemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  toJSON: {
    virtuals: true,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      if (ret.profile_image?.image_key) {
        delete ret.profile_image.image_key;
      }
      if (ret.image?.image_key) {
        delete ret.image.image_key;
      }
    },
  },
  toObject: {
    virtuals: true,
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;

      if (ret.profile_image?.image_key) {
        delete ret.profile_image.image_key;
      }
      if (ret.image?.image_key) {
        delete ret.image.image_key;
      }
    },
  },
};
