/// <reference types="chrome" />

let yarnButton: HTMLButtonElement;
let pnpmButton: HTMLButtonElement;

let enhaceCounter: number = 0;

function enhance(): void {
  const originalButton = document.querySelector(SELECTOR) as HTMLButtonElement;
  const codeBlocks = document.querySelectorAll(
    CODE_BLOCKS_SELECTOR
  ) as NodeListOf<HTMLPreElement>;

  if (!enhaceCounter && !yarnButton && !pnpmButton) {
    // Manipulating the original button to prevent multiple clicks while copying
    // and to have the common copy effect between other buttons
    //
    // Copy click event is placed on the span
    const originalInnerSpan = originalButton.querySelector(
      SELECTOR_TEXT
    ) as HTMLSpanElement;

    const _defaultPointerEvents = originalInnerSpan.style.pointerEvents;

    originalButton.addEventListener("click", (e) => {
      originalInnerSpan.style.pointerEvents = "none";

      if (originalButton.dataset.enhancedStatus === ENHANCED_STATUS.COPYING) {
        e.preventDefault();

        return;
      }

      const text = originalInnerSpan.textContent;

      if (text)
        copyToClipboard(text, () =>
          CopyInstallScriptButtonsUtils.success(originalButton, false, () => {
            originalInnerSpan.style.pointerEvents = _defaultPointerEvents;
          })
        );
    });

    yarnButton = cloneAndInsertInstallButton(originalButton, "yarn add");
    pnpmButton = cloneAndInsertInstallButton(originalButton, "pnpm add");
  } else {
    // When the package page change from one package to another
    // replace the old one with the new one that contain the correct download script
    yarnButton.remove();
    pnpmButton.remove();
    yarnButton = cloneAndInsertInstallButton(originalButton, "yarn add");
    pnpmButton = cloneAndInsertInstallButton(originalButton, "pnpm add");
  }

  // if code blocks doesnt contain the copy button, add it
  codeBlocks.forEach((codeBlock) => {
    if (!codeBlock.querySelector(".code-block-copy-button")) {
      insertPreCopyButton(codeBlock);
    }
  });

  ++enhaceCounter;
}

enhance();

// We have to do this because npmjs is a SPA, so we have to listen for page rerenders
// and enhance the page again when the content change
chrome.runtime.onMessage.addListener(function (
  request,
  _sender,
  _sendResponse
) {
  if (request && request.type === MessagesEnum.PAGE_RERENDERED) {
    enhance();
  }
});
