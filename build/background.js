"use strict";
const MessagesEnumChrome = {
    PAGE_RERENDERED: "PAGE_RERENDERED"
};
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    var _a;
    if (changeInfo.url &&
        ((_a = tab.url) === null || _a === void 0 ? void 0 : _a.match(/https:\/\/www.npmjs.com\/package\/.*/))) {
        chrome.tabs.sendMessage(tabId, {
            type: MessagesEnumChrome.PAGE_RERENDERED
        });
    }
});
