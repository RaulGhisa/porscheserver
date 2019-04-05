
/// <reference path="@types/jquery/index.d.ts" />
/// <reference path="@types/react/index.d.ts" />
/// <reference path="@types/google-map-react/index.d.ts" />
/// <reference path="@types/prop-types/index.d.ts" />
// / <reference path="@types/react-google-maps/index.d.ts" />
///// <reference path="@types/react-dom/index.d.ts" />

namespace ro.demo {

    export interface PageProps<P, R> {
        params: P;
        result: R;
    }

    export interface ValueLabelModel {
        value: number | null | undefined;
        label: string;
    }

    export type StringKeyMap<T> = { [key: string]: T };
    export type NumberKeyMap<T> = { [key: number]: T };

    export type VoidFunction = () => void;
    export type RestFunction<P, R> = (params: P, success: (result: R) => void, error?: (result?: R) => void) => void;

    export interface MeasurableReactComponent {
        measureWidth: VoidFunction;
    }

    interface PageInfo {
        component: typeof React.Component;
        loadUrl: string | null;
    }


    // style

    export let contentStyle: React.CSSProperties = { maxWidth: "768px", margin: "0 auto" };
    export let mainColor: string =  "#BEDB39";    
    export let darkerColor: string =  "#596a0a"; 
    export let lighterColor: string =  "#f0fac4"; 

    // end style

    let pageHost: PageHost | undefined;
    let allPages: StringKeyMap<PageInfo> = {};
    let allPopups: (typeof React.Component)[] = [];
    let uniqueNumberSeed: number = 1;
    export let userId: number = 0;
    export let username: string = '';

    export let settings: InitSettings = {} as any;

    export let inspectResponseCallback: Function;
    export let initDoneCallback: VoidFunction;

    export function page(name: string, loadUrl: string | null, needsReturnPage: boolean = false) {
        return function (component: any) {
            component.needsReturnPage = needsReturnPage;
            allPages[name] = { component, loadUrl };
        };
    }

    export function popup(component: any) {
        allPopups.push(component);
    }

    export interface FontFace {
        fileName: string[];
        name: string;
    }


    export interface InitSettings {
        defaultPageId: string;
        cssUrl: string;
        imgUrl: string;
        mediaUrl: string;
        defaultThemeImgUrl: string;
        returnUrl: string;
        returnPages: StringKeyMap<string>;
        props: any;
        root: string;
        buildTimestamp: string;
        warName: string;
        data: any;

    }


    declare var ReactDOM: any;

    export function init(/*initSettings: InitSettings*/) {


        //settings = initSettings;
        settings.defaultPageId = "main";
        if (settings.root == null) {
            // settings.root = "http://localhost:8080/";
            settings.root = "";
        }

        pageHost = (ReactDOM as any).render(<PageHost />, document.getElementById("main")) as any as PageHost;


        let location = window.location;
        console.log(location)
        if (location.hash.length <= 1) {
            let href = location.href;
            let hashIndex = href.indexOf("#");
            if (hashIndex >= 0) {
                href = href.substring(0, hashIndex);
            }

            location.replace(href + "#" + settings.defaultPageId);
        }

        window.addEventListener("hashchange", () => {
            onHashChange();
        }, false);


        onHashChange();

        if (initDoneCallback) {
            initDoneCallback();
        }
    }

    function onHashChange() {
        let { pageName, pageParams } = decodePageHash();
        if (!pageName) {
            pageName = settings.defaultPageId;
        }

        let pageInfo = allPages[pageName];
        if (!pageInfo) {
            console.error("Invalid page " + pageName);
            return;
        }

        if (pageInfo.loadUrl) {
            callRest(pageInfo.loadUrl, pageParams, result => {
                if (pageHost) {
                    pageHost.setPage(pageInfo.component, pageName, pageParams, result);
                }
            });

        } else {
            if (pageHost) {
                pageHost.setPage(pageInfo.component, pageName, pageParams, null);
            }
        }
    }

    function encodePageHash(pageName: string, pageParams: any): string {
        let hash = pageName;
        if (pageParams) {
            hash += "/" + btoa(JSON.stringify(pageParams));
        }

        return hash;
    }

