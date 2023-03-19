/**
 * Copies a string to the clipboard, in case the browser doesn't support the clipboard API, it uses a fallback
 * @param text: string
 * @param callback: () => void
 * @returns void
 */
function copyToClipboard(text: string, callback?: () => void) {
  if (!text) return;

  if (!navigator.clipboard) {
    fallbackCopyToClipboard(text);
    return;
  }

  navigator.clipboard.writeText(text).then(callback);
}

// Fallback for browsers that don't support the clipboard API
function fallbackCopyToClipboard(text: string) {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand("copy");
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}

/**
 * Generates a random id with a prefix
 * @param prefix: string
 * @returns string
 */
function generateRandomId(prefix = "enhanced-npmjs") {
  return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
