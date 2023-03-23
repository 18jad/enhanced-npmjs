"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const getPackageFromUrl = () => {
    const url = new URL(window.location.href);
    const pkgPath = url.pathname;
    const fullPkgName = pkgPath.split("/package/").pop();
    if (!fullPkgName)
        return {
            packageName: "",
            version: ""
        };
    const pkgVersion = fullPkgName.includes("/v")
        ? fullPkgName.split("/").pop()
        : "latest";
    const pkgName = pkgVersion !== "latest"
        ? fullPkgName.split("/").slice(0, -2).join("/")
        : fullPkgName;
    return {
        packageName: pkgName,
        version: pkgVersion
    };
};
const getPackageStats = () => __awaiter(void 0, void 0, void 0, function* () {
    const { packageName, version } = getPackageFromUrl();
    if (!packageName)
        return;
    try {
        const response = yield fetch(`${BUNDLEPHOBIA.BASE_URL}${packageName}@${version}`);
        if (response.ok) {
            const data = yield response.json();
            const { size, gzip } = data;
            return {
                packageName,
                version,
                size,
                gzip
            };
        }
    }
    catch (_) { }
    return null;
});
