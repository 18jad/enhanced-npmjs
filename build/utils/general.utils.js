"use strict";
function copyToClipboard(text, callback) {
    if (!text)
        return;
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
function fallbackCopyToClipboard(text, callback) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
        const triggerCopy = document.execCommand("copy");
        if (callback && triggerCopy)
            callback();
    }
    catch (err) {
        console.error("Fallback: Oops, unable to copy", err);
    }
    document.body.removeChild(textArea);
}
function generateRandomId(prefix = "enhanced-npmjs") {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`;
}
function convertBytes(bytes, to = "mb") {
    return to === "mb"
        ? (bytes / 1024 / 1024).toFixed(2)
        : (bytes / 1024).toFixed(2);
}
