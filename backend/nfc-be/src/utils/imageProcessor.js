import sharp from 'sharp';

export const processImage = async (buffer) => {
  const image = sharp(buffer);
  const metadata = await image.metadata();

  // Validate format
  if (!['jpeg', 'png', 'webp'].includes(metadata.format)) {
    throw new Error('Unsupported image format');
  }

  // Resize & convert
  return await image
    .resize({
      width: 512,
      height: 512,
      fit: sharp.fit.inside,
      withoutEnlargement: true,
    })
    .toFormat('webp', { quality: 80 })
    .toBuffer();
};
