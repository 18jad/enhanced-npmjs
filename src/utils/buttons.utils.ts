function cloneAndInsertInstallButton(
  buttonToClone: HTMLButtonElement,
  text: string
) {
  const button = buttonToClone.cloneNode(true) as HTMLButtonElement;
  const textSelector = button.querySelector(SELECTOR_TEXT) as HTMLSpanElement;

  button.setAttribute("data-enhanced-status", ENHANCED_STATUS.IDLE);

  if (!textSelector.textContent) {
    throw new Error("Could not find copy button text selector");
  }

  textSelector.textContent = textSelector.textContent.replace(
    TEXT_TO_REPLACE,
    text
  );

  button.addEventListener("click", () => {
    // Prevent multiple clicks while copying
    if (button.dataset.enhancedStatus === ENHANCED_STATUS.COPYING) return;

    const text = textSelector.textContent;
    if (text)
      copyToClipboard(text, () =>
        CopyInstallScriptButtonsUtils.success(button)
      );
  });

  buttonToClone.parentNode?.insertBefore(button, buttonToClone.nextSibling);

  return button;
}

namespace CopyInstallScriptButtonsUtils {
  export function success(
    button: HTMLButtonElement,
    showToast: boolean = true,
    callback?: () => void
  ) {
    const textSelector = button.querySelector(SELECTOR_TEXT) as HTMLSpanElement;
    const initialBackground =
      button.style.backgroundColor ??
      window.getComputedStyle(button).backgroundColor;

    // Cloning the text selector, changing the text and replacing the original
    // I had to do this because when switching from one package to another
    // the text selector was not changing, and stayed with the old package text
    const clonnedTextSelector = textSelector.cloneNode(true) as HTMLSpanElement;
    clonnedTextSelector.textContent = "✔ Copied!";
    textSelector.replaceWith(clonnedTextSelector);
    clonnedTextSelector.focus();

    button.style.backgroundColor = GREEN_BACKGROUND;
    button.dataset.enhancedStatus = ENHANCED_STATUS.COPYING;

    if (showToast) showToastNotification();

    setTimeout(() => {
      button.style.backgroundColor = initialBackground;

      // If the button has no style, remove the style attribute
      if (!button.getAttribute("style")) button.removeAttribute("style");

      button.dataset.enhancedStatus = ENHANCED_STATUS.IDLE;
      clonnedTextSelector.replaceWith(textSelector);

      if (callback) callback();
    }, 2000);
  }

  function showToastNotification() {
    const notificationToasterContainer = document.querySelector(
      NOTIFICATION_SELECTOR
    ) as HTMLDivElement;

    const { fragment: toast, randomId: toastId } = htmlStringToElement(
      SUCCESS_HTML,
      true
    );

    notificationToasterContainer.appendChild(toast);

    setTimeout(() => {
      // removeDocumentFragment(toast); // this didn't work

      // since removeDocumentFragment didn't work, I had to use this hack
      const _toastElement = document.querySelector(
        `[data-enhanced-id='${toastId}']`
      ) as HTMLDivElement;

      _toastElement.remove();
    }, 2000);
  }
}
