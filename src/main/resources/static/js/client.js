"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ro;
(function (ro) {
    var demo;
    (function (demo) {
        var util;
        (function (util) {
            var isoDateRegex = /^\s*(\d{4})-(\d{2})-(\d{2})\s*$/;
            var isoDateTimeRegex = /^\s*(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})\s*$/;
            function getQueryStringParameter(name, uri) {
                name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
                var regexS = "[\\?&]" + name + "=([^&#]*)";
                var regex = new RegExp(regexS);
                var results = regex.exec(uri || window.location.search);
                if (!results) {
                    return "";
                }
                else {
                    return decodeURIComponent(results[1].replace(/\+/g, " "));
                }
            }
            util.getQueryStringParameter = getQueryStringParameter;
            function updateQueryStringParameter(uri, key, value) {
                var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
                var separator = uri.indexOf("?") !== -1 ? "&" : "?";
                if (uri.match(re)) {
                    return uri.replace(re, "$1" + key + "=" + value + "$2");
                }
                else {
                    return uri + separator + key + "=" + value;
                }
            }
            util.updateQueryStringParameter = updateQueryStringParameter;
            function noCacheUrl(url) {
                if (getQueryStringParameter("ts", url)) {
                    return url;
                }
                return updateQueryStringParameter(url, "ts", new Date().getTime().toString());
            }
            util.noCacheUrl = noCacheUrl;
            function urlCombine(root) {
                var paths = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                    paths[_i - 1] = arguments[_i];
                }
                var result = root + "/" + paths.join("/");
                result = result.replace(/([^:\s])\/+/g, "$1/");
                return result;
            }
            util.urlCombine = urlCombine;
            function getQueryStringObject(uri) {
                var result = {};
                uri = uri || window.location.href;
                uri = uri.split("?").slice(1).join("?");
                uri.replace(new RegExp("([^?=&]+)(=([^&#]*))?", "g"), function (_$0, $1, _$2, $3) {
                    if ($1 && $3) {
                        result[decodeURIComponent($1)] = decodeURIComponent($3);
                    }
                    return "";
                });
                return result;
            }
            util.getQueryStringObject = getQueryStringObject;
            var DateTime = /** @class */ (function () {
                function DateTime(year, month, day, hour, minute, second) {
                    if (hour === void 0) { hour = 0; }
                    if (minute === void 0) { minute = 0; }
                    if (second === void 0) { second = 0; }
                    this.year = year;
                    this.month = month;
                    this.day = day;
                    this.hour = hour;
                    this.minute = minute;
                    this.second = second;
                }
                DateTime.parseIso = function (input) {
                    if (input == null) {
                        return null;
                    }
                    var match = isoDateRegex.exec(input);
                    if (match) {
                        var year = demo.intFromString(match[1]);
                        var month = demo.intFromString(match[2]);
                        var day = demo.intFromString(match[3]);
                        if (year && month && day) {
                            var result = new DateTime(year, month, day);
                            return result.isValid() ? result : null;
                        }
                        else {
                            return null;
                        }
                    }
                    match = isoDateTimeRegex.exec(input);
                    if (match) {
                        var year = demo.intFromString(match[1]);
                        var month = demo.intFromString(match[2]);
                        var day = demo.intFromString(match[3]);
                        var hour = demo.intFromString(match[4]);
                        var minute = demo.intFromString(match[5]);
                        var second = demo.intFromString(match[6]);
                        if (year && month && day && hour != null && minute != null && second != null) {
                            var result = new DateTime(year, month, day, hour, minute, second);
                            return result.isValid() ? result : null;
                        }
                        else {
                            return null;
                        }
                    }
                    return null;
                };
                DateTime.now = function () {
                    var now = new Date();
                    return new DateTime(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
                };
                DateTime.compareDates = function (date1, date2) {
                    var firstDate = new Date();
                    firstDate.setFullYear(date1.year);
                    firstDate.setMonth(date1.month);
                    firstDate.setDate(date1.day);
                    var secondDate = new Date();
                    secondDate.setFullYear(date2.year);
                    secondDate.setMonth(date2.month);
                    secondDate.setDate(date2.day);
                    return firstDate > secondDate ? 1 : (firstDate.getTime() === secondDate.getTime() ? 0 : -1);
                };
                DateTime.prototype.toIsoDateString = function () {
                    return demo.intToString(this.year, "0000", 4) + "-" +
                        demo.intToString(this.month, "00", 2) + "-" +
                        demo.intToString(this.day, "00", 2);
                };
                DateTime.prototype.toIsoDateTimeString = function () {
                    return this.toIsoDateString() + " " +
                        demo.intToString(this.hour, "00", 2) + ":" +
                        demo.intToString(this.minute, "00", 2) + ":" +
                        demo.intToString(this.second, "00", 2);
                };
                DateTime.prototype.toClientDateString = function () {
                    return demo.intToString(this.day, "00", 2) + "-" +
                        demo.intToString(this.month, "00", 2) + "-" +
                        demo.intToString(this.year, "0000", 4);
                };
                DateTime.prototype.toClientDateTimeString = function () {
                    return this.toClientDateString() + " " +
                        demo.intToString(this.hour, "00", 2) + ":" +
                        demo.intToString(this.minute, "00", 2);
                };
                DateTime.prototype.clone = function () {
                    return new DateTime(this.year, this.month, this.day, this.hour, this.minute, this.second);
                };
                DateTime.prototype.fitDayInMonth = function () {
                    if (this.day <= 0) {
                        this.day = 1;
                    }
                    var daysInMonth = this.getDaysInMonth();
                    if (this.day > daysInMonth) {
                        this.day = daysInMonth;
                    }
                };
                DateTime.prototype.getDaysInMonth = function () {
                    return new Date(this.year, this.month, 0).getDate();
                };
                DateTime.prototype.addMonths = function (months) {
                    var date = new Date(this.year, this.month - 1 + months, 1);
                    this.year = date.getFullYear();
                    this.month = date.getMonth() + 1;
                };
                DateTime.prototype.isValid = function () {
                    var date = new Date(this.year, this.month - 1, this.day, this.hour || 0, this.minute || 0, this.second || 0);
                    return date.getFullYear() == this.year && date.getMonth() == this.month - 1 && date.getDate() == this.day &&
                        date.getHours() == this.hour && date.getMinutes() == this.minute && date.getSeconds() == this.second;
                };
                return DateTime;
            }());
            util.DateTime = DateTime;
            function dateToIso(input) {
                // dd-mm-yyyy -> yyyy-mm-dd
                var regex = /^\s*(\d{2})-(\d{2})-(\d{4})\s*$/;
                var match = regex.exec(input);
                if (!match) {
                    return "";
                }
                return match[3] + "-" + match[2] + "-" + match[1];
            }
            util.dateToIso = dateToIso;
            function dateFromIso(input) {
                if (input == null) {
                    return "";
                }
                var match = isoDateRegex.exec(input);
                if (!match) {
                    return "";
                }
                return match[3] + "-" + match[2] + "-" + match[1];
            }
            util.dateFromIso = dateFromIso;
            function dateTimeToIso(input) {
                // dd-mm-yyyy hh:mm -> yyyy-mm-dd hh:mm:ss
                var regex = /^\s*(\d{2})-(\d{2})-(\d{4})\s(\d{2}):(\d{2})\s*$/;
                var match = regex.exec(input);
                if (!match) {
                    return "";
                }
                return match[3] + "-" + match[2] + "-" + match[1] + " " + match[4] + ":" + match[5] + ":00";
            }
            util.dateTimeToIso = dateTimeToIso;
            function dateTimeFromIso(input) {
                if (input == null) {
                    return "";
                }
                var match = isoDateTimeRegex.exec(input);
                if (!match) {
                    return "";
                }
                return match[3] + "-" + match[2] + "-" + match[1] + " " + match[4] + ":" + match[5];
            }
            util.dateTimeFromIso = dateTimeFromIso;
            function getBackgroundImageUrl(element) {
                var url = element.css("background-image");
                var matches = /^url\(([""]?)(.*)\1\)$/.exec(url);
                return matches ? matches[2] : "";
            }
            function getLessData(lessClass) {
                var lessElement = $("." + lessClass);
                if (lessElement.length == 0) {
                    $("body").append($("<div>").addClass(lessClass).addClass("displayNone"));
                }
                var backgroundUrl = getBackgroundImageUrl(lessElement);
                return getQueryStringObject(backgroundUrl);
            }
            util.getLessData = getLessData;
            function getFileExtension(filename) {
                if (filename == null) {
                    return "";
                }
                var ext = /^.+\.([^.]+)$/.exec(filename);
                return !ext ? "" : ext[1].toLowerCase();
            }
            util.getFileExtension = getFileExtension;
            function validFileExtension(list, extension) {
                for (var i = 0; i < list.length; i++) {
                    if (list[i] == extension) {
                        return true;
                    }
                }
                return false;
            }
            util.validFileExtension = validFileExtension;
            function replaceExtension(filename, extension) {
                if (!filename) {
                    return null;
                }
                return filename.replace(/\.([^.]+)$/, "." + extension);
            }
            util.replaceExtension = replaceExtension;
            function validEmail(input) {
                if (!input) {
                    return false;
                }
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input);
            }
            util.validEmail = validEmail;
            function validUrl(input) {
                if (!input) {
                    return false;
                }
                return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.|)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(input);
            }
            util.validUrl = validUrl;
            function truncate(input, n, useWordBoundary) {
                if (!input) {
                    return "";
                }
                var tooLong = input.length > n;
                var part = tooLong ? input.substr(0, n - 1) : input;
                part = useWordBoundary && tooLong ? part.substr(0, part.lastIndexOf(" ")) : part;
                return tooLong ? part + "..." : part;
            }
            util.truncate = truncate;
            function parseNumberArray(input) {
                if (input) {
                    input = $.trim(input);
                }
                if (!input) {
                    return [];
                }
                var items = input.split(/\s*[,;]\s*/);
                var result = [];
                for (var i = 0; i < items.length; i++) {
                    var value = demo.intFromString(items[i]);
                    if (value !== null) {
                        result.push(value);
                    }
                }
                return result;
            }
            util.parseNumberArray = parseNumberArray;
            function parseStringArray(input) {
                var result = [];
                if (input) {
                    var items = input.split(",");
                    if (items) {
                        var itemsLength = items.length;
                        for (var i = 0; i < itemsLength; i++) {
                            var item = $.trim(items[i]);
                            if (item > "") {
                                result.push(item);
                            }
                        }
                    }
                }
                return result;
            }
            util.parseStringArray = parseStringArray;
            function stringCapitalize(value) {
                if (!value) {
                    return value;
                }
                return value.slice(0, 1).toUpperCase() + value.slice(1);
            }
            util.stringCapitalize = stringCapitalize;
            function leftPad(s, width, char) {
                return (s.length >= width) ? s : (new Array(width).join(char) + s).slice(-width);
            }
            util.leftPad = leftPad;
            function mmToPixels(value) {
                if (!value || isNaN(value)) {
                    return 0;
                }
                return Math.round(3.78 * value);
            }
            util.mmToPixels = mmToPixels;
            function getDevicePixelRatio() {
                if (window["devicePixelRatio"]) { // tslint:disable-line:no-string-literal
                    return window.devicePixelRatio;
                }
                else {
                    return 1.0;
                }
            }
            util.getDevicePixelRatio = getDevicePixelRatio;
            function getSmoothDevicePixelRatio() {
                if (window["devicePixelRatio"]) { // tslint:disable-line:no-string-literal
                    if (window.devicePixelRatio >= 1) {
                        return Math.ceil(window.devicePixelRatio);
                    }
                    else {
                        return window.devicePixelRatio;
                    }
                }
                else {
                    return 1.0;
                }
            }
            util.getSmoothDevicePixelRatio = getSmoothDevicePixelRatio;
            function firstDefined() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (args == null) {
                    return null;
                }
                for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
                    var val = args_1[_a];
                    if (val != null) {
                        return val;
                    }
                }
                return null;
            }
            util.firstDefined = firstDefined;
            function callOnClickVoidFunction(component) {
                if (component.props.onClick) {
                    component.props.onClick();
                }
            }
            util.callOnClickVoidFunction = callOnClickVoidFunction;
            function copyDefinedFields(target, source) {
                for (var _i = 0, _a = Object.keys(source); _i < _a.length; _i++) {
                    var key = _a[_i];
                    if (source[key] != null) {
                        target[key] = source[key];
                    }
                }
            }
            util.copyDefinedFields = copyDefinedFields;
            function debounce(func, wait) {
                if (wait === void 0) { wait = 100; }
                var h;
                return function () {
                    clearTimeout(h);
                    h = setTimeout(function () { return func(); }, wait);
                };
            }
            util.debounce = debounce;
            function setCookie(name, value, expirationDays) {
                if (expirationDays === void 0) { expirationDays = 0; }
                var expires = "";
                if (expirationDays != 0) {
                    var d = new Date();
                    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
                    expires = ";expires=" + d.toUTCString();
                }
                document.cookie = name + "=" + value + expires + ";path=/";
            }
            util.setCookie = setCookie;
            function getCookie(name) {
                var searchName = name + "=";
                var ca = document.cookie.split(";");
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == " ") {
                        c = c.substring(1);
                    }
                    if (c.indexOf(searchName) == 0) {
                        return c.substring(searchName.length, c.length);
                    }
                }
                return "";
            }
            util.getCookie = getCookie;
            function deleteCookie(name) {
                setCookie(name, "", -2);
            }
            util.deleteCookie = deleteCookie;
            function stringReplacer(tpl, args) {
                return tpl.replace(/\${(\w+)}/g, function (_, v) { return args[v]; });
            }
            util.stringReplacer = stringReplacer;
            function getPdfUrl(fileId) {
                var url = util.updateQueryStringParameter("common-files/download", "fileId", fileId);
                url = util.updateQueryStringParameter(url, "ts", new Date().getTime().toString());
                return url;
            }
            util.getPdfUrl = getPdfUrl;
        })(util = demo.util || (demo.util = {}));
    })(demo = ro.demo || (ro.demo = {}));
})(ro || (ro = {}));
/// <reference path="@types/jquery/index.d.ts" />
/// <reference path="@types/react/index.d.ts" />
// / <reference path="@types/react-google-maps/index.d.ts" />
///// <reference path="@types/react-dom/index.d.ts" />
var ro;
(function (ro) {
    var demo;
    (function (demo) {
        // style
        demo.contentStyle = { maxWidth: "768px", margin: "0 auto" };
        demo.mainColor = "#BEDB39";
        demo.darkerColor = "#596a0a";
        demo.lighterColor = "#f0fac4";
        // end style
        var pageHost;
        var allPages = {};
        var allPopups = [];
        var uniqueNumberSeed = 1;
        demo.userId = 0;
        demo.username = '';
        demo.settings = {};
        function page(name, loadUrl, needsReturnPage) {
            if (needsReturnPage === void 0) { needsReturnPage = false; }
            return function (component) {
                component.needsReturnPage = needsReturnPage;
                allPages[name] = { component: component, loadUrl: loadUrl };
            };
        }
        demo.page = page;
        function popup(component) {
            allPopups.push(component);
        }
        demo.popup = popup;
        function init( /*initSettings: InitSettings*/) {
            //settings = initSettings;
            demo.settings.defaultPageId = "main";
            if (demo.settings.root == null) {
                // settings.root = "http://localhost:8080/";
                demo.settings.root = "";
            }
            pageHost = ReactDOM.render(React.createElement(demo.PageHost, null), document.getElementById("main"));
            var location = window.location;
            console.log(location);
            if (location.hash.length <= 1) {
                var href = location.href;
                var hashIndex = href.indexOf("#");
                if (hashIndex >= 0) {
                    href = href.substring(0, hashIndex);
                }
                location.replace(href + "#" + demo.settings.defaultPageId);
            }
            window.addEventListener("hashchange", function () {
                onHashChange();
            }, false);
            onHashChange();
            if (demo.initDoneCallback) {
                demo.initDoneCallback();
            }
        }
        demo.init = init;
        function onHashChange() {
            var _a = decodePageHash(), pageName = _a.pageName, pageParams = _a.pageParams;
            if (!pageName) {
                pageName = demo.settings.defaultPageId;
            }
            var pageInfo = allPages[pageName];
            if (!pageInfo) {
                console.error("Invalid page " + pageName);
                return;
            }
            if (pageInfo.loadUrl) {
                callRest(pageInfo.loadUrl, pageParams, function (result) {
                    if (pageHost) {
                        pageHost.setPage(pageInfo.component, pageName, pageParams, result);
                    }
                });
            }
            else {
                if (pageHost) {
                    pageHost.setPage(pageInfo.component, pageName, pageParams, null);
                }
            }
        }
        function encodePageHash(pageName, pageParams) {
            var hash = pageName;
            if (pageParams) {
                hash += "/" + btoa(JSON.stringify(pageParams));
            }
            return hash;
        }
        function decodePageHash() {
            var result = { pageName: null, pageParams: null };
            var hash = window.location.hash;
            if (!hash) {
                return result;
            }
            hash = hash.substr(1);
            var firstSlash = hash.indexOf("/");
            if (firstSlash == -1) {
                result.pageName = hash;
            }
            else if (firstSlash > 0) {
                result.pageName = hash.substring(0, firstSlash);
                var params = hash.substring(firstSlash + 1);
                if (params) {
                    result.pageParams = JSON.parse(atob(params));
                }
            }
            return result;
        }
        function restPending() {
            return !!$.active;
        }
        demo.restPending = restPending;
        function setHash(hash) {
            if (!restPending()) {
                var oldHash = window.location.hash || "";
                if (oldHash.indexOf("#") != 0) {
                    oldHash = "#" + oldHash;
                }
                var newHash = hash || "";
                if (newHash.indexOf("#") != 0) {
                    newHash = "#" + newHash;
                }
                if (newHash == oldHash) {
                    onHashChange();
                }
                else {
                    window.location.hash = hash;
                }
            }
            else {
                window.setTimeout(function () {
                    setHash(hash);
                }, 30);
            }
        }
        function navigatePage(pageComponent, params) {
            var targetPageName;
            var targetPage;
            if (pageComponent) {
                if (typeof pageComponent === "string") {
                    targetPageName = pageComponent;
                    targetPage = allPages[pageComponent].component;
                }
                else {
                    targetPage = pageComponent;
                    for (var _i = 0, _a = Object.keys(allPages); _i < _a.length; _i++) {
                        var pageName = _a[_i];
                        if (targetPage === allPages[pageName].component) {
                            targetPageName = pageName;
                            break;
                        }
                    }
                }
            }
            else {
                targetPageName = decodePageHash().pageName;
                targetPage = allPages[targetPageName].component;
            }
            if (targetPageName && pageHost) {
                if (targetPage.needsReturnPage && targetPage !== pageHost.getPages()[0].pageType) {
                    demo.settings.returnPages[targetPageName] = window.location.hash;
                    callRest("savereturnpages", { returnPages: demo.settings.returnPages }, function () {
                    }, undefined, false);
                }
                setHash(encodePageHash(targetPageName, params));
                return;
            }
            for (var _b = 0, allPopups_1 = allPopups; _b < allPopups_1.length; _b++) {
                var popupComponent = allPopups_1[_b];
                if (popupComponent == targetPage) {
                    if (pageHost) {
                        pageHost.pushPage(targetPage, targetPageName, params, null);
                    }
                    return;
                }
            }
            console.error("Invalid page");
        }
        demo.navigatePage = navigatePage;
        function getCurrentPageId() {
            var href = window.location.hash;
            var hashIndex = href.indexOf("#");
            if (hashIndex == 0) {
                href = href.substring(1);
            }
            else if (hashIndex > 0) {
                href = href.substring(0, hashIndex);
            }
            return href;
        }
        demo.getCurrentPageId = getCurrentPageId;
        function getCurrentPageName() {
            if (!pageHost) {
                return null;
            }
            var pages = pageHost.getPages();
            if (pages.length == 0) {
                return null;
            }
            return pages[pages.length - 1].pageName;
        }
        demo.getCurrentPageName = getCurrentPageName;
        function navigateBack() {
            if (!pageHost) {
                return;
            }
            if (pageHost.getPages().length > 1) {
                pageHost.popPage();
            }
            else {
                var hash = demo.settings.returnPages[decodePageHash().pageName];
                if (hash) {
                    setHash(hash);
                }
            }
        }
        demo.navigateBack = navigateBack;
        function lockUi() {
            setTimeout(function () {
                if (pageHost) {
                    pageHost.setLocked(true);
                }
            }, 1);
        }
        demo.lockUi = lockUi;
        function unlockUi() {
            setTimeout(function () {
                if (pageHost) {
                    pageHost.setLocked(false);
                }
            }, 1);
        }
        demo.unlockUi = unlockUi;
        function callRest(url, params, success, error, showSpinner) {
            if (showSpinner === void 0) { showSpinner = true; }
            defineRest(url, showSpinner)(params, success, error);
        }
        demo.callRest = callRest;
        function defineRest(url, showSpinner) {
            if (showSpinner === void 0) { showSpinner = true; }
            return function (params, success, error) {
                if (showSpinner) {
                    lockUi();
                }
                if (!params) {
                    params = {};
                }
                if (params == null) {
                    params = {};
                }
                params.userId = ro.demo.userId;
                params.username = ro.demo.username;
                // alert(JSON.stringify(params) + url);
                url = demo.util.updateQueryStringParameter(url, "ts", new Date().getTime().toString());
                console.log(url);
                $.ajax({
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    type: "POST",
                    url: demo.settings.root + url,
                    data: JSON.stringify(params),
                    success: function (response) {
                        if (showSpinner) {
                            unlockUi();
                        }
                        if (response.errors && response.errors.length > 0) {
                            if (error) {
                                error(response);
                            }
                            else {
                                criticalError();
                            }
                        }
                        else {
                            if (demo.inspectResponseCallback) {
                                if (demo.inspectResponseCallback(response) === false) {
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
                        }
                        else {
                            criticalError();
                        }
                    }
                });
            };
        }
        demo.defineRest = defineRest;
        function criticalError() {
            location.replace("pages/error.html");
        }
        demo.criticalError = criticalError;
        function getUrl(url, noCache) {
            if (noCache === void 0) { noCache = true; }
            url = demo.settings.root + url;
            if (noCache) {
                url = demo.util.noCacheUrl(url);
            }
            return url;
        }
        demo.getUrl = getUrl;
        function extraLoadedCallback(defer) {
            defer.resolve();
        }
        demo.extraLoadedCallback = extraLoadedCallback;
        function redirect(url, replace) {
            if (replace === void 0) { replace = false; }
            if (!url) {
                criticalError();
                return;
            }
            function tryRedirect(retryCount) {
                lockUi();
                if (restPending()) {
                    if (retryCount <= 0) {
                        unlockUi();
                        return;
                    }
                    setTimeout(function () {
                        tryRedirect(retryCount - 1);
                    }, 100);
                }
                else {
                    if (replace) {
                        window.location.replace(url);
                    }
                    else {
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
        demo.redirect = redirect;
        function reloadPage(saveScrollPosition) {
            if (saveScrollPosition === void 0) { saveScrollPosition = true; }
            if (pageHost && saveScrollPosition) {
                var scrollPosition = $(document).scrollTop();
                if (scrollPosition != null) {
                    pageHost.scrollPosition = scrollPosition;
                }
            }
            onHashChange();
        }
        demo.reloadPage = reloadPage;
        function openNewTab(url) {
            if (!url) {
                return;
            }
            if (url.indexOf("://") < 0) {
                url = "http://" + url;
            }
            window.open(url, "_blank");
        }
        demo.openNewTab = openNewTab;
        function uniqueNumber() {
            return uniqueNumberSeed++;
        }
        demo.uniqueNumber = uniqueNumber;
        function internal_getPageHost() {
            return pageHost;
        }
        demo.internal_getPageHost = internal_getPageHost;
        function intToString(value, defaultString, paddedLength) {
            if (defaultString === void 0) { defaultString = ""; }
            if (paddedLength === void 0) { paddedLength = 0; }
            if ((value == null) || isNaN(value) || !isFinite(value)) {
                return defaultString;
            }
            var result = value.toString();
            if (paddedLength > 0) {
                result = demo.util.leftPad(result, paddedLength, "0");
            }
            return result;
        }
        demo.intToString = intToString;
        function intFromStringStrict(value) {
            var val = intFromString(value);
            if (val == null) {
                return null;
            }
            if (value === intToString(val)) {
                return val;
            }
            else {
                return null;
            }
        }
        demo.intFromStringStrict = intFromStringStrict;
        function intFromString(value, defaultNumberEmptyString, defaultNumberUndefinedString, defaultNumberInvalidFormatString) {
            if (defaultNumberEmptyString === void 0) { defaultNumberEmptyString = null; }
            if (defaultNumberUndefinedString === void 0) { defaultNumberUndefinedString = null; }
            if (defaultNumberInvalidFormatString === void 0) { defaultNumberInvalidFormatString = null; }
            if (value == null) {
                return defaultNumberUndefinedString;
            }
            if (value.length == 0) {
                return defaultNumberEmptyString;
            }
            var parsed = parseInt(value, 10);
            if (isNaN(parsed) || !isFinite(parsed)) {
                return defaultNumberInvalidFormatString;
            }
            return parsed;
        }
        demo.intFromString = intFromString;
        function b64EncodeUnicode(str) {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (_match, p1) {
                var hexString = "0x" + p1;
                return String.fromCharCode(parseInt(hexString, 16));
            }));
        }
        demo.b64EncodeUnicode = b64EncodeUnicode;
        function b64DecodeUnicode(str) {
            return decodeURIComponent(Array.prototype.map.call(atob(str), function (c) {
                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(""));
        }
        demo.b64DecodeUnicode = b64DecodeUnicode;
    })(demo = ro.demo || (ro.demo = {}));
})(ro || (ro = {}));
var ro;
(function (ro) {
    var demo;
    (function (demo) {
        var FirstPage = /** @class */ (function (_super) {
            __extends(FirstPage, _super);
            function FirstPage() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            // private searchRest: RestFunction<SearchParams, SearchResult> = defineRest("first/search");
            // private searchTextInput: SearchInput | null = null;
            // constructor(props: PageProps<FirstPageParam, FirstPageResult>) {
            //     super(props);
            // }
            //     // daca nu lucrezi cu ce primesti initial de pe server, adaugi in state ca
            //     // sa apara ca rezultat 
            // }
            FirstPage.prototype.render = function () {
                // let errors: JSX.Element | undefined;
                // let protestsElement: JSX.Element[] = [];
                // let addProtestError: JSX.Element | undefined;
                // if (this.state.hasErrors) {
                //     errors = <div> No search result! </div>;
                // } else {
                //     errors = <div></div>;
                // }
                // if (this.state.isLoggedIn) {
                //     addProtestError = <div />
                // } else {
                //     addProtestError = <div> You must be logged in to add a protest </div>
                // }
                // let thStyle: React.CSSProperties = { textAlign: "left", borderBottom: "2px solid " + mainColor, padding: "5px", color: "#596a0a", background: "#f0fac4" };
                // let tdStyle: React.CSSProperties = { textAlign: "left", borderBottom: "1px solid #eee", padding: "5px" };
                // for (let protest of this.state.protests) {
                //     protestsElement.push(
                //         <tr>
                //             <td style={tdStyle}> {protest.title} </td>
                //             <td style={tdStyle}> {protest.city} </td>
                //             <td style={tdStyle}> {protest.dateStart} </td>
                //             <td style={tdStyle}> {protest.timeStart} </td>
                //             <td style={tdStyle}> {protest.dateEnd} </td>
                //             <td style={tdStyle}> {protest.timeEnd} </td>
                //             <td style={tdStyle}> {protest.interested} </td>
                //             <td style={tdStyle}> {protest.participating} </td>
                //             <td style={tdStyle}> <Button label="show" onClick={() => this.onClickShowProtest(protest.protestId)}> Edit Protest </Button> </td>
                //         </tr>
                //     );
                // }
                return (React.createElement("div", null,
                    React.createElement("h1", null,
                        "Aici este ",
                        this.props.result.somestring))
                // <div>
                //     <Header />
                //     <div style={contentStyle}>
                //         {/* <button onClick={() => this.onClickAddProtest()}> Add protest </button> */}
                //         <div style={{
                //             borderRadius: "5px", display: "inline-block",
                //             border: "1px solid " + mainColor, padding: "10px", fontSize: "20px",
                //             margin: "30px 0", cursor: "pointer",
                //             backgroundColor: "#f0fac4", color: "#596a0a"
                //         }} onClick={() => this.onClickAddProtest()}>
                //             + Add protest
                //         </div>
                //         {addProtestError}
                //         <hr />
                //         <table>
                //             <tr>
                //                 <td style={{ verticalAlign: "middle", padding: "10px 0px" }}>
                //                     <SearchInput ref={(t) => this.searchTextInput = t}
                //                         onEnterKey={() => this.onClickSearch()} /></td>
                //                 <td style={{ verticalAlign: "middle", padding: "10px" }}>
                //                     <a style={{
                //                         borderRadius: "5px", display: "inline-block",
                //                         border: "1px solid " + mainColor, padding: "5px", fontSize: "15px",
                //                         cursor: "pointer",
                //                         backgroundColor: mainColor, color: "#f0fac4"
                //                     }}
                //                         onClick={(ev) => { ev.stopPropagation(); ev.preventDefault(); this.onClickSearch(); }}> Search </a>
                //                 </td>
                //             </tr>
                //         </table>
                //         {/* <button onClick={() => this.onClickSearch()}> Search </button> */}
                //         {/* <a style={{ display: "inline" }} href="#" onClick={(ev) => { ev.stopPropagation(); ev.preventDefault(); this.onClickSearch(); }}> Search </a> */}
                //         {errors}
                //         <hr />
                //         <br />
                //         <table>
                //             <tr>
                //                 <th style={thStyle}> Title </th>
                //                 <th style={thStyle}> City </th>
                //                 <th style={thStyle}> Start Date </th>
                //                 <th style={thStyle}> Start Time </th>
                //                 <th style={thStyle}> End Date </th>
                //                 <th style={thStyle}> End Time </th>
                //                 <th style={thStyle}> Interested </th>
                //                 <th style={thStyle}> Participating </th>
                //                 <th style={thStyle}>  </th>
                //             </tr>
                //             {protestsElement}
                //         </table>
                //     </div>
                // </div>
                );
            };
            FirstPage = __decorate([
                demo.page("first", "first/load")
            ], FirstPage);
            return FirstPage;
        }(React.Component));
        demo.FirstPage = FirstPage;
    })(demo = ro.demo || (ro.demo = {}));
})(ro || (ro = {}));
var ro;
(function (ro) {
    var demo;
    (function (demo) {
        var PageHost = /** @class */ (function (_super) {
            __extends(PageHost, _super);
            function PageHost(props) {
                var _this = _super.call(this, props) || this;
                _this.basePageKey = 1;
                _this.scrollPosition = null;
                _this.measuringTimer = null;
                _this.addMeasurableTimer = null;
                _this.lastBodyClientWidth = 0;
                _this.lastWindowInnerWidth = 0;
                _this.consecutiveResizeCount = 0;
                _this.periodicCheckInterval = null;
                _this.measurables = [];
                _this.windowResizeHandler = function () {
                    if (_this.state.isMeasuring && _this.measuringTimer != null) {
                        clearTimeout(_this.measuringTimer);
                        _this.startMeasureTimeout();
                        return;
                    }
                    _this.setState({ isMeasuring: true }, function () {
                        _this.startMeasureTimeout();
                    });
                };
                _this.state = {
                    pages: [],
                    isMeasuring: false
                };
                _this.periodicCheckInterval = setInterval(function () { return _this.periodicCheckSize(); }, 200);
                return _this;
            }
            PageHost.prototype.render = function () {
                var pages = [];
                for (var i = 0; i < this.state.pages.length; i++) {
                    var page_1 = this.state.pages[i];
                    var PageType = page_1.pageType; // tslint:disable-line:variable-name
                    var pageStyle = {};
                    if (i < this.state.pages.length - 1) {
                        pageStyle = { display: "none" };
                    }
                    // pageStyle.maxWidth = "768px";
                    // pageStyle.margin = "0 auto";
                    if (PageType != null) {
                        pages.push(React.createElement("div", { key: page_1.pageKey, className: "page", style: pageStyle },
                            React.createElement(PageType, __assign({}, { params: page_1.pageParams || {}, result: page_1.pageResult }))));
                    }
                }
                return (React.createElement("div", { className: "page-host" }, pages));
            };
            PageHost.prototype.startMeasureTimeout = function () {
                var _this = this;
                this.measuringTimer = setTimeout(function () {
                    _this.measuringTimer = null;
                    for (var _i = 0, _a = _this.measurables; _i < _a.length; _i++) {
                        var measurable = _a[_i];
                        if (measurable != null) {
                            measurable.measureWidth();
                        }
                    }
                    _this.setState({ isMeasuring: false });
                }, 100);
            };
            PageHost.prototype.componentDidMount = function () {
                var _this = this;
                window.addEventListener("scroll", function () {
                    _this.handleScroll();
                }, false);
                this.windowResizeHandler();
                window.addEventListener("resize", this.windowResizeHandler);
            };
            PageHost.prototype.componentWillUnmount = function () {
                var _this = this;
                if (this.periodicCheckInterval != null) {
                    clearInterval(this.periodicCheckInterval);
                }
                window.removeEventListener("scroll", function () {
                    _this.handleScroll();
                }, false);
                window.removeEventListener("resize", this.windowResizeHandler);
            };
            PageHost.prototype.handleScroll = function () {
                this.scrollPosition = $(document).scrollTop();
                if (this.state.pages != null && this.state.pages.length > 0 && this.state.pages[this.state.pages.length - 1].scrollPosition != null) {
                    this.state.pages[this.state.pages.length - 1].scrollPosition = $(document).scrollTop();
                }
            };
            PageHost.prototype.componentDidUpdate = function () {
                if (this.scrollPosition !== null) {
                    $(document).scrollTop(this.scrollPosition);
                    this.scrollPosition = null;
                }
                if (this.state.pages != null && this.state.pages.length > 0) {
                    $(document).scrollTop(this.state.pages[this.state.pages.length - 1].scrollPosition);
                }
            };
            PageHost.prototype.setPage = function (pageType, pageName, pageParams, pageResult) {
                if (this.scrollPosition === null) {
                    this.scrollPosition = 0;
                }
                this.setState({
                    pages: [{
                            pageKey: this.basePageKey++, pageType: pageType, pageName: pageName,
                            pageParams: pageParams, pageResult: pageResult, scrollPosition: 0
                        }]
                });
            };
            PageHost.prototype.pushPage = function (pageType, pageName, pageParams, pageResult) {
                if (this.scrollPosition === null) {
                    this.scrollPosition = 0;
                }
                var newPages = [];
                if (this.state.pages != null) {
                    newPages = this.state.pages.concat([{
                            pageKey: this.basePageKey++, pageType: pageType, pageName: pageName,
                            pageParams: pageParams, pageResult: pageResult, scrollPosition: 0
                        }]);
                }
                this.setState({ pages: newPages });
            };
            PageHost.prototype.popPage = function () {
                var newPages = [];
                if (this.state.pages != null) {
                    newPages = this.state.pages.slice(0, this.state.pages.length - 1);
                }
                this.setState({ pages: newPages });
            };
            PageHost.prototype.getPages = function () {
                if (this.state.pages) {
                    return this.state.pages;
                }
                return [];
            };
            PageHost.prototype.setLocked = function (locked) {
                this.setState({ isLocked: locked });
            };
            PageHost.prototype.measurableAdded = function () {
                var _this = this;
                if (this.addMeasurableTimer != null) {
                    clearTimeout(this.addMeasurableTimer);
                }
                this.addMeasurableTimer = setTimeout(function () {
                    _this.windowResizeHandler();
                }, 1000);
            };
            PageHost.prototype.periodicCheckSize = function () {
                var bodyClientWidth = document.body.clientWidth;
                var windowInnerWidth = window.innerWidth;
                if (windowInnerWidth == this.lastWindowInnerWidth) {
                    if (bodyClientWidth == this.lastBodyClientWidth) {
                        this.consecutiveResizeCount = 0;
                        return;
                    }
                    else {
                        if (this.consecutiveResizeCount < 3) {
                            this.consecutiveResizeCount++;
                            this.lastBodyClientWidth = bodyClientWidth;
                            this.lastWindowInnerWidth = windowInnerWidth;
                            this.windowResizeHandler();
                        }
                        else {
                            this.lastBodyClientWidth = bodyClientWidth;
                            this.lastWindowInnerWidth = windowInnerWidth;
                        }
                    }
                }
                else {
                    this.consecutiveResizeCount = 0;
                    this.lastBodyClientWidth = bodyClientWidth;
                    this.lastWindowInnerWidth = windowInnerWidth;
                    this.windowResizeHandler();
                }
            };
            return PageHost;
        }(React.Component));
        demo.PageHost = PageHost;
    })(demo = ro.demo || (ro.demo = {}));
})(ro || (ro = {}));
var ro;
(function (ro) {
    var demo;
    (function (demo) {
        var Button = /** @class */ (function (_super) {
            __extends(Button, _super);
            function Button(props) {
                return _super.call(this, props) || this;
            }
            Button.prototype.onClick = function () {
                if (this.props.onClick != null) {
                    this.props.onClick();
                }
            };
            Button.prototype.render = function () {
                var _this = this;
                return (React.createElement("div", { style: {
                        borderRadius: "5px", display: "inline-block",
                        border: "1px solid " + demo.mainColor, padding: "5px", fontSize: "15px",
                        cursor: "pointer",
                        backgroundColor: demo.mainColor, color: "#f0fac4"
                    }, onClick: function () { _this.onClick(); } },
                    " ",
                    this.props.label,
                    " "));
            };
            return Button;
        }(React.Component));
        demo.Button = Button;
    })(demo = ro.demo || (ro.demo = {}));
})(ro || (ro = {}));
var ro;
(function (ro) {
    var demo;
    (function (demo) {
        var CurrentLocation = /** @class */ (function (_super) {
            __extends(CurrentLocation, _super);
            function CurrentLocation() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            return CurrentLocation;
        }(React.Component));
        demo.CurrentLocation = CurrentLocation;
    })(demo = ro.demo || (ro.demo = {}));
})(ro || (ro = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdHMvdXRpbC50cyIsIi4uLy4uLy4uL3RzL21vZGVsL3Byb3Rlc3QudHMiLCIuLi8uLi8uLi90cy9iYXNlLnRzeCIsIi4uLy4uLy4uL3RzL2ZpcnN0LXBhZ2UudHN4IiwiLi4vLi4vLi4vdHMvcGFnZS1ob3N0LnRzeCIsIi4uLy4uLy4uL3RzL21vZGVsL2J1dHRvbi50c3giLCIuLi8uLi8uLi90cy9tb2RlbC9sb2NhdGlvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLElBQVUsRUFBRSxDQTZjWDtBQTdjRCxXQUFVLEVBQUU7SUFBQyxJQUFBLElBQUksQ0E2Y2hCO0lBN2NZLFdBQUEsSUFBSTtRQUFDLElBQUEsSUFBSSxDQTZjckI7UUE3Y2lCLFdBQUEsSUFBSTtZQUVsQixJQUFNLFlBQVksR0FBVyxpQ0FBaUMsQ0FBQztZQUMvRCxJQUFNLGdCQUFnQixHQUFXLDBEQUEwRCxDQUFDO1lBRTVGLFNBQWdCLHVCQUF1QixDQUFDLElBQVksRUFBRSxHQUFXO2dCQUM3RCxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDNUQsSUFBSSxNQUFNLEdBQUcsUUFBUSxHQUFHLElBQUksR0FBRyxXQUFXLENBQUM7Z0JBQzNDLElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixJQUFJLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUNWLE9BQU8sRUFBRSxDQUFDO2lCQUNiO3FCQUFNO29CQUNILE9BQU8sa0JBQWtCLENB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QUFlLGtCQUUzQixDQUFBO0lBRUwsQ0FBQyxFQU5ZLElBQUksR0FBSixPQUFJLEtBQUosT0FBSSxRQU1oQjtBQUFELENBQUMsRUFOUyxFQUFFLEtBQUYsRUFBRSxRQU1YIiwic291cmNlc0NvbnRlbnQiOlsibmFtZXNwYWNlIHJvLmRlbW8udXRpbCB7XHJcblxyXG4gICAgY29uc3QgaXNvRGF0ZVJlZ2V4OiBSZWdFeHAgPSAvXlxccyooXFxkezR9KS0oXFxkezJ9KS0oXFxkezJ9KVxccyokLztcclxuICAgIGNvbnN0IGlzb0RhdGVUaW1lUmVnZXg6IFJlZ0V4cCA9IC9eXFxzKihcXGR7NH0pLShcXGR7Mn0pLShcXGR7Mn0pXFxzKFxcZHsyfSk6KFxcZHsyfSk6KFxcZHsyfSlcXHMqJC87XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFF1ZXJ5U3RyaW5nUGFyYW1ldGVyKG5hbWU6IHN0cmluZywgdXJpOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIG5hbWUgPSBuYW1lLnJlcGxhY2UoL1tcXFtdLywgXCJcXFxcXFxbXCIpLnJlcGxhY2UoL1tcXF1dLywgXCJcXFxcXFxdXCIpO1xyXG4gICAgICAgIGxldCByZWdleFMgPSBcIltcXFxcPyZdXCIgKyBuYW1lICsgXCI9KFteJiNdKilcIjtcclxuICAgICAgICBsZXQgcmVnZXggPSBuZXcgUmVnRXhwKHJlZ2V4Uyk7XHJcbiAgICAgICAgbGV0IHJlc3VsdHMgPSByZWdleC5leGVjKHVyaSB8fCB3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcclxuICAgICAgICBpZiAoIXJlc3VsdHMpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRlY29kZVVSSUNvbXBvbmVudChyZXN1bHRzWzFdLnJlcGxhY2UoL1xcKy9nLCBcIiBcIikpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdXBkYXRlUXVlcnlTdHJpbmdQYXJhbWV0ZXIodXJpOiBzdHJpbmcsIGtleTogc3RyaW5nLCB2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgcmUgPSBuZXcgUmVnRXhwKFwiKFs/fCZdKVwiICsga2V5ICsgXCI9Lio/KCZ8JClcIiwgXCJpXCIpO1xyXG4gICAgICAgIGxldCBzZXBhcmF0b3IgPSB1cmkuaW5kZXhPZihcIj9cIikgIT09IC0xID8gXCImXCIgOiBcIj9cIjtcclxuICAgICAgICBpZiAodXJpLm1hdGNoKHJlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXJpLnJlcGxhY2UocmUsIFwiJDFcIiArIGtleSArIFwiPVwiICsgdmFsdWUgKyBcIiQyXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiB1cmkgKyBzZXBhcmF0b3IgKyBrZXkgKyBcIj1cIiArIHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gbm9DYWNoZVVybCh1cmw6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKGdldFF1ZXJ5U3RyaW5nUGFyYW1ldGVyKFwidHNcIiwgdXJsKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVwZGF0ZVF1ZXJ5U3RyaW5nUGFyYW1ldGVyKHVybCwgXCJ0c1wiLCBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdXJsQ29tYmluZShyb290OiBzdHJpbmcsIC4uLnBhdGhzOiBzdHJpbmdbXSk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHJlc3VsdCA9IHJvb3QgKyBcIi9cIiArIHBhdGhzLmpvaW4oXCIvXCIpO1xyXG4gICAgICAgIHJlc3VsdCA9IHJlc3VsdC5yZXBsYWNlKC8oW146XFxzXSlcXC8rL2csIFwiJDEvXCIpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFF1ZXJ5U3RyaW5nT2JqZWN0KHVyaTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBTdHJpbmdLZXlNYXA8c3RyaW5nPiA9IHt9O1xyXG4gICAgICAgIHVyaSA9IHVyaSB8fCB3aW5kb3cubG9jYXRpb24uaHJlZjtcclxuICAgICAgICB1cmkgPSB1cmkuc3BsaXQoXCI/XCIpLnNsaWNlKDEpLmpvaW4oXCI/XCIpO1xyXG5cclxuICAgICAgICB1cmkucmVwbGFjZShuZXcgUmVnRXhwKFwiKFtePz0mXSspKD0oW14mI10qKSk/XCIsIFwiZ1wiKSxcclxuICAgICAgICAgICAgZnVuY3Rpb24gKF8kMDogYW55LCAkMTogYW55LCBfJDI6IGFueSwgJDM6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJDEgJiYgJDMpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHRbZGVjb2RlVVJJQ29tcG9uZW50KCQxKV0gPSBkZWNvZGVVUklDb21wb25lbnQoJDMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBjbGFzcyBEYXRlVGltZSB7XHJcbiAgICAgICAgeWVhcjogbnVtYmVyO1xyXG4gICAgICAgIG1vbnRoOiBudW1iZXI7XHJcbiAgICAgICAgZGF5OiBudW1iZXI7XHJcbiAgICAgICAgaG91cjogbnVtYmVyO1xyXG4gICAgICAgIG1pbnV0ZTogbnVtYmVyO1xyXG4gICAgICAgIHNlY29uZDogbnVtYmVyO1xyXG5cclxuICAgICAgICBjb25zdHJ1Y3Rvcih5ZWFyOiBudW1iZXIsIG1vbnRoOiBudW1iZXIsIGRheTogbnVtYmVyLCBob3VyOiBudW1iZXIgPSAwLCBtaW51dGU6IG51bWJlciA9IDAsIHNlY29uZDogbnVtYmVyID0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnllYXIgPSB5ZWFyO1xyXG4gICAgICAgICAgICB0aGlzLm1vbnRoID0gbW9udGg7XHJcbiAgICAgICAgICAgIHRoaXMuZGF5ID0gZGF5O1xyXG4gICAgICAgICAgICB0aGlzLmhvdXIgPSBob3VyO1xyXG4gICAgICAgICAgICB0aGlzLm1pbnV0ZSA9IG1pbnV0ZTtcclxuICAgICAgICAgICAgdGhpcy5zZWNvbmQgPSBzZWNvbmQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGF0aWMgcGFyc2VJc28oaW5wdXQ6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBEYXRlVGltZSB8IG51bGwge1xyXG4gICAgICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG1hdGNoID0gaXNvRGF0ZVJlZ2V4LmV4ZWMoaW5wdXQpO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIGxldCB5ZWFyID0gaW50RnJvbVN0cmluZyhtYXRjaFsxXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9udGggPSBpbnRGcm9tU3RyaW5nKG1hdGNoWzJdKTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXkgPSBpbnRGcm9tU3RyaW5nKG1hdGNoWzNdKTtcclxuICAgICAgICAgICAgICAgIGlmICh5ZWFyICYmIG1vbnRoICYmIGRheSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCByZXN1bHQgPSBuZXcgRGF0ZVRpbWUoeWVhciwgbW9udGgsIGRheSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5pc1ZhbGlkKCkgPyByZXN1bHQgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWF0Y2ggPSBpc29EYXRlVGltZVJlZ2V4LmV4ZWMoaW5wdXQpO1xyXG4gICAgICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgIGxldCB5ZWFyID0gaW50RnJvbVN0cmluZyhtYXRjaFsxXSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbW9udGggPSBpbnRGcm9tU3RyaW5nKG1hdGNoWzJdKTtcclxuICAgICAgICAgICAgICAgIGxldCBkYXkgPSBpbnRGcm9tU3RyaW5nKG1hdGNoWzNdKTtcclxuICAgICAgICAgICAgICAgIGxldCBob3VyID0gaW50RnJvbVN0cmluZyhtYXRjaFs0XSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWludXRlID0gaW50RnJvbVN0cmluZyhtYXRjaFs1XSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc2Vjb25kID0gaW50RnJvbVN0cmluZyhtYXRjaFs2XSk7XHJcbiAgICAgICAgICAgICAgICBpZiAoeWVhciAmJiBtb250aCAmJiBkYXkgJiYgaG91ciAhPSBudWxsICYmIG1pbnV0ZSAhPSBudWxsICYmIHNlY29uZCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlc3VsdCA9IG5ldyBEYXRlVGltZSh5ZWFyLCBtb250aCwgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdC5pc1ZhbGlkKCkgPyByZXN1bHQgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgc3RhdGljIG5vdygpOiBEYXRlVGltZSB7XHJcbiAgICAgICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IERhdGVUaW1lKG5vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSArIDEsIG5vdy5nZXREYXRlKCksIG5vdy5nZXRIb3VycygpLCBub3cuZ2V0TWludXRlcygpLCBub3cuZ2V0U2Vjb25kcygpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN0YXRpYyBjb21wYXJlRGF0ZXMoZGF0ZTE6IERhdGVUaW1lLCBkYXRlMjogRGF0ZVRpbWUpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBsZXQgZmlyc3REYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcclxuICAgICAgICAgICAgZmlyc3REYXRlLnNldEZ1bGxZZWFyKGRhdGUxLnllYXIpO1xyXG4gICAgICAgICAgICBmaXJzdERhdGUuc2V0TW9udGgoZGF0ZTEubW9udGgpO1xyXG4gICAgICAgICAgICBmaXJzdERhdGUuc2V0RGF0ZShkYXRlMS5kYXkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHNlY29uZERhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBzZWNvbmREYXRlLnNldEZ1bGxZZWFyKGRhdGUyLnllYXIpO1xyXG4gICAgICAgICAgICBzZWNvbmREYXRlLnNldE1vbnRoKGRhdGUyLm1vbnRoKTtcclxuICAgICAgICAgICAgc2Vjb25kRGF0ZS5zZXREYXRlKGRhdGUyLmRheSk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmlyc3REYXRlID4gc2Vjb25kRGF0ZSA/IDEgOiAoZmlyc3REYXRlLmdldFRpbWUoKSA9PT0gc2Vjb25kRGF0ZS5nZXRUaW1lKCkgPyAwIDogLTEpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9Jc29EYXRlU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRUb1N0cmluZyh0aGlzLnllYXIsIFwiMDAwMFwiLCA0KSArIFwiLVwiICtcclxuICAgICAgICAgICAgICAgIGludFRvU3RyaW5nKHRoaXMubW9udGgsIFwiMDBcIiwgMikgKyBcIi1cIiArXHJcbiAgICAgICAgICAgICAgICBpbnRUb1N0cmluZyh0aGlzLmRheSwgXCIwMFwiLCAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvSXNvRGF0ZVRpbWVTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9Jc29EYXRlU3RyaW5nKCkgKyBcIiBcIiArXHJcbiAgICAgICAgICAgICAgICBpbnRUb1N0cmluZyh0aGlzLmhvdXIsIFwiMDBcIiwgMikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgICAgICBpbnRUb1N0cmluZyh0aGlzLm1pbnV0ZSwgXCIwMFwiLCAyKSArIFwiOlwiICtcclxuICAgICAgICAgICAgICAgIGludFRvU3RyaW5nKHRoaXMuc2Vjb25kLCBcIjAwXCIsIDIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdG9DbGllbnREYXRlU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgICAgIHJldHVybiBpbnRUb1N0cmluZyh0aGlzLmRheSwgXCIwMFwiLCAyKSArIFwiLVwiICtcclxuICAgICAgICAgICAgICAgIGludFRvU3RyaW5nKHRoaXMubW9udGgsIFwiMDBcIiwgMikgKyBcIi1cIiArXHJcbiAgICAgICAgICAgICAgICBpbnRUb1N0cmluZyh0aGlzLnllYXIsIFwiMDAwMFwiLCA0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRvQ2xpZW50RGF0ZVRpbWVTdHJpbmcoKTogc3RyaW5nIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9DbGllbnREYXRlU3RyaW5nKCkgKyBcIiBcIiArXHJcbiAgICAgICAgICAgICAgICBpbnRUb1N0cmluZyh0aGlzLmhvdXIsIFwiMDBcIiwgMikgKyBcIjpcIiArXHJcbiAgICAgICAgICAgICAgICBpbnRUb1N0cmluZyh0aGlzLm1pbnV0ZSwgXCIwMFwiLCAyKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb25lKCk6IERhdGVUaW1lIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlVGltZSh0aGlzLnllYXIsIHRoaXMubW9udGgsIHRoaXMuZGF5LFxyXG4gICAgICAgICAgICAgICAgdGhpcy5ob3VyLCB0aGlzLm1pbnV0ZSwgdGhpcy5zZWNvbmQpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZml0RGF5SW5Nb250aCgpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuZGF5IDw9IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGF5ID0gMTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbGV0IGRheXNJbk1vbnRoID0gdGhpcy5nZXREYXlzSW5Nb250aCgpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5kYXkgPiBkYXlzSW5Nb250aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kYXkgPSBkYXlzSW5Nb250aDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZ2V0RGF5c0luTW9udGgoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGgsIDApLmdldERhdGUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGFkZE1vbnRocyhtb250aHM6IG51bWJlcikge1xyXG4gICAgICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKHRoaXMueWVhciwgdGhpcy5tb250aCAtIDEgKyBtb250aHMsIDEpO1xyXG4gICAgICAgICAgICB0aGlzLnllYXIgPSBkYXRlLmdldEZ1bGxZZWFyKCk7XHJcbiAgICAgICAgICAgIHRoaXMubW9udGggPSBkYXRlLmdldE1vbnRoKCkgKyAxO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaXNWYWxpZCgpOiBib29sZWFuIHtcclxuICAgICAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZSh0aGlzLnllYXIsIHRoaXMubW9udGggLSAxLCB0aGlzLmRheSwgdGhpcy5ob3VyIHx8IDAsIHRoaXMubWludXRlIHx8IDAsIHRoaXMuc2Vjb25kIHx8IDApO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0ZS5nZXRGdWxsWWVhcigpID09IHRoaXMueWVhciAmJiBkYXRlLmdldE1vbnRoKCkgPT0gdGhpcy5tb250aCAtIDEgJiYgZGF0ZS5nZXREYXRlKCkgPT0gdGhpcy5kYXkgJiZcclxuICAgICAgICAgICAgICAgIGRhdGUuZ2V0SG91cnMoKSA9PSB0aGlzLmhvdXIgJiYgZGF0ZS5nZXRNaW51dGVzKCkgPT0gdGhpcy5taW51dGUgJiYgZGF0ZS5nZXRTZWNvbmRzKCkgPT0gdGhpcy5zZWNvbmQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZGF0ZVRvSXNvKGlucHV0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIC8vIGRkLW1tLXl5eXkgLT4geXl5eS1tbS1kZFxyXG4gICAgICAgIGxldCByZWdleCA9IC9eXFxzKihcXGR7Mn0pLShcXGR7Mn0pLShcXGR7NH0pXFxzKiQvO1xyXG4gICAgICAgIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMoaW5wdXQpO1xyXG4gICAgICAgIGlmICghbWF0Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWF0Y2hbM10gKyBcIi1cIiArIG1hdGNoWzJdICsgXCItXCIgKyBtYXRjaFsxXTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRhdGVGcm9tSXNvKGlucHV0OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1hdGNoID0gaXNvRGF0ZVJlZ2V4LmV4ZWMoaW5wdXQpO1xyXG4gICAgICAgIGlmICghbWF0Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWF0Y2hbM10gKyBcIi1cIiArIG1hdGNoWzJdICsgXCItXCIgKyBtYXRjaFsxXTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZGF0ZVRpbWVUb0lzbyhpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICAvLyBkZC1tbS15eXl5IGhoOm1tIC0+IHl5eXktbW0tZGQgaGg6bW06c3NcclxuICAgICAgICBsZXQgcmVnZXggPSAvXlxccyooXFxkezJ9KS0oXFxkezJ9KS0oXFxkezR9KVxccyhcXGR7Mn0pOihcXGR7Mn0pXFxzKiQvO1xyXG4gICAgICAgIGxldCBtYXRjaCA9IHJlZ2V4LmV4ZWMoaW5wdXQpO1xyXG4gICAgICAgIGlmICghbWF0Y2gpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gbWF0Y2hbM10gKyBcIi1cIiArIG1hdGNoWzJdICsgXCItXCIgKyBtYXRjaFsxXSArIFwiIFwiICsgbWF0Y2hbNF0gKyBcIjpcIiArIG1hdGNoWzVdICsgXCI6MDBcIjtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZGF0ZVRpbWVGcm9tSXNvKGlucHV0OiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoaW5wdXQgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IG1hdGNoID0gaXNvRGF0ZVRpbWVSZWdleC5leGVjKGlucHV0KTtcclxuICAgICAgICBpZiAoIW1hdGNoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIG1hdGNoWzNdICsgXCItXCIgKyBtYXRjaFsyXSArIFwiLVwiICsgbWF0Y2hbMV0gKyBcIiBcIiArIG1hdGNoWzRdICsgXCI6XCIgKyBtYXRjaFs1XTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRCYWNrZ3JvdW5kSW1hZ2VVcmwoZWxlbWVudDogSlF1ZXJ5KTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgdXJsID0gZWxlbWVudC5jc3MoXCJiYWNrZ3JvdW5kLWltYWdlXCIpO1xyXG4gICAgICAgIGxldCBtYXRjaGVzID0gL151cmxcXCgoW1wiXCJdPykoLiopXFwxXFwpJC8uZXhlYyh1cmwpO1xyXG4gICAgICAgIHJldHVybiBtYXRjaGVzID8gbWF0Y2hlc1syXSA6IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICBcclxuXHJcbiAgIFxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldExlc3NEYXRhKGxlc3NDbGFzczogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQgbGVzc0VsZW1lbnQgPSAkKFwiLlwiICsgbGVzc0NsYXNzKTtcclxuICAgICAgICBpZiAobGVzc0VsZW1lbnQubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgJChcImJvZHlcIikuYXBwZW5kKCQoXCI8ZGl2PlwiKS5hZGRDbGFzcyhsZXNzQ2xhc3MpLmFkZENsYXNzKFwiZGlzcGxheU5vbmVcIikpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGJhY2tncm91bmRVcmwgPSBnZXRCYWNrZ3JvdW5kSW1hZ2VVcmwobGVzc0VsZW1lbnQpO1xyXG4gICAgICAgIHJldHVybiBnZXRRdWVyeVN0cmluZ09iamVjdChiYWNrZ3JvdW5kVXJsKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldEZpbGVFeHRlbnNpb24oZmlsZW5hbWU6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChmaWxlbmFtZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgZXh0ID0gL14uK1xcLihbXi5dKykkLy5leGVjKGZpbGVuYW1lKTtcclxuICAgICAgICByZXR1cm4gIWV4dCA/IFwiXCIgOiBleHRbMV0udG9Mb3dlckNhc2UoKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gdmFsaWRGaWxlRXh0ZW5zaW9uKGxpc3Q6IHN0cmluZ1tdLCBleHRlbnNpb246IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAobGlzdFtpXSA9PSBleHRlbnNpb24pIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gcmVwbGFjZUV4dGVuc2lvbihmaWxlbmFtZTogc3RyaW5nLCBleHRlbnNpb246IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xyXG4gICAgICAgIGlmICghZmlsZW5hbWUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmlsZW5hbWUucmVwbGFjZSgvXFwuKFteLl0rKSQvLCBcIi5cIiArIGV4dGVuc2lvbik7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHZhbGlkRW1haWwoaW5wdXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghaW5wdXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIC9eKChbXjw+KClbXFxdXFxcXC4sOzpcXHNAXFxcIl0rKFxcLltePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSspKil8KFxcXCIuK1xcXCIpKUAoKFxcW1swLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcLlswLTldezEsM31cXF0pfCgoW2EtekEtWlxcLTAtOV0rXFwuKStbYS16QS1aXXsyLH0pKSQvLnRlc3QoaW5wdXQpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiB2YWxpZFVybChpbnB1dDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghaW5wdXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIC9eKGh0dHA6XFwvXFwvd3d3XFwufGh0dHBzOlxcL1xcL3d3d1xcLnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98d3d3XFwufClbYS16MC05XSsoW1xcLVxcLl17MX1bYS16MC05XSspKlxcLlthLXpdezIsNX0oOlswLTldezEsNX0pPyhcXC8uKik/JC8udGVzdChpbnB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHRydW5jYXRlKGlucHV0OiBzdHJpbmcsIG46IG51bWJlciwgdXNlV29yZEJvdW5kYXJ5OiBib29sZWFuKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIWlucHV0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHRvb0xvbmcgPSBpbnB1dC5sZW5ndGggPiBuO1xyXG4gICAgICAgIGxldCBwYXJ0ID0gdG9vTG9uZyA/IGlucHV0LnN1YnN0cigwLCBuIC0gMSkgOiBpbnB1dDtcclxuICAgICAgICBwYXJ0ID0gdXNlV29yZEJvdW5kYXJ5ICYmIHRvb0xvbmcgPyBwYXJ0LnN1YnN0cigwLCBwYXJ0Lmxhc3RJbmRleE9mKFwiIFwiKSkgOiBwYXJ0O1xyXG4gICAgICAgIHJldHVybiB0b29Mb25nID8gcGFydCArIFwiLi4uXCIgOiBwYXJ0O1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBwYXJzZU51bWJlckFycmF5KGlucHV0OiBzdHJpbmcpOiBudW1iZXJbXSB7XHJcbiAgICAgICAgaWYgKGlucHV0KSB7XHJcbiAgICAgICAgICAgIGlucHV0ID0gJC50cmltKGlucHV0KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICghaW5wdXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtdO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IGl0ZW1zID0gaW5wdXQuc3BsaXQoL1xccypbLDtdXFxzKi8pO1xyXG4gICAgICAgIGxldCByZXN1bHQ6IG51bWJlcltdID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgdmFsdWUgPSBpbnRGcm9tU3RyaW5nKGl0ZW1zW2ldKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaCh2YWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHBhcnNlU3RyaW5nQXJyYXkoaW5wdXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICAgICAgICBsZXQgcmVzdWx0OiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgICAgIGlmIChpbnB1dCkge1xyXG4gICAgICAgICAgICBsZXQgaXRlbXMgPSBpbnB1dC5zcGxpdChcIixcIik7XHJcbiAgICAgICAgICAgIGlmIChpdGVtcykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGl0ZW1zTGVuZ3RoID0gaXRlbXMubGVuZ3RoO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpdGVtc0xlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGl0ZW0gPSAkLnRyaW0oaXRlbXNbaV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtID4gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gc3RyaW5nQ2FwaXRhbGl6ZSh2YWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiB2YWx1ZS5zbGljZSgwLCAxKS50b1VwcGVyQ2FzZSgpICsgdmFsdWUuc2xpY2UoMSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGxlZnRQYWQoczogc3RyaW5nLCB3aWR0aDogbnVtYmVyLCBjaGFyOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gKHMubGVuZ3RoID49IHdpZHRoKSA/IHMgOiAobmV3IEFycmF5KHdpZHRoKS5qb2luKGNoYXIpICsgcykuc2xpY2UoLXdpZHRoKTtcclxuICAgIH1cclxuXHJcbiAgXHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG1tVG9QaXhlbHModmFsdWU6IG51bWJlcik6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSB8fCBpc05hTih2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZCgzLjc4ICogdmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXREZXZpY2VQaXhlbFJhdGlvKCk6IG51bWJlciB7XHJcbiAgICAgICAgaWYgKHdpbmRvd1tcImRldmljZVBpeGVsUmF0aW9cIl0pIHsgICAvLyB0c2xpbnQ6ZGlzYWJsZS1saW5lOm5vLXN0cmluZy1saXRlcmFsXHJcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMS4wO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0U21vb3RoRGV2aWNlUGl4ZWxSYXRpbygpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh3aW5kb3dbXCJkZXZpY2VQaXhlbFJhdGlvXCJdKSB7ICAgLy8gdHNsaW50OmRpc2FibGUtbGluZTpuby1zdHJpbmctbGl0ZXJhbFxyXG4gICAgICAgICAgICBpZiAod2luZG93LmRldmljZVBpeGVsUmF0aW8gPj0gMSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguY2VpbCh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gd2luZG93LmRldmljZVBpeGVsUmF0aW87XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gMS4wO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGZpcnN0RGVmaW5lZDxUPiguLi5hcmdzOiBUW10pOiBUIHwgbnVsbCB7XHJcbiAgICAgICAgaWYgKGFyZ3MgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChsZXQgdmFsIG9mIGFyZ3MpIHtcclxuICAgICAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjYWxsT25DbGlja1ZvaWRGdW5jdGlvbihjb21wb25lbnQ6IFJlYWN0LkNvbXBvbmVudDx7IG9uQ2xpY2s/OiBWb2lkRnVuY3Rpb24gfSwgYW55Pik6IHZvaWQge1xyXG4gICAgICAgIGlmIChjb21wb25lbnQucHJvcHMub25DbGljaykge1xyXG4gICAgICAgICAgICBjb21wb25lbnQucHJvcHMub25DbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY29weURlZmluZWRGaWVsZHModGFyZ2V0OiBhbnksIHNvdXJjZTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgZm9yIChsZXQga2V5IG9mIE9iamVjdC5rZXlzKHNvdXJjZSkpIHtcclxuICAgICAgICAgICAgaWYgKHNvdXJjZVtrZXldICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRlYm91bmNlKGZ1bmM6ICgpID0+IHZvaWQsIHdhaXQ6IG51bWJlciA9IDEwMCk6ICgpID0+IHZvaWQge1xyXG4gICAgICAgIGxldCBoOiBudW1iZXI7XHJcbiAgICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGgpO1xyXG4gICAgICAgICAgICBoID0gc2V0VGltZW91dCgoKSA9PiBmdW5jKCksIHdhaXQpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHNldENvb2tpZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBzdHJpbmcsIGV4cGlyYXRpb25EYXlzOiBudW1iZXIgPSAwKTogdm9pZCB7XHJcbiAgICAgICAgbGV0IGV4cGlyZXM6IHN0cmluZyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKGV4cGlyYXRpb25EYXlzICE9IDApIHtcclxuICAgICAgICAgICAgbGV0IGQgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgICAgICBkLnNldFRpbWUoZC5nZXRUaW1lKCkgKyAoZXhwaXJhdGlvbkRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSk7XHJcbiAgICAgICAgICAgIGV4cGlyZXMgPSBcIjtleHBpcmVzPVwiICsgZC50b1VUQ1N0cmluZygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgXCI9XCIgKyB2YWx1ZSArIGV4cGlyZXMgKyBcIjtwYXRoPS9cIjtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZ2V0Q29va2llKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHNlYXJjaE5hbWUgPSBuYW1lICsgXCI9XCI7XHJcbiAgICAgICAgbGV0IGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KFwiO1wiKTtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjID0gY2FbaV07XHJcbiAgICAgICAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PSBcIiBcIikge1xyXG4gICAgICAgICAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChjLmluZGV4T2Yoc2VhcmNoTmFtZSkgPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGMuc3Vic3RyaW5nKHNlYXJjaE5hbWUubGVuZ3RoLCBjLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZUNvb2tpZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzZXRDb29raWUobmFtZSwgXCJcIiwgLTIpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBzdHJpbmdSZXBsYWNlcih0cGw6IHN0cmluZywgYXJnczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRwbC5yZXBsYWNlKC9cXCR7KFxcdyspfS9nLCAoXywgdikgPT4gYXJnc1t2XSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFBkZlVybChmaWxlSWQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IHVybCA9IHV0aWwudXBkYXRlUXVlcnlTdHJpbmdQYXJhbWV0ZXIoXCJjb21tb24tZmlsZXMvZG93bmxvYWRcIiwgXCJmaWxlSWRcIiwgZmlsZUlkKTtcclxuICAgICAgICB1cmwgPSB1dGlsLnVwZGF0ZVF1ZXJ5U3RyaW5nUGFyYW1ldGVyKHVybCwgXCJ0c1wiLCBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpKTtcclxuICAgICAgICByZXR1cm4gdXJsO1xyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIHJvLmRlbW8ge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgUHJvdGVzdCB7XHJcbiAgICAgICAgcHJvdGVzdElkOiBudW1iZXI7XHJcbiAgICAgICAgdGl0bGU6IHN0cmluZztcclxuICAgICAgICBjaXR5OiBzdHJpbmc7XHJcbiAgICAgICAgbGF0aXR1ZGU6IG51bWJlcjtcclxuICAgICAgICBsb25naXR1ZGU6IG51bWJlcjtcclxuICAgICAgICBkYXRlU3RhcnQ6IHN0cmluZztcclxuICAgICAgICB0aW1lU3RhcnQ6IHN0cmluZztcclxuICAgICAgICBkYXRlRW5kOiBzdHJpbmc7XHJcbiAgICAgICAgdGltZUVuZDogc3RyaW5nO1xyXG4gICAgICAgIGludGVyZXN0ZWQ6IG51bWJlcjtcclxuICAgICAgICBwYXJ0aWNpcGF0aW5nOiBudW1iZXI7XHJcbiAgICAgICAgdXNlcklkOiBudW1iZXI7XHJcbiAgICB9XHJcbn0iLCJcclxuLy8vIDxyZWZlcmVuY2UgcGF0aD1cIkB0eXBlcy9qcXVlcnkvaW5kZXguZC50c1wiIC8+XHJcbi8vLyA8cmVmZXJlbmNlIHBhdGg9XCJAdHlwZXMvcmVhY3QvaW5kZXguZC50c1wiIC8+XHJcbi8vIC8gPHJlZmVyZW5jZSBwYXRoPVwiQHR5cGVzL3JlYWN0LWdvb2dsZS1tYXBzL2luZGV4LmQudHNcIiAvPlxyXG4vLy8vLyA8cmVmZXJlbmNlIHBhdGg9XCJAdHlwZXMvcmVhY3QtZG9tL2luZGV4LmQudHNcIiAvPlxyXG5cclxubmFtZXNwYWNlIHJvLmRlbW8ge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgUGFnZVByb3BzPFAsIFI+IHtcclxuICAgICAgICBwYXJhbXM6IFA7XHJcbiAgICAgICAgcmVzdWx0OiBSO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgVmFsdWVMYWJlbE1vZGVsIHtcclxuICAgICAgICB2YWx1ZTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZDtcclxuICAgICAgICBsYWJlbDogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCB0eXBlIFN0cmluZ0tleU1hcDxUPiA9IHsgW2tleTogc3RyaW5nXTogVCB9O1xyXG4gICAgZXhwb3J0IHR5cGUgTnVtYmVyS2V5TWFwPFQ+ID0geyBba2V5OiBudW1iZXJdOiBUIH07XHJcblxyXG4gICAgZXhwb3J0IHR5cGUgVm9pZEZ1bmN0aW9uID0gKCkgPT4gdm9pZDtcclxuICAgIGV4cG9ydCB0eXBlIFJlc3RGdW5jdGlvbjxQLCBSPiA9IChwYXJhbXM6IFAsIHN1Y2Nlc3M6IChyZXN1bHQ6IFIpID0+IHZvaWQsIGVycm9yPzogKHJlc3VsdD86IFIpID0+IHZvaWQpID0+IHZvaWQ7XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBNZWFzdXJhYmxlUmVhY3RDb21wb25lbnQge1xyXG4gICAgICAgIG1lYXN1cmVXaWR0aDogVm9pZEZ1bmN0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGludGVyZmFjZSBQYWdlSW5mbyB7XHJcbiAgICAgICAgY29tcG9uZW50OiB0eXBlb2YgUmVhY3QuQ29tcG9uZW50O1xyXG4gICAgICAgIGxvYWRVcmw6IHN0cmluZyB8IG51bGw7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIHN0eWxlXHJcblxyXG4gICAgZXhwb3J0IGxldCBjb250ZW50U3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7IG1heFdpZHRoOiBcIjc2OHB4XCIsIG1hcmdpbjogXCIwIGF1dG9cIiB9O1xyXG4gICAgZXhwb3J0IGxldCBtYWluQ29sb3I6IHN0cmluZyA9ICBcIiNCRURCMzlcIjsgICAgXHJcbiAgICBleHBvcnQgbGV0IGRhcmtlckNvbG9yOiBzdHJpbmcgPSAgXCIjNTk2YTBhXCI7IFxyXG4gICAgZXhwb3J0IGxldCBsaWdodGVyQ29sb3I6IHN0cmluZyA9ICBcIiNmMGZhYzRcIjsgXHJcblxyXG4gICAgLy8gZW5kIHN0eWxlXHJcblxyXG4gICAgbGV0IHBhZ2VIb3N0OiBQYWdlSG9zdCB8IHVuZGVmaW5lZDtcclxuICAgIGxldCBhbGxQYWdlczogU3RyaW5nS2V5TWFwPFBhZ2VJbmZvPiA9IHt9O1xyXG4gICAgbGV0IGFsbFBvcHVwczogKHR5cGVvZiBSZWFjdC5Db21wb25lbnQpW10gPSBbXTtcclxuICAgIGxldCB1bmlxdWVOdW1iZXJTZWVkOiBudW1iZXIgPSAxO1xyXG4gICAgZXhwb3J0IGxldCB1c2VySWQ6IG51bWJlciA9IDA7XHJcbiAgICBleHBvcnQgbGV0IHVzZXJuYW1lOiBzdHJpbmcgPSAnJztcclxuXHJcbiAgICBleHBvcnQgbGV0IHNldHRpbmdzOiBJbml0U2V0dGluZ3MgPSB7fSBhcyBhbnk7XHJcblxyXG4gICAgZXhwb3J0IGxldCBpbnNwZWN0UmVzcG9uc2VDYWxsYmFjazogRnVuY3Rpb247XHJcbiAgICBleHBvcnQgbGV0IGluaXREb25lQ2FsbGJhY2s6IFZvaWRGdW5jdGlvbjtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gcGFnZShuYW1lOiBzdHJpbmcsIGxvYWRVcmw6IHN0cmluZyB8IG51bGwsIG5lZWRzUmV0dXJuUGFnZTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChjb21wb25lbnQ6IGFueSkge1xyXG4gICAgICAgICAgICBjb21wb25lbnQubmVlZHNSZXR1cm5QYWdlID0gbmVlZHNSZXR1cm5QYWdlO1xyXG4gICAgICAgICAgICBhbGxQYWdlc1tuYW1lXSA9IHsgY29tcG9uZW50LCBsb2FkVXJsIH07XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gcG9wdXAoY29tcG9uZW50OiBhbnkpIHtcclxuICAgICAgICBhbGxQb3B1cHMucHVzaChjb21wb25lbnQpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgRm9udEZhY2Uge1xyXG4gICAgICAgIGZpbGVOYW1lOiBzdHJpbmdbXTtcclxuICAgICAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgSW5pdFNldHRpbmdzIHtcclxuICAgICAgICBkZWZhdWx0UGFnZUlkOiBzdHJpbmc7XHJcbiAgICAgICAgY3NzVXJsOiBzdHJpbmc7XHJcbiAgICAgICAgaW1nVXJsOiBzdHJpbmc7XHJcbiAgICAgICAgbWVkaWFVcmw6IHN0cmluZztcclxuICAgICAgICBkZWZhdWx0VGhlbWVJbWdVcmw6IHN0cmluZztcclxuICAgICAgICByZXR1cm5Vcmw6IHN0cmluZztcclxuICAgICAgICByZXR1cm5QYWdlczogU3RyaW5nS2V5TWFwPHN0cmluZz47XHJcbiAgICAgICAgcHJvcHM6IGFueTtcclxuICAgICAgICByb290OiBzdHJpbmc7XHJcbiAgICAgICAgYnVpbGRUaW1lc3RhbXA6IHN0cmluZztcclxuICAgICAgICB3YXJOYW1lOiBzdHJpbmc7XHJcbiAgICAgICAgZGF0YTogYW55O1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgZGVjbGFyZSB2YXIgUmVhY3RET006IGFueTtcclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaW5pdCgvKmluaXRTZXR0aW5nczogSW5pdFNldHRpbmdzKi8pIHtcclxuXHJcblxyXG4gICAgICAgIC8vc2V0dGluZ3MgPSBpbml0U2V0dGluZ3M7XHJcbiAgICAgICAgc2V0dGluZ3MuZGVmYXVsdFBhZ2VJZCA9IFwibWFpblwiO1xyXG4gICAgICAgIGlmIChzZXR0aW5ncy5yb290ID09IG51bGwpIHtcclxuICAgICAgICAgICAgLy8gc2V0dGluZ3Mucm9vdCA9IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL1wiO1xyXG4gICAgICAgICAgICBzZXR0aW5ncy5yb290ID0gXCJcIjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhZ2VIb3N0ID0gKFJlYWN0RE9NIGFzIGFueSkucmVuZGVyKDxQYWdlSG9zdCAvPiwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtYWluXCIpKSBhcyBhbnkgYXMgUGFnZUhvc3Q7XHJcblxyXG5cclxuICAgICAgICBsZXQgbG9jYXRpb24gPSB3aW5kb3cubG9jYXRpb247XHJcbiAgICAgICAgY29uc29sZS5sb2cobG9jYXRpb24pXHJcbiAgICAgICAgaWYgKGxvY2F0aW9uLmhhc2gubGVuZ3RoIDw9IDEpIHtcclxuICAgICAgICAgICAgbGV0IGhyZWYgPSBsb2NhdGlvbi5ocmVmO1xyXG4gICAgICAgICAgICBsZXQgaGFzaEluZGV4ID0gaHJlZi5pbmRleE9mKFwiI1wiKTtcclxuICAgICAgICAgICAgaWYgKGhhc2hJbmRleCA+PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBocmVmID0gaHJlZi5zdWJzdHJpbmcoMCwgaGFzaEluZGV4KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbG9jYXRpb24ucmVwbGFjZShocmVmICsgXCIjXCIgKyBzZXR0aW5ncy5kZWZhdWx0UGFnZUlkKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiaGFzaGNoYW5nZVwiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG9uSGFzaENoYW5nZSgpO1xyXG4gICAgICAgIH0sIGZhbHNlKTtcclxuXHJcblxyXG4gICAgICAgIG9uSGFzaENoYW5nZSgpO1xyXG5cclxuICAgICAgICBpZiAoaW5pdERvbmVDYWxsYmFjaykge1xyXG4gICAgICAgICAgICBpbml0RG9uZUNhbGxiYWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIG9uSGFzaENoYW5nZSgpIHtcclxuICAgICAgICBsZXQgeyBwYWdlTmFtZSwgcGFnZVBhcmFtcyB9ID0gZGVjb2RlUGFnZUhhc2goKTtcclxuICAgICAgICBpZiAoIXBhZ2VOYW1lKSB7XHJcbiAgICAgICAgICAgIHBhZ2VOYW1lID0gc2V0dGluZ3MuZGVmYXVsdFBhZ2VJZDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCBwYWdlSW5mbyA9IGFsbFBhZ2VzW3BhZ2VOYW1lXTtcclxuICAgICAgICBpZiAoIXBhZ2VJbmZvKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbnZhbGlkIHBhZ2UgXCIgKyBwYWdlTmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYWdlSW5mby5sb2FkVXJsKSB7XHJcbiAgICAgICAgICAgIGNhbGxSZXN0KHBhZ2VJbmZvLmxvYWRVcmwsIHBhZ2VQYXJhbXMsIHJlc3VsdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFnZUhvc3QpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlSG9zdC5zZXRQYWdlKHBhZ2VJbmZvLmNvbXBvbmVudCwgcGFnZU5hbWUsIHBhZ2VQYXJhbXMsIHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBpZiAocGFnZUhvc3QpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2VIb3N0LnNldFBhZ2UocGFnZUluZm8uY29tcG9uZW50LCBwYWdlTmFtZSwgcGFnZVBhcmFtcywgbnVsbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZW5jb2RlUGFnZUhhc2gocGFnZU5hbWU6IHN0cmluZywgcGFnZVBhcmFtczogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBsZXQgaGFzaCA9IHBhZ2VOYW1lO1xyXG4gICAgICAgIGlmIChwYWdlUGFyYW1zKSB7XHJcbiAgICAgICAgICAgIGhhc2ggKz0gXCIvXCIgKyBidG9hKEpTT04uc3RyaW5naWZ5KHBhZ2VQYXJhbXMpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBoYXNoO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGRlY29kZVBhZ2VIYXNoKCk6IHsgcGFnZU5hbWU6IHN0cmluZywgcGFnZVBhcmFtczogYW55IH0ge1xyXG4gICAgICAgIGxldCByZXN1bHQ6IGFueSA9IHsgcGFnZU5hbWU6IG51bGwsIHBhZ2VQYXJhbXM6IG51bGwgfTtcclxuICAgICAgICBsZXQgaGFzaCA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG4gICAgICAgIGlmICghaGFzaCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGFzaCA9IGhhc2guc3Vic3RyKDEpO1xyXG5cclxuICAgICAgICBsZXQgZmlyc3RTbGFzaCA9IGhhc2guaW5kZXhPZihcIi9cIik7XHJcbiAgICAgICAgaWYgKGZpcnN0U2xhc2ggPT0gLTEpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnBhZ2VOYW1lID0gaGFzaDtcclxuICAgICAgICB9IGVsc2UgaWYgKGZpcnN0U2xhc2ggPiAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wYWdlTmFtZSA9IGhhc2guc3Vic3RyaW5nKDAsIGZpcnN0U2xhc2gpO1xyXG4gICAgICAgICAgICBsZXQgcGFyYW1zID0gaGFzaC5zdWJzdHJpbmcoZmlyc3RTbGFzaCArIDEpO1xyXG4gICAgICAgICAgICBpZiAocGFyYW1zKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucGFnZVBhcmFtcyA9IEpTT04ucGFyc2UoYXRvYihwYXJhbXMpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gcmVzdFBlbmRpbmcoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICEhKCQgYXMgYW55KS5hY3RpdmU7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2V0SGFzaChoYXNoOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXJlc3RQZW5kaW5nKCkpIHtcclxuICAgICAgICAgICAgbGV0IG9sZEhhc2ggPSB3aW5kb3cubG9jYXRpb24uaGFzaCB8fCBcIlwiO1xyXG4gICAgICAgICAgICBpZiAob2xkSGFzaC5pbmRleE9mKFwiI1wiKSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBvbGRIYXNoID0gXCIjXCIgKyBvbGRIYXNoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldCBuZXdIYXNoID0gaGFzaCB8fCBcIlwiO1xyXG4gICAgICAgICAgICBpZiAobmV3SGFzaC5pbmRleE9mKFwiI1wiKSAhPSAwKSB7XHJcbiAgICAgICAgICAgICAgICBuZXdIYXNoID0gXCIjXCIgKyBuZXdIYXNoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChuZXdIYXNoID09IG9sZEhhc2gpIHtcclxuICAgICAgICAgICAgICAgIG9uSGFzaENoYW5nZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgc2V0SGFzaChoYXNoKTtcclxuICAgICAgICAgICAgfSwgMzApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIG5hdmlnYXRlUGFnZShwYWdlQ29tcG9uZW50OiB0eXBlb2YgUmVhY3QuQ29tcG9uZW50IHwgc3RyaW5nIHwgYW55IHwgbnVsbCB8IHVuZGVmaW5lZCwgcGFyYW1zPzogYW55KSB7XHJcbiAgICAgICAgbGV0IHRhcmdldFBhZ2VOYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgbGV0IHRhcmdldFBhZ2U6IHR5cGVvZiBSZWFjdC5Db21wb25lbnQ7XHJcblxyXG4gICAgICAgIGlmIChwYWdlQ29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFnZUNvbXBvbmVudCA9PT0gXCJzdHJpbmdcIikge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0UGFnZU5hbWUgPSBwYWdlQ29tcG9uZW50O1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0UGFnZSA9IGFsbFBhZ2VzW3BhZ2VDb21wb25lbnRdLmNvbXBvbmVudDtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRhcmdldFBhZ2UgPSBwYWdlQ29tcG9uZW50O1xyXG5cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IHBhZ2VOYW1lIG9mIE9iamVjdC5rZXlzKGFsbFBhZ2VzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXRQYWdlID09PSBhbGxQYWdlc1twYWdlTmFtZV0uY29tcG9uZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldFBhZ2VOYW1lID0gcGFnZU5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRhcmdldFBhZ2VOYW1lID0gZGVjb2RlUGFnZUhhc2goKS5wYWdlTmFtZTtcclxuICAgICAgICAgICAgdGFyZ2V0UGFnZSA9IGFsbFBhZ2VzW3RhcmdldFBhZ2VOYW1lXS5jb21wb25lbnQ7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0UGFnZU5hbWUgJiYgcGFnZUhvc3QpIHtcclxuICAgICAgICAgICAgaWYgKCh0YXJnZXRQYWdlIGFzIGFueSkubmVlZHNSZXR1cm5QYWdlICYmIHRhcmdldFBhZ2UgIT09IHBhZ2VIb3N0LmdldFBhZ2VzKClbMF0ucGFnZVR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHNldHRpbmdzLnJldHVyblBhZ2VzW3RhcmdldFBhZ2VOYW1lXSA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoO1xyXG4gICAgICAgICAgICAgICAgY2FsbFJlc3QoXCJzYXZlcmV0dXJucGFnZXNcIiwgeyByZXR1cm5QYWdlczogc2V0dGluZ3MucmV0dXJuUGFnZXMgfSwgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgfSwgdW5kZWZpbmVkLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNldEhhc2goZW5jb2RlUGFnZUhhc2godGFyZ2V0UGFnZU5hbWUsIHBhcmFtcykpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmb3IgKGxldCBwb3B1cENvbXBvbmVudCBvZiBhbGxQb3B1cHMpIHtcclxuICAgICAgICAgICAgaWYgKHBvcHVwQ29tcG9uZW50ID09IHRhcmdldFBhZ2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChwYWdlSG9zdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VIb3N0LnB1c2hQYWdlKHRhcmdldFBhZ2UsIHRhcmdldFBhZ2VOYW1lLCBwYXJhbXMsIG51bGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiSW52YWxpZCBwYWdlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBnZXRDdXJyZW50UGFnZUlkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgbGV0IGhyZWYgPSB3aW5kb3cubG9jYXRpb24uaGFzaDtcclxuICAgICAgICBsZXQgaGFzaEluZGV4ID0gaHJlZi5pbmRleE9mKFwiI1wiKTtcclxuICAgICAgICBpZiAoaGFzaEluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgaHJlZiA9IGhyZWYuc3Vic3RyaW5nKDEpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaGFzaEluZGV4ID4gMCkge1xyXG4gICAgICAgICAgICBocmVmID0gaHJlZi5zdWJzdHJpbmcoMCwgaGFzaEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGhyZWY7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldEN1cnJlbnRQYWdlTmFtZSgpOiBzdHJpbmcgfCBudWxsIHwgdW5kZWZpbmVkIHtcclxuICAgICAgICBpZiAoIXBhZ2VIb3N0KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcGFnZXMgPSBwYWdlSG9zdC5nZXRQYWdlcygpO1xyXG4gICAgICAgIGlmIChwYWdlcy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBwYWdlc1twYWdlcy5sZW5ndGggLSAxXS5wYWdlTmFtZTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gbmF2aWdhdGVCYWNrKCkge1xyXG4gICAgICAgIGlmICghcGFnZUhvc3QpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFnZUhvc3QuZ2V0UGFnZXMoKS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHBhZ2VIb3N0LnBvcFBhZ2UoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsZXQgaGFzaCA9IHNldHRpbmdzLnJldHVyblBhZ2VzW2RlY29kZVBhZ2VIYXNoKCkucGFnZU5hbWVdO1xyXG4gICAgICAgICAgICBpZiAoaGFzaCkge1xyXG4gICAgICAgICAgICAgICAgc2V0SGFzaChoYXNoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gbG9ja1VpKCk6IHZvaWQge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocGFnZUhvc3QpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2VIb3N0LnNldExvY2tlZCh0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiB1bmxvY2tVaSgpOiB2b2lkIHtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHBhZ2VIb3N0KSB7XHJcbiAgICAgICAgICAgICAgICBwYWdlSG9zdC5zZXRMb2NrZWQoZmFsc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGV4cG9ydCBmdW5jdGlvbiBjYWxsUmVzdDxQLCBSPih1cmw6IHN0cmluZywgcGFyYW1zOiBQLCBzdWNjZXNzOiAocmVzdWx0OiBSKSA9PiB2b2lkLCBlcnJvcj86IChyZXN1bHQ/OiBSKSA9PiB2b2lkLCBzaG93U3Bpbm5lcjogYm9vbGVhbiA9IHRydWUpIHtcclxuXHJcbiAgICAgICAgZGVmaW5lUmVzdDxhbnksIGFueT4odXJsLCBzaG93U3Bpbm5lcikocGFyYW1zLCBzdWNjZXNzLCBlcnJvcik7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGRlZmluZVJlc3Q8UCwgUj4odXJsOiBzdHJpbmcsIHNob3dTcGlubmVyOiBib29sZWFuID0gdHJ1ZSk6IFJlc3RGdW5jdGlvbjxQLCBSPiB7XHJcbiAgICAgICAgcmV0dXJuIChwYXJhbXM6IFAsIHN1Y2Nlc3M6IChyZXN1bHQ6IFIpID0+IHZvaWQsIGVycm9yPzogKHJlc3VsdD86IFIpID0+IHZvaWQpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNob3dTcGlubmVyKSB7XHJcbiAgICAgICAgICAgICAgICBsb2NrVWkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAoIXBhcmFtcykge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zID0ge30gYXMgUDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocGFyYW1zID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcyA9IHt9IGFzIGFueTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAocGFyYW1zIGFzIGFueSkudXNlcklkID0gcm8uZGVtby51c2VySWQ7XHJcbiAgICAgICAgICAgIChwYXJhbXMgYXMgYW55KS51c2VybmFtZSA9IHJvLmRlbW8udXNlcm5hbWU7XHJcbiAgICAgICAgICAgIC8vIGFsZXJ0KEpTT04uc3RyaW5naWZ5KHBhcmFtcykgKyB1cmwpO1xyXG4gICAgICAgICAgICB1cmwgPSB1dGlsLnVwZGF0ZVF1ZXJ5U3RyaW5nUGFyYW1ldGVyKHVybCwgXCJ0c1wiLCBuZXcgRGF0ZSgpLmdldFRpbWUoKS50b1N0cmluZygpKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2codXJsKVxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiQWNjZXB0XCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgICAgICB1cmw6IHNldHRpbmdzLnJvb3QgKyB1cmwsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwYXJhbXMpLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKHJlc3BvbnNlOiBhbnkpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2hvd1NwaW5uZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdW5sb2NrVWkoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9ycyAmJiByZXNwb25zZS5lcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNyaXRpY2FsRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpbnNwZWN0UmVzcG9uc2VDYWxsYmFjaykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGluc3BlY3RSZXNwb25zZUNhbGxiYWNrKHJlc3BvbnNlKSA9PT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBkYXRhVHlwZTogXCJqc29uXCIsXHJcbiAgICAgICAgICAgICAgICBqc29ucDogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaG93U3Bpbm5lcikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB1bmxvY2tVaSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3JpdGljYWxFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gY3JpdGljYWxFcnJvcigpIHtcclxuICAgICAgICBsb2NhdGlvbi5yZXBsYWNlKFwicGFnZXMvZXJyb3IuaHRtbFwiKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGdldFVybCh1cmw6IHN0cmluZywgbm9DYWNoZTogYm9vbGVhbiA9IHRydWUpOiBzdHJpbmcge1xyXG4gICAgICAgIHVybCA9IHNldHRpbmdzLnJvb3QgKyB1cmw7XHJcblxyXG4gICAgICAgIGlmIChub0NhY2hlKSB7XHJcbiAgICAgICAgICAgIHVybCA9IHV0aWwubm9DYWNoZVVybCh1cmwpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHVybDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gZXh0cmFMb2FkZWRDYWxsYmFjayhkZWZlcjogSlF1ZXJ5RGVmZXJyZWQ8YW55Pik6IHZvaWQge1xyXG4gICAgICAgIGRlZmVyLnJlc29sdmUoKTtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gcmVkaXJlY3QodXJsOiBzdHJpbmcsIHJlcGxhY2U6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmICghdXJsKSB7XHJcbiAgICAgICAgICAgIGNyaXRpY2FsRXJyb3IoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZnVuY3Rpb24gdHJ5UmVkaXJlY3QocmV0cnlDb3VudDogbnVtYmVyKSB7XHJcbiAgICAgICAgICAgIGxvY2tVaSgpO1xyXG4gICAgICAgICAgICBpZiAocmVzdFBlbmRpbmcoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJldHJ5Q291bnQgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHVubG9ja1VpKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRyeVJlZGlyZWN0KHJldHJ5Q291bnQgLSAxKTtcclxuICAgICAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAocmVwbGFjZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZXBsYWNlKHVybCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gdXJsO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBkb2N1bWVudC5ib2R5LmZvY3VzKCk7XHJcbiAgICAgICAgbG9ja1VpKCk7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRyeVJlZGlyZWN0KDUwKTtcclxuICAgICAgICB9LCAxMDApO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gcmVsb2FkUGFnZShzYXZlU2Nyb2xsUG9zaXRpb246IGJvb2xlYW4gPSB0cnVlKSB7XHJcbiAgICAgICAgaWYgKHBhZ2VIb3N0ICYmIHNhdmVTY3JvbGxQb3NpdGlvbikge1xyXG4gICAgICAgICAgICBsZXQgc2Nyb2xsUG9zaXRpb24gPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgaWYgKHNjcm9sbFBvc2l0aW9uICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2VIb3N0LnNjcm9sbFBvc2l0aW9uID0gc2Nyb2xsUG9zaXRpb247XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9uSGFzaENoYW5nZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gb3Blbk5ld1RhYih1cmw6IHN0cmluZyB8IG51bGwgfCB1bmRlZmluZWQpOiB2b2lkIHtcclxuICAgICAgICBpZiAoIXVybCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodXJsLmluZGV4T2YoXCI6Ly9cIikgPCAwKSB7XHJcbiAgICAgICAgICAgIHVybCA9IFwiaHR0cDovL1wiICsgdXJsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2luZG93Lm9wZW4odXJsLCBcIl9ibGFua1wiKTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIHVuaXF1ZU51bWJlcigpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB1bmlxdWVOdW1iZXJTZWVkKys7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaW50ZXJuYWxfZ2V0UGFnZUhvc3QoKTogUGFnZUhvc3QgfCB1bmRlZmluZWQge1xyXG4gICAgICAgIHJldHVybiBwYWdlSG9zdDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaW50VG9TdHJpbmcodmFsdWU6IG51bWJlciB8IG51bGwgfCB1bmRlZmluZWQsIGRlZmF1bHRTdHJpbmc6IHN0cmluZyA9IFwiXCIsIHBhZGRlZExlbmd0aDogbnVtYmVyID0gMCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCh2YWx1ZSA9PSBudWxsKSB8fCBpc05hTih2YWx1ZSkgfHwgIWlzRmluaXRlKHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFN0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGxldCByZXN1bHQgPSB2YWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIGlmIChwYWRkZWRMZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHV0aWwubGVmdFBhZChyZXN1bHQsIHBhZGRlZExlbmd0aCwgXCIwXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaW50RnJvbVN0cmluZ1N0cmljdCh2YWx1ZTogc3RyaW5nKTogbnVtYmVyIHwgbnVsbCB7XHJcbiAgICAgICAgbGV0IHZhbDogbnVtYmVyIHwgbnVsbCA9IGludEZyb21TdHJpbmcodmFsdWUpO1xyXG4gICAgICAgIGlmICh2YWwgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSBpbnRUb1N0cmluZyh2YWwpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB2YWw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgZnVuY3Rpb24gaW50RnJvbVN0cmluZyh2YWx1ZTogc3RyaW5nLCBkZWZhdWx0TnVtYmVyRW1wdHlTdHJpbmc6IG51bWJlciB8IG51bGwgPSBudWxsLFxyXG4gICAgICAgIGRlZmF1bHROdW1iZXJVbmRlZmluZWRTdHJpbmc6IG51bWJlciB8IG51bGwgPSBudWxsLCBkZWZhdWx0TnVtYmVySW52YWxpZEZvcm1hdFN0cmluZzogbnVtYmVyIHwgbnVsbCA9IG51bGwpOiBudW1iZXIgfCBudWxsIHtcclxuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdE51bWJlclVuZGVmaW5lZFN0cmluZztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdE51bWJlckVtcHR5U3RyaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbGV0IHBhcnNlZCA9IHBhcnNlSW50KHZhbHVlLCAxMCk7XHJcbiAgICAgICAgaWYgKGlzTmFOKHBhcnNlZCkgfHwgIWlzRmluaXRlKHBhcnNlZCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHROdW1iZXJJbnZhbGlkRm9ybWF0U3RyaW5nO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHBhcnNlZDtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGI2NEVuY29kZVVuaWNvZGUoc3RyOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gYnRvYShlbmNvZGVVUklDb21wb25lbnQoc3RyKS5yZXBsYWNlKC8lKFswLTlBLUZdezJ9KS9nLCBmdW5jdGlvbiAoX21hdGNoOiBzdHJpbmcsIHAxOiBzdHJpbmcpIHtcclxuICAgICAgICAgICAgbGV0IGhleFN0cmluZzogc3RyaW5nID0gXCIweFwiICsgcDE7XHJcbiAgICAgICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGhleFN0cmluZywgMTYpKTtcclxuICAgICAgICB9KSk7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGZ1bmN0aW9uIGI2NERlY29kZVVuaWNvZGUoc3RyOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbChhdG9iKHN0ciksIGZ1bmN0aW9uIChjOiBhbnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiJVwiICsgKFwiMDBcIiArIGMuY2hhckNvZGVBdCgwKS50b1N0cmluZygxNikpLnNsaWNlKC0yKTtcclxuICAgICAgICB9KS5qb2luKFwiXCIpKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbiIsIm5hbWVzcGFjZSByby5kZW1vIHtcclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIFNlYXJjaFBhcmFtcyB7XHJcbiAgICAgICAgc3Vic3RyaW5nOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBTZWFyY2hSZXN1bHQge1xyXG4gICAgICAgIHByb3Rlc3RzOiBQcm90ZXN0W107XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBGaXJzdFBhZ2VQYXJhbSB7XHJcbiAgICAgICAgc29tZXN0cmluZzogc3RyaW5nO1xyXG4gICAgfVxyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgRmlyc3RQYWdlUmVzdWx0IHtcclxuICAgICAgICBzb21lc3RyaW5nOiBzdHJpbmc7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBGaXJzdFBhZ2VTdGF0ZSB7XHJcbiAgICAgICAgaGFzRXJyb3JzOiBib29sZWFuO1xyXG4gICAgICAgIGlzTG9nZ2VkSW46IGJvb2xlYW47XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBQcm90ZXN0UGFyYW1zIHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGludGVyZmFjZSBQcm90ZXN0UmVzdWx0IHtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgQHBhZ2UoXCJmaXJzdFwiLCBcImZpcnN0L2xvYWRcIilcclxuICAgIGV4cG9ydCBjbGFzcyBGaXJzdFBhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UGFnZVByb3BzPEZpcnN0UGFnZVBhcmFtLCBGaXJzdFBhZ2VSZXN1bHQ+LCBGaXJzdFBhZ2VTdGF0ZT4ge1xyXG5cclxuICAgICAgICAvLyBwcml2YXRlIHNlYXJjaFJlc3Q6IFJlc3RGdW5jdGlvbjxTZWFyY2hQYXJhbXMsIFNlYXJjaFJlc3VsdD4gPSBkZWZpbmVSZXN0KFwiZmlyc3Qvc2VhcmNoXCIpO1xyXG5cclxuICAgICAgICAvLyBwcml2YXRlIHNlYXJjaFRleHRJbnB1dDogU2VhcmNoSW5wdXQgfCBudWxsID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gY29uc3RydWN0b3IocHJvcHM6IFBhZ2VQcm9wczxGaXJzdFBhZ2VQYXJhbSwgRmlyc3RQYWdlUmVzdWx0Pikge1xyXG4gICAgICAgIC8vICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyAgICAgLy8gZGFjYSBudSBsdWNyZXppIGN1IGNlIHByaW1lc3RpIGluaXRpYWwgZGUgcGUgc2VydmVyLCBhZGF1Z2kgaW4gc3RhdGUgY2FcclxuICAgICAgICAvLyAgICAgLy8gc2EgYXBhcmEgY2EgcmV6dWx0YXQgXHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgICAgIC8vIGxldCBlcnJvcnM6IEpTWC5FbGVtZW50IHwgdW5kZWZpbmVkO1xyXG4gICAgICAgICAgICAvLyBsZXQgcHJvdGVzdHNFbGVtZW50OiBKU1guRWxlbWVudFtdID0gW107XHJcbiAgICAgICAgICAgIC8vIGxldCBhZGRQcm90ZXN0RXJyb3I6IEpTWC5FbGVtZW50IHwgdW5kZWZpbmVkO1xyXG5cclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuc3RhdGUuaGFzRXJyb3JzKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBlcnJvcnMgPSA8ZGl2PiBObyBzZWFyY2ggcmVzdWx0ISA8L2Rpdj47XHJcbiAgICAgICAgICAgIC8vIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vICAgICBlcnJvcnMgPSA8ZGl2PjwvZGl2PjtcclxuICAgICAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuc3RhdGUuaXNMb2dnZWRJbikge1xyXG4gICAgICAgICAgICAvLyAgICAgYWRkUHJvdGVzdEVycm9yID0gPGRpdiAvPlxyXG4gICAgICAgICAgICAvLyB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyAgICAgYWRkUHJvdGVzdEVycm9yID0gPGRpdj4gWW91IG11c3QgYmUgbG9nZ2VkIGluIHRvIGFkZCBhIHByb3Rlc3QgPC9kaXY+XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGxldCB0aFN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0geyB0ZXh0QWxpZ246IFwibGVmdFwiLCBib3JkZXJCb3R0b206IFwiMnB4IHNvbGlkIFwiICsgbWFpbkNvbG9yLCBwYWRkaW5nOiBcIjVweFwiLCBjb2xvcjogXCIjNTk2YTBhXCIsIGJhY2tncm91bmQ6IFwiI2YwZmFjNFwiIH07XHJcbiAgICAgICAgICAgIC8vIGxldCB0ZFN0eWxlOiBSZWFjdC5DU1NQcm9wZXJ0aWVzID0geyB0ZXh0QWxpZ246IFwibGVmdFwiLCBib3JkZXJCb3R0b206IFwiMXB4IHNvbGlkICNlZWVcIiwgcGFkZGluZzogXCI1cHhcIiB9O1xyXG5cclxuICAgICAgICAgICAgLy8gZm9yIChsZXQgcHJvdGVzdCBvZiB0aGlzLnN0YXRlLnByb3Rlc3RzKSB7XHJcbiAgICAgICAgICAgIC8vICAgICBwcm90ZXN0c0VsZW1lbnQucHVzaChcclxuICAgICAgICAgICAgLy8gICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIDx0ZCBzdHlsZT17dGRTdHlsZX0+IHtwcm90ZXN0LnRpdGxlfSA8L3RkPlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICA8dGQgc3R5bGU9e3RkU3R5bGV9PiB7cHJvdGVzdC5jaXR5fSA8L3RkPlxyXG4gICAgICAgICAgICAvLyAgICAgICAgICAgICA8dGQgc3R5bGU9e3RkU3R5bGV9PiB7cHJvdGVzdC5kYXRlU3RhcnR9IDwvdGQ+XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgIDx0ZCBzdHlsZT17dGRTdHlsZX0+IHtwcm90ZXN0LnRpbWVTdGFydH0gPC90ZD5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgPHRkIHN0eWxlPXt0ZFN0eWxlfT4ge3Byb3Rlc3QuZGF0ZUVuZH0gPC90ZD5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgPHRkIHN0eWxlPXt0ZFN0eWxlfT4ge3Byb3Rlc3QudGltZUVuZH0gPC90ZD5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgPHRkIHN0eWxlPXt0ZFN0eWxlfT4ge3Byb3Rlc3QuaW50ZXJlc3RlZH0gPC90ZD5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgPHRkIHN0eWxlPXt0ZFN0eWxlfT4ge3Byb3Rlc3QucGFydGljaXBhdGluZ30gPC90ZD5cclxuICAgICAgICAgICAgLy8gICAgICAgICAgICAgPHRkIHN0eWxlPXt0ZFN0eWxlfT4gPEJ1dHRvbiBsYWJlbD1cInNob3dcIiBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uQ2xpY2tTaG93UHJvdGVzdChwcm90ZXN0LnByb3Rlc3RJZCl9PiBFZGl0IFByb3Rlc3QgPC9CdXR0b24+IDwvdGQ+XHJcbiAgICAgICAgICAgIC8vICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgLy8gICAgICk7XHJcbiAgICAgICAgICAgIC8vIH1cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMT5BaWNpIGVzdGUge3RoaXMucHJvcHMucmVzdWx0LnNvbWVzdHJpbmd9PC9oMT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgLy8gPGRpdj5cclxuICAgICAgICAgICAgICAgIC8vICAgICA8SGVhZGVyIC8+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgPGRpdiBzdHlsZT17Y29udGVudFN0eWxlfT5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHsvKiA8YnV0dG9uIG9uQ2xpY2s9eygpID0+IHRoaXMub25DbGlja0FkZFByb3Rlc3QoKX0+IEFkZCBwcm90ZXN0IDwvYnV0dG9uPiAqL31cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgYm9yZGVyUmFkaXVzOiBcIjVweFwiLCBkaXNwbGF5OiBcImlubGluZS1ibG9ja1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgYm9yZGVyOiBcIjFweCBzb2xpZCBcIiArIG1haW5Db2xvciwgcGFkZGluZzogXCIxMHB4XCIsIGZvbnRTaXplOiBcIjIwcHhcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIG1hcmdpbjogXCIzMHB4IDBcIiwgY3Vyc29yOiBcInBvaW50ZXJcIixcclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCIjZjBmYWM0XCIsIGNvbG9yOiBcIiM1OTZhMGFcIlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB9fSBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uQ2xpY2tBZGRQcm90ZXN0KCl9PlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgKyBBZGQgcHJvdGVzdFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHthZGRQcm90ZXN0RXJyb3J9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICA8aHIgLz5cclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIDx0YWJsZT5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdmVydGljYWxBbGlnbjogXCJtaWRkbGVcIiwgcGFkZGluZzogXCIxMHB4IDBweFwiIH19PlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICA8U2VhcmNoSW5wdXQgcmVmPXsodCkgPT4gdGhpcy5zZWFyY2hUZXh0SW5wdXQgPSB0fVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgb25FbnRlcktleT17KCkgPT4gdGhpcy5vbkNsaWNrU2VhcmNoKCl9IC8+PC90ZD5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICA8dGQgc3R5bGU9e3sgdmVydGljYWxBbGlnbjogXCJtaWRkbGVcIiwgcGFkZGluZzogXCIxMHB4XCIgfX0+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIDxhIHN0eWxlPXt7XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXJSYWRpdXM6IFwiNXB4XCIsIGRpc3BsYXk6IFwiaW5saW5lLWJsb2NrXCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIFwiICsgbWFpbkNvbG9yLCBwYWRkaW5nOiBcIjVweFwiLCBmb250U2l6ZTogXCIxNXB4XCIsXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBjdXJzb3I6IFwicG9pbnRlclwiLFxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBtYWluQ29sb3IsIGNvbG9yOiBcIiNmMGZhYzRcIlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KGV2KSA9PiB7IGV2LnN0b3BQcm9wYWdhdGlvbigpOyBldi5wcmV2ZW50RGVmYXVsdCgpOyB0aGlzLm9uQ2xpY2tTZWFyY2goKTsgfX0+IFNlYXJjaCA8L2E+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIDwvdGFibGU+XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB7LyogPGJ1dHRvbiBvbkNsaWNrPXsoKSA9PiB0aGlzLm9uQ2xpY2tTZWFyY2goKX0+IFNlYXJjaCA8L2J1dHRvbj4gKi99XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICB7LyogPGEgc3R5bGU9e3sgZGlzcGxheTogXCJpbmxpbmVcIiB9fSBocmVmPVwiI1wiIG9uQ2xpY2s9eyhldikgPT4geyBldi5zdG9wUHJvcGFnYXRpb24oKTsgZXYucHJldmVudERlZmF1bHQoKTsgdGhpcy5vbkNsaWNrU2VhcmNoKCk7IH19PiBTZWFyY2ggPC9hPiAqL31cclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIHtlcnJvcnN9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICA8aHIgLz5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgPGJyIC8+XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICA8dGFibGU+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt0aFN0eWxlfT4gVGl0bGUgPC90aD5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3RoU3R5bGV9PiBDaXR5IDwvdGg+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt0aFN0eWxlfT4gU3RhcnQgRGF0ZSA8L3RoPlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17dGhTdHlsZX0+IFN0YXJ0IFRpbWUgPC90aD5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3RoU3R5bGV9PiBFbmQgRGF0ZSA8L3RoPlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17dGhTdHlsZX0+IEVuZCBUaW1lIDwvdGg+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgICAgICAgICAgPHRoIHN0eWxlPXt0aFN0eWxlfT4gSW50ZXJlc3RlZCA8L3RoPlxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgIDx0aCBzdHlsZT17dGhTdHlsZX0+IFBhcnRpY2lwYXRpbmcgPC90aD5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICA8dGggc3R5bGU9e3RoU3R5bGV9PiAgPC90aD5cclxuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgIDwvdHI+XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAge3Byb3Rlc3RzRWxlbWVudH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICAvLyAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAvLyA8L2Rpdj5cclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHByaXZhdGUgb25DbGlja1NlYXJjaCgpIHtcclxuXHJcbiAgICAgICAgLy8gICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgIC8vICAgICAgICAgaGFzRXJyb3JzOiBmYWxzZSxcclxuICAgICAgICAvLyAgICAgICAgIHByb3Rlc3RzOiBbXVxyXG4gICAgICAgIC8vICAgICB9KVxyXG5cclxuXHJcbiAgICAgICAgLy8gICAgIGlmICh0aGlzLnNlYXJjaFRleHRJbnB1dCkge1xyXG5cclxuICAgICAgICAvLyAgICAgICAgIHRoaXMuc2VhcmNoUmVzdCh7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgc3Vic3RyaW5nOiB0aGlzLnNlYXJjaFRleHRJbnB1dC5nZXRWYWx1ZSgpLFxyXG4gICAgICAgIC8vICAgICAgICAgfSwgKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmICgwID09IHJlc3VsdC5wcm90ZXN0cy5sZW5ndGgpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGhhc0Vycm9yczogdHJ1ZSB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaGFzRXJyb3JzOiBmYWxzZSwgcHJvdGVzdHM6IHJlc3VsdC5wcm90ZXN0cyB9KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICB9XHJcbiAgICAgICAgLy8gfVxyXG5cclxuICAgICAgICAvLyBwcml2YXRlIG9uQ2xpY2tBZGRQcm90ZXN0KCkge1xyXG4gICAgICAgIC8vICAgICBpZiAocm8uZGVtby51c2VySWQgIT0gMCkge1xyXG4gICAgICAgIC8vICAgICAgICAgbmF2aWdhdGVQYWdlKFByb3Rlc3RSZWdpc3RlclBhZ2UpO1xyXG4gICAgICAgIC8vICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgaXNMb2dnZWRJbjogZmFsc2VcclxuICAgICAgICAvLyAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgICAgIC8vIHByaXZhdGUgb25DbGlja1Nob3dQcm90ZXN0KHByb3Rlc3RJZDogbnVtYmVyKSB7XHJcbiAgICAgICAgLy8gICAgIG5hdmlnYXRlUGFnZShQcm90ZXN0RGV0YWlscywgeyBwcm90ZXN0SWQ6IHByb3Rlc3RJZCB9KTtcclxuICAgICAgICAvLyB9XHJcblxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIHJvLmRlbW8ge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgUGFnZUhvc3RQYWdlRGV0YWlscyB7XHJcbiAgICAgICAgcGFnZUtleT86IG51bWJlcjtcclxuICAgICAgICBwYWdlVHlwZT86IHR5cGVvZiBSZWFjdC5Db21wb25lbnQ7XHJcbiAgICAgICAgcGFnZVJlc3VsdD86IGFueTtcclxuICAgICAgICBwYWdlUGFyYW1zPzogYW55O1xyXG4gICAgICAgIHBhZ2VOYW1lPzogc3RyaW5nO1xyXG4gICAgICAgIHNjcm9sbFBvc2l0aW9uOiBudW1iZXI7XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbiAgICBleHBvcnQgaW50ZXJmYWNlIFBhZ2VIb3N0U3RhdGUge1xyXG4gICAgICAgIHBhZ2VzOiBQYWdlSG9zdFBhZ2VEZXRhaWxzW107XHJcbiAgICAgICAgaXNMb2NrZWQ/OiBib29sZWFuO1xyXG4gICAgICAgIGlzSGVhZGVyT3Blbj86IGJvb2xlYW47XHJcbiAgICAgICAgZGVidWdDb25zb2xlTGluZXM/OiBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcclxuICAgICAgICB3ZWJCcm9hZGNhc3ROb3RpZmljYXRpb24/OiBzdHJpbmcgfCB1bmRlZmluZWQ7XHJcbiAgICAgICAgaXNNZWFzdXJpbmc6IGJvb2xlYW47XHJcbiAgICAgICAgLy8gbWVhc3VyYWJsZXM6IE1lYXN1cmFibGVSZWFjdENvbXBvbmVudFtdO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBleHBvcnQgY2xhc3MgUGFnZUhvc3QgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8e30sIFBhZ2VIb3N0U3RhdGU+IHtcclxuICAgICAgICBiYXNlUGFnZUtleTogbnVtYmVyID0gMTtcclxuICAgICAgICBzY3JvbGxQb3NpdGlvbjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcbiAgICAgICAgbWVhc3VyaW5nVGltZXI6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG4gICAgICAgIGFkZE1lYXN1cmFibGVUaW1lcjogbnVtYmVyIHwgbnVsbCA9IG51bGw7XHJcblxyXG4gICAgICAgIGxhc3RCb2R5Q2xpZW50V2lkdGg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgbGFzdFdpbmRvd0lubmVyV2lkdGg6IG51bWJlciA9IDA7XHJcbiAgICAgICAgY29uc2VjdXRpdmVSZXNpemVDb3VudDogbnVtYmVyID0gMDtcclxuICAgICAgICBwZXJpb2RpY0NoZWNrSW50ZXJ2YWw6IG51bWJlciB8IG51bGwgPSBudWxsO1xyXG5cclxuICAgICAgICBtZWFzdXJhYmxlczogTWVhc3VyYWJsZVJlYWN0Q29tcG9uZW50W10gPSBbXTtcclxuXHJcbiAgICAgICAgY29uc3RydWN0b3IocHJvcHM6IHt9KSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgICAgIHBhZ2VzOiBbXSxcclxuICAgICAgICAgICAgICAgIGlzTWVhc3VyaW5nOiBmYWxzZVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5wZXJpb2RpY0NoZWNrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB0aGlzLnBlcmlvZGljQ2hlY2tTaXplKCksIDIwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuXHJcbiAgICAgICAgcmVuZGVyKCkge1xyXG4gICAgICAgICAgICBsZXQgcGFnZXM6IGFueVtdID0gW107XHJcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zdGF0ZS5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgbGV0IHBhZ2UgPSB0aGlzLnN0YXRlLnBhZ2VzW2ldO1xyXG4gICAgICAgICAgICAgICAgbGV0IFBhZ2VUeXBlID0gcGFnZS5wYWdlVHlwZSBhcyBhbnk7ICAgLy8gdHNsaW50OmRpc2FibGUtbGluZTp2YXJpYWJsZS1uYW1lXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHBhZ2VTdHlsZTogUmVhY3QuQ1NTUHJvcGVydGllcyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPCB0aGlzLnN0YXRlLnBhZ2VzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlU3R5bGUgPSB7IGRpc3BsYXk6IFwibm9uZVwiIH07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBwYWdlU3R5bGUubWF4V2lkdGggPSBcIjc2OHB4XCI7XHJcbiAgICAgICAgICAgICAgICAvLyBwYWdlU3R5bGUubWFyZ2luID0gXCIwIGF1dG9cIjtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoUGFnZVR5cGUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VzLnB1c2goXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYga2V5PXtwYWdlLnBhZ2VLZXl9IGNsYXNzTmFtZT1cInBhZ2VcIiBzdHlsZT17cGFnZVN0eWxlfT4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGFnZVR5cGUgIHsuLi4geyBwYXJhbXM6IHBhZ2UucGFnZVBhcmFtcyB8fCB7fSwgcmVzdWx0OiBwYWdlLnBhZ2VSZXN1bHQgfX0gLz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuXHJcblxyXG5cclxuXHJcbiAgICAgICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2UtaG9zdFwiID4gICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgICAgIHtwYWdlc31cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgd2luZG93UmVzaXplSGFuZGxlcjogVm9pZEZ1bmN0aW9uID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5pc01lYXN1cmluZyAmJiB0aGlzLm1lYXN1cmluZ1RpbWVyICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm1lYXN1cmluZ1RpbWVyKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRNZWFzdXJlVGltZW91dCgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc01lYXN1cmluZzogdHJ1ZSB9LCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0TWVhc3VyZVRpbWVvdXQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdGFydE1lYXN1cmVUaW1lb3V0KCkge1xyXG4gICAgICAgICAgICB0aGlzLm1lYXN1cmluZ1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lYXN1cmluZ1RpbWVyID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG1lYXN1cmFibGUgb2YgdGhpcy5tZWFzdXJhYmxlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChtZWFzdXJhYmxlICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbWVhc3VyYWJsZS5tZWFzdXJlV2lkdGgoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgaXNNZWFzdXJpbmc6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2Nyb2xsKCk7XHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMud2luZG93UmVzaXplSGFuZGxlcigpO1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLndpbmRvd1Jlc2l6ZUhhbmRsZXIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wZXJpb2RpY0NoZWNrSW50ZXJ2YWwgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnBlcmlvZGljQ2hlY2tJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwic2Nyb2xsXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2Nyb2xsKCk7XHJcbiAgICAgICAgICAgIH0sIGZhbHNlKTtcclxuXHJcbiAgICAgICAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMud2luZG93UmVzaXplSGFuZGxlcik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoYW5kbGVTY3JvbGwoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsUG9zaXRpb24gPSAkKGRvY3VtZW50KS5zY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucGFnZXMgIT0gbnVsbCAmJiB0aGlzLnN0YXRlLnBhZ2VzLmxlbmd0aCA+IDAgJiYgdGhpcy5zdGF0ZS5wYWdlc1t0aGlzLnN0YXRlLnBhZ2VzLmxlbmd0aCAtIDFdLnNjcm9sbFBvc2l0aW9uICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUucGFnZXNbdGhpcy5zdGF0ZS5wYWdlcy5sZW5ndGggLSAxXS5zY3JvbGxQb3NpdGlvbiA9ICQoZG9jdW1lbnQpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb21wb25lbnREaWRVcGRhdGUoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbFBvc2l0aW9uICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAkKGRvY3VtZW50KS5zY3JvbGxUb3AodGhpcy5zY3JvbGxQb3NpdGlvbik7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFBvc2l0aW9uID0gbnVsbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5wYWdlcyAhPSBudWxsICYmIHRoaXMuc3RhdGUucGFnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgJChkb2N1bWVudCkuc2Nyb2xsVG9wKHRoaXMuc3RhdGUucGFnZXNbdGhpcy5zdGF0ZS5wYWdlcy5sZW5ndGggLSAxXS5zY3JvbGxQb3NpdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHNldFBhZ2UocGFnZVR5cGU6IHR5cGVvZiBSZWFjdC5Db21wb25lbnQsIHBhZ2VOYW1lOiBzdHJpbmcsIHBhZ2VQYXJhbXM6IGFueSwgcGFnZVJlc3VsdDogYW55KSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbFBvc2l0aW9uID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNjcm9sbFBvc2l0aW9uID0gMDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBwYWdlczogW3tcclxuICAgICAgICAgICAgICAgICAgICBwYWdlS2V5OiB0aGlzLmJhc2VQYWdlS2V5KyssIHBhZ2VUeXBlOiBwYWdlVHlwZSwgcGFnZU5hbWU6IHBhZ2VOYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VQYXJhbXM6IHBhZ2VQYXJhbXMsIHBhZ2VSZXN1bHQ6IHBhZ2VSZXN1bHQsIHNjcm9sbFBvc2l0aW9uOiAwXHJcbiAgICAgICAgICAgICAgICB9XVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHB1c2hQYWdlKHBhZ2VUeXBlOiB0eXBlb2YgUmVhY3QuQ29tcG9uZW50LCBwYWdlTmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkLCBwYWdlUGFyYW1zOiBhbnksIHBhZ2VSZXN1bHQ6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zY3JvbGxQb3NpdGlvbiA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JvbGxQb3NpdGlvbiA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IG5ld1BhZ2VzOiBQYWdlSG9zdFBhZ2VEZXRhaWxzW10gPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucGFnZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbmV3UGFnZXMgPSB0aGlzLnN0YXRlLnBhZ2VzLmNvbmNhdChbe1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VLZXk6IHRoaXMuYmFzZVBhZ2VLZXkrKywgcGFnZVR5cGU6IHBhZ2VUeXBlLCBwYWdlTmFtZTogcGFnZU5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZVBhcmFtczogcGFnZVBhcmFtcywgcGFnZVJlc3VsdDogcGFnZVJlc3VsdCwgc2Nyb2xsUG9zaXRpb246IDBcclxuICAgICAgICAgICAgICAgIH1dKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgcGFnZXM6IG5ld1BhZ2VzIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcG9wUGFnZSgpIHtcclxuICAgICAgICAgICAgbGV0IG5ld1BhZ2VzOiBQYWdlSG9zdFBhZ2VEZXRhaWxzW10gPSBbXTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUucGFnZXMgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgbmV3UGFnZXMgPSB0aGlzLnN0YXRlLnBhZ2VzLnNsaWNlKDAsIHRoaXMuc3RhdGUucGFnZXMubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHBhZ2VzOiBuZXdQYWdlcyB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGdldFBhZ2VzKCk6IFBhZ2VIb3N0UGFnZURldGFpbHNbXSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnBhZ2VzKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5wYWdlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gW107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzZXRMb2NrZWQobG9ja2VkOiBib29sZWFuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBpc0xvY2tlZDogbG9ja2VkIH0pO1xyXG4gICAgICAgIH1cclxuXHJcblxyXG5cclxuICAgICAgICBtZWFzdXJhYmxlQWRkZWQoKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmFkZE1lYXN1cmFibGVUaW1lciAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5hZGRNZWFzdXJhYmxlVGltZXIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB0aGlzLmFkZE1lYXN1cmFibGVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy53aW5kb3dSZXNpemVIYW5kbGVyKCk7XHJcbiAgICAgICAgICAgIH0sIDEwMDApO1xyXG5cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgcGVyaW9kaWNDaGVja1NpemUoKTogdm9pZCB7XHJcblxyXG4gICAgICAgICAgICBsZXQgYm9keUNsaWVudFdpZHRoID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aDtcclxuICAgICAgICAgICAgbGV0IHdpbmRvd0lubmVyV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuXHJcbiAgICAgICAgICAgIGlmICh3aW5kb3dJbm5lcldpZHRoID09IHRoaXMubGFzdFdpbmRvd0lubmVyV2lkdGgpIHtcclxuICAgICAgICAgICAgICAgIGlmIChib2R5Q2xpZW50V2lkdGggPT0gdGhpcy5sYXN0Qm9keUNsaWVudFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb25zZWN1dGl2ZVJlc2l6ZUNvdW50ID0gMDtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbnNlY3V0aXZlUmVzaXplQ291bnQgPCAzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY29uc2VjdXRpdmVSZXNpemVDb3VudCsrO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RCb2R5Q2xpZW50V2lkdGggPSBib2R5Q2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFdpbmRvd0lubmVyV2lkdGggPSB3aW5kb3dJbm5lcldpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLndpbmRvd1Jlc2l6ZUhhbmRsZXIoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RCb2R5Q2xpZW50V2lkdGggPSBib2R5Q2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMubGFzdFdpbmRvd0lubmVyV2lkdGggPSB3aW5kb3dJbm5lcldpZHRoO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29uc2VjdXRpdmVSZXNpemVDb3VudCA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RCb2R5Q2xpZW50V2lkdGggPSBib2R5Q2xpZW50V2lkdGg7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RXaW5kb3dJbm5lcldpZHRoID0gd2luZG93SW5uZXJXaWR0aDtcclxuICAgICAgICAgICAgICAgIHRoaXMud2luZG93UmVzaXplSGFuZGxlcigpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG5cclxuICAgICAgICB9XHJcblxyXG5cclxuXHJcblxyXG4gICAgfVxyXG59IiwibmFtZXNwYWNlIHJvLmRlbW8ge1xyXG5cclxuICAgIGV4cG9ydCBpbnRlcmZhY2UgQnV0dG9uUHJvcHMge1xyXG4gICAgICAgIGxhYmVsOiBzdHJpbmc7XHJcbiAgICAgICAgb25DbGljaz86ICgpID0+IHZvaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxCdXR0b25Qcm9wcz4ge1xyXG5cclxuICAgICAgICBwdWJsaWMgY29uc3RydWN0b3IocHJvcHM6IEJ1dHRvblByb3BzKSB7XHJcbiAgICAgICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHByaXZhdGUgb25DbGljaygpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMub25DbGljayAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLm9uQ2xpY2soKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmVuZGVyKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17e1xyXG4gICAgICAgICAgICAgICAgICAgIGJvcmRlclJhZGl1czogXCI1cHhcIiwgZGlzcGxheTogXCJpbmxpbmUtYmxvY2tcIixcclxuICAgICAgICAgICAgICAgICAgICBib3JkZXI6IFwiMXB4IHNvbGlkIFwiICsgbWFpbkNvbG9yLCBwYWRkaW5nOiBcIjVweFwiLCBmb250U2l6ZTogXCIxNXB4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yOiBcInBvaW50ZXJcIixcclxuICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG1haW5Db2xvciwgY29sb3I6IFwiI2YwZmFjNFwiXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge3RoaXMub25DbGljaygpfX0+IHt0aGlzLnByb3BzLmxhYmVsfSA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn0iLCJuYW1lc3BhY2Ugcm8uZGVtbyB7XHJcblxyXG4gICAgZXhwb3J0IGNsYXNzIEN1cnJlbnRMb2NhdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG59Il19