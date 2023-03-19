"use strict";
function extractTextFromHTML(html, trim) {
    const _tempDiv = document.createElement("div");
    _tempDiv.innerHTML = html;
    const content = _tempDiv.textContent || _tempDiv.innerText || "";
    _tempDiv.remove();
    return trim ? content.trim() : content;
}
function htmlStringToElement(html, addRandomId = false) {
    var _a;
    let t;
    let randomId = null;
    const _document = document, _tempDiv = _document.createElement("div"), fragment = _document.createDocumentFragment();
    _tempDiv.innerHTML = html;
    if (addRandomId) {
        randomId = generateRandomId();
        (_a = _tempDiv
            .querySelector("[data-enhanced='toaster']")) === null || _a === void 0 ? void 0 : _a.setAttribute("data-enhanced-id", randomId);
    }
    while ((t = _tempDiv.firstChild))
        fragment.appendChild(t);
    _tempDiv.remove();
    return { fragment, fragmentId: randomId };
}
function removeDocumentFragment(fragment) {
    while (fragment.firstChild)
        fragment.firstChild.remove();
}
