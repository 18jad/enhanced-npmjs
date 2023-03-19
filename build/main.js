"use strict";
let yarnButton;
let pnpmButton;
let enhaceCounter = 0;
function enhance() {
    const originalButton = document.querySelector(SELECTOR);
    const codeBlocks = document.querySelectorAll(CODE_BLOCKS_SELECTOR);
    if (!enhaceCounter && !yarnButton && !pnpmButton) {
        const originalInnerSpan = originalButton.querySelector(SELECTOR_TEXT);
        originalButton.addEventListener("click", (e) => {
            if (originalButton.dataset.enhancedStatus === ENHANCED_STATUS.COPYING) {
                e.preventDefault();
                return;
            }
            const text = originalInnerSpan.textContent;
            if (text)
                copyToClipboard(text, () => CopyInstallScriptButtonsUtils.success(originalButton, false));
        });
        yarnButton = cloneAndInsertInstallButton(originalButton, "yarn add");
        pnpmButton = cloneAndInsertInstallButton(originalButton, "pnpm add");
    }
    else {
        yarnButton.remove();
        pnpmButton.remove();
        yarnButton = cloneAndInsertInstallButton(originalButton, "yarn add");
        pnpmButton = cloneAndInsertInstallButton(originalButton, "pnpm add");
    }
    codeBlocks.forEach((codeBlock) => {
        if (!codeBlock.querySelector(".code-block-copy-button")) {
            insertPreCopyButton(codeBlock);
        }
    });
    ++enhaceCounter;
}
enhance();
chrome.runtime.onMessage.addListener(function (request, _sender, _sendResponse) {
    if (request && request.type === MessagesEnum.PAGE_RERENDERED) {
        enhance();
    }
});