    function decodePageHash(): { pageName: string, pageParams: any } {
        let result: any = { pageName: null, pageParams: null };
        let hash = window.location.hash;
        if (!hash) {
            return result;
        }

        hash = hash.substr(1);

        let firstSlash = hash.indexOf("/");
        if (firstSlash == -1) {
            result.pageName = hash;
        } else if (firstSlash > 0) {
            result.pageName = hash.substring(0, firstSlash);
            let params = hash.substring(firstSlash + 1);
            if (params) {
                result.pageParams = JSON.parse(atob(params));
            }
        }

        return result;
    }

    export function restPending(): boolean {
        return !!($ as any).active;
    }

    function setHash(hash: string) {
        if (!restPending()) {
            let oldHash = window.location.hash || "";
            if (oldHash.indexOf("#") != 0) {
                oldHash = "#" + oldHash;
            }
            let newHash = hash || "";
            if (newHash.indexOf("#") != 0) {
                newHash = "#" + newHash;
            }
            if (newHash == oldHash) {
                onHashChange();
            } else {
                window.location.hash = hash;
            }
        } else {
            window.setTimeout(() => {
                setHash(hash);
            }, 30);
        }
    }


    export function navigatePage(pageComponent: typeof React.Component | string | any | null | undefined, params?: any) {
        let targetPageName: string | undefined;
        let targetPage: typeof React.Component;

        if (pageComponent) {
            if (typeof pageComponent === "string") {
                targetPageName = pageComponent;
                targetPage = allPages[pageComponent].component;
            } else {
                targetPage = pageComponent;

                for (let pageName of Object.keys(allPages)) {
                    if (targetPage === allPages[pageName].component) {
                        targetPageName = pageName;
                        break;
                    }
                }
            }
        } else {
            targetPageName = decodePageHash().pageName;
            targetPage = allPages[targetPageName].component;
        }

        if (targetPageName && pageHost) {
            if ((targetPage as any).needsReturnPage && targetPage !== pageHost.getPages()[0].pageType) {
                settings.returnPages[targetPageName] = window.location.hash;
                callRest("savereturnpages", { returnPages: settings.returnPages }, () => {
                }, undefined, false);
            }

            setHash(encodePageHash(targetPageName, params));
            return;
        }

        for (let popupComponent of allPopups) {
            if (popupComponent == targetPage) {
                if (pageHost) {
                    pageHost.pushPage(targetPage, targetPageName, params, null);
                }
                return;
            }
        }

        console.error("Invalid page");
    }

    export function getCurrentPageId(): string {
        let href = window.location.hash;
        let hashIndex = href.indexOf("#");
        if (hashIndex == 0) {
            href = href.substring(1);
        } else if (hashIndex > 0) {
            href = href.substring(0, hashIndex);
        }
        return href;
    }

    export function getCurrentPageName(): string | null | undefined {
        if (!pageHost) {
            return null;
        }
        let pages = pageHost.getPages();
        if (pages.length == 0) {
            return null;
        }

        return pages[pages.length - 1].pageName;
    }

    export function navigateBack() {
        if (!pageHost) {
            return;
        }
        if (pageHost.getPages().length > 1) {
            pageHost.popPage();
        } else {
            let hash = settings.returnPages[decodePageHash().pageName];
            if (hash) {
                setHash(hash);
            }
        }
    }

    export function lockUi(): void {
        setTimeout(() => {
            if (pageHost) {
                pageHost.setLocked(true);
            }
        }, 1);
    }

    export function unlockUi(): void {
        setTimeout(() => {
            if (pageHost) {
                pageHost.setLocked(false);
            }
        }, 1);
    }


    export function callRest<P, R>(url: string, params: P, success: (result: R) => void, error?: (result?: R) => void, showSpinner: boolean = true) {

        defineRest<any, any>(url, showSpinner)(params, success, error);
    }

