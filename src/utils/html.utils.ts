/**
 * Extracts text from a string of HTML (inner text), removes the HTML tags and comments
 * @param html: string
 * @returns string
 */
function extractTextFromHTML(html: string, trim?: boolean) {
  const _tempDiv = document.createElement("div");
  _tempDiv.innerHTML = html;

  const content = _tempDiv.textContent || _tempDiv.innerText || "";

  _tempDiv.remove();

  return trim ? content.trim() : content;
}

/**
 * Converts a string of HTML to a DocumentFragment, optionally adds a random enhanced-id
 * @param html: string
 * @param addRandomId: boolean
 * @returns { fragment: DocumentFragment, fragmentId: string | null }
 */
function htmlStringToElement(html: string, addRandomId: boolean = false) {
  let t: ChildNode | null;
  let randomId: string | null = null;

  const _document = document,
    _tempDiv = _document.createElement("div"),
    fragment = _document.createDocumentFragment();

  _tempDiv.innerHTML = html;

  if (addRandomId) {
    randomId = generateRandomId();
    _tempDiv
      .querySelector("[data-enhanced='toaster']")
      ?.setAttribute("data-enhanced-id", randomId);
  }
  while ((t = _tempDiv.firstChild)) fragment.appendChild(t);

  _tempDiv.remove();

  return { fragment, fragmentId: randomId };
}

// X: This function doesn't work, keep it here for reference
function removeDocumentFragment(fragment: DocumentFragment) {
  while (fragment.firstChild) fragment.firstChild.remove();
}
