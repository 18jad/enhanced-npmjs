function extractTextFromHTML(html: string) {
  const _tempDiv = document.createElement("div");
  _tempDiv.innerHTML = html;

  const content = _tempDiv.textContent || _tempDiv.innerText || "";

  _tempDiv.remove();

  return content;
}

function htmlStringToElement(html: string, addRandomId: boolean = false) {
  let t: ChildNode | null;
  let randomId: string | null = null;

  const _document = document,
    _tempDiv = _document.createElement("div"),
    fragment = _document.createDocumentFragment();

  _tempDiv.innerHTML = html;

  if (addRandomId) {
    // Used for the remove toaster hack
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
