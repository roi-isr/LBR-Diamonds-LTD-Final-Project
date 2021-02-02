/* A class response of creating web browser's cookies instances */

import Cookies from "universal-cookie";

export class WebCookies {
    constructor(cookiesKey) {
        this.cookies = new Cookies;
        this.cookiesKey = cookiesKey;
    }

    getCookies() {
        return this.cookies.get(this.cookiesKey);
    }

    // Remove access token from browser cookies
    removeCookies() {
        this.cookies.set(this.cookiesKey, "", { path: '/' });
    }
}