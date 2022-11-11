export declare class HttpRequest {
    private _url;
    private _data;
    constructor();
    url(url: string): HttpRequest;
    param(key: string, val: any): HttpRequest;
    get(cb: (res: any) => void): void;
}
//# sourceMappingURL=HttpRequest.d.ts.map