function insertPreCopyButton(codeBlock: HTMLPreElement) {
  const copyButton = document.createElement("button");
  const parent = codeBlock.parentNode as HTMLDivElement;

  copyButton.setAttribute("data-enhanced-status", ENHANCED_STATUS.IDLE);

  parent.style.position = "relative";
  parent.style.paddingTop = "2rem";

  copyButton.innerHTML = COPY_ICON;
  copyButton.classList.add("code-block-copy-button");

  copyButton.addEventListener("click", () => {
    if (copyButton.dataset.enhancedStatus === ENHANCED_STATUS.COPYING) return;

    copyButton.setAttribute("data-enhanced-status", ENHANCED_STATUS.COPYING);

    const text = extractTextFromHTML(codeBlock.innerHTML);
    copyToClipboard(text, () => CodeBlockUtils.success(parent, copyButton));
  });

  codeBlock.appendChild(copyButton);
}

namespace CodeBlockUtils {
  export function success(
    parent: HTMLDivElement,
    copyButton: HTMLButtonElement
  ) {
    const intialBackgroundColor =
      parent.style.backgroundColor ??
      window.getComputedStyle(parent).backgroundColor;
    const successSpan = document.createElement("span");

    successSpan.innerHTML = PRE_COPY_SUCCESS_HTML;
    successSpan.classList.add("pre-copy-success");

    parent.style.backgroundColor = GREEN_BACKGROUND;
    parent.appendChild(successSpan);

    setTimeout(() => {
      parent.style.backgroundColor = intialBackgroundColor;

      copyButton.setAttribute("data-enhanced-status", ENHANCED_STATUS.IDLE);

      successSpan.remove();
    }, 2000);
  }
}
