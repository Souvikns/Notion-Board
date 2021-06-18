"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Issue = void 0;
class Issue {
    _title;
    _body;
    _url;
    _id;
    _labels;
    constructor(id, title, body, url, labels) {
        this._title = title;
        this._body = body;
        this._url = url;
        this._id = id;
        this._labels = labels;
    }
    get title() { return this._title; }
    ;
    get body() { return this._body; }
    ;
    get url() { return this._url; }
    ;
    get id() { return this._id; }
    ;
    get labels() { return this._labels; }
    ;
}
exports.Issue = Issue;
//# sourceMappingURL=models.js.map