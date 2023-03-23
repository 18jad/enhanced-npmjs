/**
 * Size statistics are coming from bundlephobia:
 *      https://bundlephobia.com/
 */

const getPackageFromUrl = () => {
  const url = new URL(window.location.href);
  const pkgPath = url.pathname;
  const fullPkgName = pkgPath.split("/package/").pop(); // with version potentially

  if (!fullPkgName)
    return {
      packageName: "",
      version: ""
    };

  const pkgVersion = fullPkgName.includes("/v")
    ? fullPkgName.split("/").pop()
    : "latest";
  const pkgName =
    pkgVersion !== "latest"
      ? fullPkgName.split("/").slice(0, -2).join("/") // -2 for "/v" and pkg version
      : fullPkgName;

  return {
    packageName: pkgName,
    version: pkgVersion
  };
};

const getPackageStats = async () => {
  const { packageName, version } = getPackageFromUrl();
  if (!packageName) return;

  try {
    const response = await fetch(
      `${BUNDLEPHOBIA.BASE_URL}${packageName}@${version}`
    );

    if (response.ok) {
      const data: BundlephobiaData = await response.json();

      const { size, gzip } = data;

      return {
        packageName,
        version,
        size,
        gzip
      };
    }
  } catch (_) {}

  return null;
};
