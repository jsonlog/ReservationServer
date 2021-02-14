"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpRequester_1 = require("./httpRequester");
const apiBaseUrl = "https://reservation.weihanli.xyz";
async function main(event, context, callback) {
    console.log(event);
    let queryString = "";
    if (event.queryString) {
        queryString = "?";
        let i = 0;
        for (var key in event.queryString) {
            if (i > 0) {
                queryString += `&`;
            }
            else {
                i++;
            }
            queryString += `${key}=${event.queryString[key]}`;
        }
    }
    if (event.path.startsWith(`${event.requestContext.path}`)) {
        event.path = event.path.replace(`${event.requestContext.path}`, '');
    }
    let url = `${apiBaseUrl}${event.path}${queryString}`;
    let ip = event.requestContext.sourceIp;
    if (ip) {
        event.headers["X-Forwarded-For"] = ip;
        event.headers["X-Real-IP"] = ip;
    }
    console.log(`request url: ${url}, method: ${event.httpMethod}, sourceIp: ${ip}`);
    let response = await httpRequester_1.HttpRequester.GetResponse(url, event.httpMethod, event.headers, event.body);
    console.log(`response: ${JSON.stringify(response)}`);
    return {
        isBase64: false,
        statusCode: response.statusCode,
        headers: response.responseHeaders,
        body: response.responseText
    };
}
;
exports.main_handler = main;
