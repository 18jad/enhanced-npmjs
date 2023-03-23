"use strict";
var _a;
const SELECTOR = "#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > p";
const SELECTOR_TEXT = "code > span";
const TEXT_TO_REPLACE = "npm i";
const NOTIFICATION_SELECTOR = "#app > div > div.cf325dbd.list.ma0.pa0.tr.z-999 > div";
const CODE_BLOCKS_SELECTOR = ".highlight > pre";
const COPY_SVG_SELECTOR = "[data-icon='copy']";
const BUNDLEPHOBIA_BEFORE_ELEMENT_SELECTOR = "#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > div:nth-child(6)";
const GREEN_BACKGROUND = "hsl(120, 100%, 93%)";
const COPY_ICON = ((_a = document.querySelector(COPY_SVG_SELECTOR)) === null || _a === void 0 ? void 0 : _a.cloneNode(true)).outerHTML;
const BUNDLEPHOBIA = {
    BASE_URL: "https://bundlephobia.com/api/size?package="
};
const SUCCESS_HTML = `
    <div class="ee9e731a pa3 ph5-ns bb b--black-90 tl z-999 w-100 flex flex-row justify-between d76ab310" data-enhanced="toaster">
        <div style="display: flex;">
            <p class="ma0" id="notification" role="alert" aria-atomic="true">
                ✔ Copied to clipboard!
            </p>
        </div>
    </div>
`;
const PRE_COPY_SUCCESS_HTML = `
  <span class="pre-copy-success">
    ✔ Copied to clipboard!
  </span>
`;
const BUNDLEPHOBIA_CLASSNAMES = {
    CONTAINER: "_702d723c dib w-50 fl bb b--black-10 pr2 w-100",
    HEADER: "c84e15be f5 mt2 pt2 mb0"
};
const MessagesEnum = {
    PAGE_RERENDERED: "PAGE_RERENDERED"
};
const ENHANCED_STATUS = {
    IDLE: "idle",
    COPYING: "copying"
};
