/**
 * Copies a string to the clipboard, in case the browser doesn't support the clipboard API, it uses a fallback
 * @param text: string
 * @param callback: () => void
 * @returns void
 */
function copyToClipboard(text: string, callback?: () => void) {
  if (!text) return;

  if (!navigator.clipboard) {
    fallbackCopyToClipboard(text, callback);
    return;
  }

  navigator.clipboard
    .writeText(text)
    .then(callback)
    .catch((err) => {
      console.error("Async: Could not copy text: ", err);

      fallbackCopyToClipboard(text, callback);
    });
}

// Fallback for browsers that don't support the clipboard API
function fallbackCopyToClipboard(text: string, callback?: () => void) {
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
    const triggerCopy = document.execCommand("copy");
    if (callback && triggerCopy) callback();
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

/**
 * Converts bytes to megabytes or kilobytes
 * @param bytes: number
 * @returns
 */
function convertBytes(bytes: number, to: "kb" | "mb" = "mb") {
  return to === "mb"
    ? (bytes / 1024 / 1024).toFixed(2)
    : (bytes / 1024).toFixed(2);
}
