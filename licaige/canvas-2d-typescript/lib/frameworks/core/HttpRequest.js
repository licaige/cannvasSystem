export class HttpRequest {
    constructor() {
        this._data = new Map();
    }
    url(url) {
        this._url = url;
        return this;
    }
    param(key, val) {
        this._data.set(key, val);
        return this;
    }
    get(cb) {
        let xhr = new XMLHttpRequest();
        let url = this._url;
        let uris = [];
        this._data.forEach((val, key) => {
            uris.push(`${key}=${val}`);
        });
        if (uris.length > 0) {
            url = url + '?' + uris.join('&');
        }
        xhr.open('GET', this._url, true);
        xhr.send(null);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                let res = JSON.parse(xhr.responseText);
                cb(res);
            }
            else {
                // console.log('request error');
            }
        };
    }
}
//# sourceMappingURL=HttpRequest.js.map