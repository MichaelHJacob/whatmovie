import sharp from "sharp";

export async function generateImageBlur(imageUrl: string): Promise<string> {
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const resizedBuffer = await sharp(buffer)
    .resize(300, 300, { fit: "cover", position: "center" })
    .extract({
      left: 25,
      top: 50,
      width: 250,
      height: 200,
    })
    .blur(50)
    .modulate({ brightness: 0.7, lightness: 30, saturation: 1.4 })
    .linear(0.6, -30)
    .jpeg({ quality: 100 })
    .toBuffer();

  if (!resizedBuffer) {
    throw new Error("Falha ao gerar imagem base64");
  }

  return `data:image/jpeg;base64,${resizedBuffer.toString("base64")}`;
}