    export function defineRest<P, R>(url: string, showSpinner: boolean = true): RestFunction<P, R> {
        return (params: P, success: (result: R) => void, error?: (result?: R) => void) => {
            if (showSpinner) {
                lockUi();
            }
            if (!params) {
                params = {} as P;
            }
            if (params == null) {
                params = {} as any;
            }
            (params as any).userId = ro.demo.userId;
            (params as any).username = ro.demo.username;
            // alert(JSON.stringify(params) + url);
            url = util.updateQueryStringParameter(url, "ts", new Date().getTime().toString());
            console.log(url)
            $.ajax({
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                type: "POST",
                url: settings.root + url,
                data: JSON.stringify(params),
                success: function (response: any) {
                    if (showSpinner) {
                        unlockUi();
                    }
                    if (response.errors && response.errors.length > 0) {
                        if (error) {
                            error(response);
                        } else {
                            criticalError();
                        }
                    } else {
                        if (inspectResponseCallback) {
                            if (inspectResponseCallback(response) === false) {
                                return;
                            }
                        }

                        if (success) {
                            success(response);
                        }
                    }
                },
                dataType: "json",
                jsonp: false,
                error: function () {
                    if (showSpinner) {
                        unlockUi();
                    }

                    if (error) {
                        error();
                    } else {
                        criticalError();
                    }
                }
            });
        };
    }

    export function criticalError() {
        location.replace("pages/error.html");
    }


    export function getUrl(url: string, noCache: boolean = true): string {
        url = settings.root + url;

        if (noCache) {
            url = util.noCacheUrl(url);
        }

        return url;
    }

    export function extraLoadedCallback(defer: JQueryDeferred<any>): void {
        defer.resolve();
    }

    export function redirect(url: string, replace: boolean = false) {
        if (!url) {
            criticalError();
            return;
        }

        function tryRedirect(retryCount: number) {
            lockUi();
            if (restPending()) {
                if (retryCount <= 0) {
                    unlockUi();
                    return;
                }

                setTimeout(function () {
                    tryRedirect(retryCount - 1);
                }, 100);
            } else {
                if (replace) {
                    window.location.replace(url);
                } else {
                    window.location.href = url;
                }
            }
        }

        document.body.focus();
        lockUi();
        setTimeout(function () {
            tryRedirect(50);
        }, 100);

    }

    export function reloadPage(saveScrollPosition: boolean = true) {
        if (pageHost && saveScrollPosition) {
            let scrollPosition = $(document).scrollTop();
            if (scrollPosition != null) {
                pageHost.scrollPosition = scrollPosition;
            }
        }

        onHashChange();
    }


    export function openNewTab(url: string | null | undefined): void {
        if (!url) {
            return;
        }

        if (url.indexOf("://") < 0) {
            url = "http://" + url;
        }

        window.open(url, "_blank");
    }


    export function uniqueNumber(): number {
        return uniqueNumberSeed++;
    }



    export function internal_getPageHost(): PageHost | undefined {
        return pageHost;
    }

    export function intToString(value: number | null | undefined, defaultString: string = "", paddedLength: number = 0): string {
        if ((value == null) || isNaN(value) || !isFinite(value)) {
            return defaultString;
        }

        let result = value.toString();
        if (paddedLength > 0) {
            result = util.leftPad(result, paddedLength, "0");
        }

        return result;
    }

    export function intFromStringStrict(value: string): number | null {
        let val: number | null = intFromString(value);
        if (val == null) {
            return null;
        }
        if (value === intToString(val)) {
            return val;
        } else {
            return null;
        }

    }

    export function intFromString(value: string, defaultNumberEmptyString: number | null = null,
        defaultNumberUndefinedString: number | null = null, defaultNumberInvalidFormatString: number | null = null): number | null {
        if (value == null) {
            return defaultNumberUndefinedString;
        }

        if (value.length == 0) {
            return defaultNumberEmptyString;
        }

        let parsed = parseInt(value, 10);
        if (isNaN(parsed) || !isFinite(parsed)) {
            return defaultNumberInvalidFormatString;
        }

        return parsed;
    }


    export function b64EncodeUnicode(str: string) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (_match: string, p1: string) {
            let hexString: string = "0x" + p1;
            return String.fromCharCode(parseInt(hexString, 16));
        }));
    }

    export function b64DecodeUnicode(str: string) {
        return decodeURIComponent(Array.prototype.map.call(atob(str), function (c: any) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(""));
    }
}


