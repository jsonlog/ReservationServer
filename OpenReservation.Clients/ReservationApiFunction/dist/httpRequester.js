"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpResponse = exports.HttpRequester = void 0;
const got = __importStar(require("got"));
class HttpRequester {
    static async GetResponse(url, method, headers, body) {
        headers["host"] = undefined;
        console.log(`request info, url: ${url}, method: ${method}, headers: ${JSON.stringify(headers)}`);
        let result = await got.default(url, {
            body: body,
            method: method,
            headers: headers
        });
        var response = new HttpResponse();
        response.statusCode = result.statusCode;
        response.responseText = result.body;
        response.responseHeaders = result.headers;
        return response;
    }
}
exports.HttpRequester = HttpRequester;
class HttpResponse {
    constructor() {
        this._statusCode = -1;
        this._responseText = "";
        this._headers = undefined;
    }
    get statusCode() {
        return this._statusCode;
    }
    set statusCode(v) {
        this._statusCode = v;
    }
    get responseText() {
        return this._responseText;
    }
    set responseText(v) {
        this._responseText = v;
    }
    get responseHeaders() {
        return this._headers;
    }
    set responseHeaders(v) {
        this._headers = v;
    }
}
exports.HttpResponse = HttpResponse;
