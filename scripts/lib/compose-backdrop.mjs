import sharp from "sharp";
import { renderBackdrop } from "./backdrop.mjs";

/** Rasterise the generated backdrop: blurred aurora (at quarter size) + crisp linework + 2-level dither. */
export async function composeBackdrop({ theme, width, height, seed, extraBlur = 0 }) {
  const { aurora, lines, blur } = renderBackdrop({ theme, width, height, seed });
  const q = 4;
  const small = await sharp(Buffer.from(aurora)).resize(Math.round(width / q), Math.round(height / q)).blur(Math.max(1, blur / q * 1.1)).png().toBuffer();
  const base = await sharp(small).resize(width, height, { kernel: "cubic" }).png().toBuffer();
  let img = await sharp(base).composite([{ input: Buffer.from(lines) }]).png().toBuffer();
  if (extraBlur) img = await sharp(img).blur(extraBlur).png().toBuffer();
  // Dither: ±2 levels of seeded noise breaks up banding in the soft gradients.
  const { data, info } = await sharp(img).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  let s = seed >>> 0;
  for (let i = 0; i < data.length; i++) {
    s = (s * 1664525 + 1013904223) >>> 0;
    data[i] = Math.max(0, Math.min(255, data[i] + ((s >>> 24) % 5) - 2));
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 3 } }).png().toBuffer();
}
