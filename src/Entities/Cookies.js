/* A class response of creating web browser's cookies instances */

import Cookies from "universal-cookie";
export class WebCookies {
    constructor() {
        this.cookies = new Cookies;
    }

    getCookies(cookiesKey) {
        return this.cookies.get(cookiesKey);
    }

    setCookies(cookiesKey, cookiesValue) {
        this.cookies.set(cookiesKey, cookiesValue);
    }

    setAuth(cookiesValue) {
        this.cookies.set('tokenStr', cookiesValue, { path: '/' });
    }

    // Remove access token from browser cookies
    removeCookies(cookiesKey) {
        this.cookies.remove(cookiesKey);
    }

    saveUsernameAndPasswordCookie = (email, password) => {
        this.cookies.set("username", email);
        this.cookies.set("password", password);
    }
}