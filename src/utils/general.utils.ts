// In case this is was not working on some borwsers, switch to the fallback function
function copyToClipboard(text: string, callback?: () => void) {
  if (!text) return;

  if (!navigator.clipboard) {
    fallbackCopyToClipboard(text);
    return;
  }

  navigator.clipboard.writeText(text).then(callback);
}

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
