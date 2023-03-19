"use strict";
function copyToClipboard(text, callback) {
    if (!text)
        return;
    if (!navigator.clipboard) {
        fallbackCopyToClipboard(text);
        return;
    }
    navigator.clipboard.writeText(text).then(callback);
}
function fallbackCopyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        document.execCommand("copy");
    }
    catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
    }
    document.body.removeChild(textArea);
}
function generateRandomId(prefix = "enhanced-npmjs") {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
