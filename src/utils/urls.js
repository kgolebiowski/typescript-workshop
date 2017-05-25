export function buildQueryString(params) {
    return Object.keys(params)
        .map(function (key) { return [key, params[key]]; })
        .map(function (pair) { return pair.map(encodeURIComponent); })
        .map(function (pair) { return pair.join('='); })
        .join('&');
}
export function buildUrl(baseUrl, params) {
    return baseUrl + "?" + buildQueryString(params);
}
