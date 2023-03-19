"use strict";
function cloneAndInsertInstallButton(buttonToClone, text) {
    var _a;
    const button = buttonToClone.cloneNode(true);
    const textSelector = button.querySelector(SELECTOR_TEXT);
    button.setAttribute("data-enhanced-status", ENHANCED_STATUS.IDLE);
    if (!textSelector.textContent) {
        throw new Error("Could not find copy button text selector");
    }
    textSelector.textContent = textSelector.textContent.replace(TEXT_TO_REPLACE, text);
    button.addEventListener("click", () => {
        if (button.dataset.enhancedStatus === ENHANCED_STATUS.COPYING)
            return;
        const text = textSelector.textContent;
        if (text)
            copyToClipboard(text, () => CopyInstallScriptButtonsUtils.success(button));
    });
    (_a = buttonToClone.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(button, buttonToClone.nextSibling);
    return button;
}
var CopyInstallScriptButtonsUtils;
(function (CopyInstallScriptButtonsUtils) {
    function success(button, showToast = true, callback) {
        var _a;
        const textSelector = button.querySelector(SELECTOR_TEXT);
        const initialBackground = (_a = button.style.backgroundColor) !== null && _a !== void 0 ? _a : window.getComputedStyle(button).backgroundColor;
        const clonnedTextSelector = textSelector.cloneNode(true);
        clonnedTextSelector.textContent = "✔ Copied!";
        textSelector.replaceWith(clonnedTextSelector);
        clonnedTextSelector.focus();
        button.style.backgroundColor = GREEN_BACKGROUND;
        button.dataset.enhancedStatus = ENHANCED_STATUS.COPYING;
        if (showToast)
            showToastNotification();
        setTimeout(() => {
            button.style.backgroundColor = initialBackground;
            if (!button.getAttribute("style"))
                button.removeAttribute("style");
            button.dataset.enhancedStatus = ENHANCED_STATUS.IDLE;
            clonnedTextSelector.replaceWith(textSelector);
            if (callback)
                callback();
        }, 2000);
    }
    CopyInstallScriptButtonsUtils.success = success;
    function showToastNotification() {
        const notificationToasterContainer = document.querySelector(NOTIFICATION_SELECTOR);
        const { fragment: toast, fragmentId: toastId } = htmlStringToElement(SUCCESS_HTML, true);
        notificationToasterContainer.appendChild(toast);
        setTimeout(() => {
            const _toastElement = document.querySelector(`[data-enhanced-id='${toastId}']`);
            _toastElement.remove();
        }, 2000);
    }
})(CopyInstallScriptButtonsUtils || (CopyInstallScriptButtonsUtils = {}));
