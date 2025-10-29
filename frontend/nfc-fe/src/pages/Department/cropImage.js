const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", (error) => reject(error));
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

export default async function getCroppedImg(imageSrc, pixelCrop, rotation = 0) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  const radians = (rotation * Math.PI) / 180;

  const sin = Math.abs(Math.sin(radians));
  const cos = Math.abs(Math.cos(radians));
  const newWidth = image.width * cos + image.height * sin;
  const newHeight = image.width * sin + image.height * cos;

  canvas.width = newWidth;
  canvas.height = newHeight;

  ctx.translate(newWidth / 2, newHeight / 2);
  ctx.rotate(radians);
  ctx.drawImage(image, -image.width / 2, -image.height / 2);
  ctx.setTransform(1, 0, 0, 1, 0, 0); 

  const croppedData = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  const croppedCanvas = document.createElement("canvas");
  croppedCanvas.width = pixelCrop.width;
  croppedCanvas.height = pixelCrop.height;
  const croppedCtx = croppedCanvas.getContext("2d");
  croppedCtx.putImageData(croppedData, 0, 0);

  return new Promise((resolve) => {
    const MAX_WIDTH = 1200;
    const MAX_HEIGHT = 400;

    const ratio = Math.min(
      MAX_WIDTH / croppedCanvas.width,
      MAX_HEIGHT / croppedCanvas.height,
      1
    );

    const finalCanvas = document.createElement("canvas");
    finalCanvas.width = croppedCanvas.width * ratio;
    finalCanvas.height = croppedCanvas.height * ratio;
    const finalCtx = finalCanvas.getContext("2d");

    finalCtx.drawImage(
      croppedCanvas,
      0,
      0,
      finalCanvas.width,
      finalCanvas.height
    );

    finalCanvas.toBlob((file) => resolve(file), "image/jpeg", 0.8);
  });
}
