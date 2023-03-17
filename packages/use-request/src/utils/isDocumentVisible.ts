import { canUseDom } from "./utils";

export default function isDocumentVisible(): boolean {
  if (canUseDom()) {
    return document.visibilityState !== "hidden";
  }
  return true;
}
