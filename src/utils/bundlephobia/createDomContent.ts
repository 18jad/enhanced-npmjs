type BundlephobiaData = {
  size: number;
  gzip: number;
  packageName: string;
  version?: string;
};

const createDomContent = (data: BundlephobiaData) => {
  const alreadyEnhanced = document.querySelector(
    "[data-enhanced-id='bundlephobia']"
  );

  const placeAfter = document.querySelector(
    BUNDLEPHOBIA_BEFORE_ELEMENT_SELECTOR
  );

  const bundlephobiaContainer = document.createElement("div");
  bundlephobiaContainer.className = BUNDLEPHOBIA_CLASSNAMES.CONTAINER;
  bundlephobiaContainer.dataset.enhancedId = "bundlephobia";

  const bundlephobiaTitle = document.createElement("h3");
  bundlephobiaTitle.innerHTML = `Size  <span class="f6">Powered by <a href="https://bundlephobia.com/package/${data.packageName}@${data.version}" target="_blank" class="notxtd">Bundlephobia</a></span>`;
  bundlephobiaTitle.className = BUNDLEPHOBIA_CLASSNAMES.HEADER + " max-between";

  const bundlephobiaContent = document.createElement("div");
  bundlephobiaContent.className = "bundlephobia-content";

  bundlephobiaContent.innerHTML = `
        <div class="pt2 pb1"><span class="b2812e30 b--black-50 fw6">Minfied:</span> <span class="b2812e30 b--black-50 fw5">${convertBytes(
          data.size,
          "mb"
        )} MB <span class="c84e15be fw6">(${convertBytes(
    data.size,
    "kb"
  )} Kbs)</span></span></div>
        <div class="pt1 pb3"><span class="b2812e30 b--black-50 fw6">Gzipped:</span> <span class="b2812e30 b--black-50 fw5">${convertBytes(
          data.gzip,
          "mb"
        )} MB <span class="c84e15be fw6">(${convertBytes(
    data.gzip,
    "kb"
  )} Kbs)</span></span></div>
    `;

  bundlephobiaContainer.appendChild(bundlephobiaTitle);
  bundlephobiaContainer.appendChild(bundlephobiaContent);

  if (alreadyEnhanced) {
    alreadyEnhanced.replaceWith(bundlephobiaContainer);
    return;
  }

  placeAfter?.after(bundlephobiaContainer);
};
