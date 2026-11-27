import { renderShareCard, shareCardSize } from "@/lib/share-card";

export const alt = "Clever Works — Building Ideas. Creating Impact.";
export const size = shareCardSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return renderShareCard();
}
