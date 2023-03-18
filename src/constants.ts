// Clone button selector
const SELECTOR =
  "#top > div.fdbf4038.w-third-l.mt3.w-100.ph3.ph4-m.pv3.pv0-l > p";

// Clone button text selector
const SELECTOR_TEXT = "code > span";

// Clone button text, npm i -> yarn add etc...
const TEXT_TO_REPLACE = "npm i";

// Notification toaster selector
const NOTIFICATION_SELECTOR =
  "#app > div > div.cf325dbd.list.ma0.pa0.tr.z-999 > div";

const CODE_BLOCKS_SELECTOR = ".highlight > pre";

const GREEN_BACKGROUND = "hsl(120, 100%, 93%)";

// Notification toaster HTML
const SUCCESS_HTML = `
    <div class="ee9e731a pa3 ph5-ns bb b--black-90 tl z-999 w-100 flex flex-row justify-between d76ab310" data-enhanced="toaster">
        <div style="display: flex;">
            <p class="ma0" id="notification" role="alert" aria-atomic="true">
                ✔ Copied to clipboard!
            </p>
        </div>
        <button aria-label="Close notification" class="_545224b8 ma0 f3 fw6">
            ×
        </button>
    </div>
`;

const PRE_COPY_SUCCESS_HTML = `
  <span class="pre-copy-success">
    ✔ Copied to clipboard!
  </span>
`;

// Copy icon selector
const COPY_SVG_SELECTOR = "[data-icon='copy']";

const COPY_ICON = (
  document.querySelector(COPY_SVG_SELECTOR)?.cloneNode(true) as SVGElement
).outerHTML;

// Enums
const MessagesEnum = {
  PAGE_RERENDERED: "PAGE_RERENDERED"
} as const;

const ENHANCED_STATUS = {
  IDLE: "idle",
  COPYING: "copying"
} as const;
