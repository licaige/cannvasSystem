export class HttpRequest {
    private _url: string;
    private _data: Map<string, any>;
    constructor() {
        this._data = new Map();
    }

    public url(url: string): HttpRequest {
        this._url = url;
        return this;
    }

    public param(key: string, val: any): HttpRequest {
        this._data.set(key, val);
        return this;
    }

    public get(cb: (res: any) => void): void {
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
            } else {
                // console.log('request error');
            }
        };
    }
}
