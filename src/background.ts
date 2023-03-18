// Global chrome, to work with the browser API
const MessagesEnumChrome = {
  PAGE_RERENDERED: "PAGE_RERENDERED"
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    chrome.tabs.sendMessage(tabId, {
      type: MessagesEnumChrome.PAGE_RERENDERED
    });
  }
});
