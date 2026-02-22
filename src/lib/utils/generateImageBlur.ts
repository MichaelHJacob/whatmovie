import sharp from "sharp";

export async function generateImageBlur(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const resizedBuffer = await sharp(buffer)
    .resize(150, 150, { fit: "cover", position: "center" })
    .extract({
      left: 25,
      top: 25,
      width: 100,
      height: 100,
    })
    .blur(9)
    .modulate({ brightness: 1.2, lightness: -20, saturation: 1.8 })
    .webp({ quality: 70 })
    .toBuffer();

  if (!resizedBuffer) {
    throw new Error("Falha ao gerar imagem base64");
  }

  return `data:image/webp;base64,${resizedBuffer.toString("base64")}`;
}
