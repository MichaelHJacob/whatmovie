import { DataOrError } from "@/types/globalTypes";
import sharp from "sharp";

export async function generateImageBlur(
  imageUrl: string,
): Promise<DataOrError<string>> {
  try {
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

    return [`data:image/webp;base64,${resizedBuffer.toString("base64")}`, null];
  } catch (error) {
    console.error("Falha ao gerar imagem", error);
    return [null, new Error("Falha ao gerar imagem")];
  }
}
