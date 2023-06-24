export function canUseDom() {
  return !!(
    typeof window !== "undefined" &&
    window.document &&
    window.document.createElement
  );
}

export function getFunctionName(func: string) {
  const funcString = func.toString();
  const match = funcString.match(/^function\s+([^\s(]+)/);
  return match ? match[1] : '';
}

export function getArrowFunctionName(func: string) {
  const funcString = func.toString();
  const match = funcString.match(/^([^(]+)=>/);
  return match ? match[1].trim() : '';
}
