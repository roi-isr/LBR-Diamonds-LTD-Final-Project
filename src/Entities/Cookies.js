/* A class response of creating web browser's cookies instances */

import Cookies from "universal-cookie";
export class WebCookies {
    constructor() {
        this._cookies = new Cookies;
        this._accessKey = 'accessTokenStr';
        this._refreshKey = 'refreshTokenStr';
        this._expirationKey = 'accessTokenExpiration'
    }

    getCookies(cookiesKey) {
        return this._cookies.get(cookiesKey);
    }

    setCookies(cookiesKey, cookiesValue) {
        this._cookies.set(cookiesKey, cookiesValue);
    }

    getAccessToken() {
        return this._cookies.get(this._accessKey);
    }

    setAccessToken(cookiesValue) {
        this._cookies.set(this._accessKey, cookiesValue, { path: '/' });
        this._setExpirationTime();
    }

    getRefreshToken() {
        return this._cookies.get(this._refreshKey);
    }

    setRefreshToken(cookiesValue) {
        this._cookies.set(this._refreshKey, cookiesValue, { path: '/' });
    }

    isAccessTokenExpired() {
        const now = (new Date()).getTime();
        return now > +this._cookies.get(this._expirationKey);
    }

    _setExpirationTime() {
        const expirationMinutes = 15 - 0.1;
        const expirationTime = (new Date(new Date().getTime() + expirationMinutes * 60 * 1000)).getTime();
        this._cookies.set(this._expirationKey, expirationTime, { path: '/' });
    }

    // Remove access token from browser cookies
    removeCookies() {
        const keys = [this._accessKey, this._refreshKey, this._expirationKey]
        keys.forEach(key => this._cookies.remove(key))
    }
}