namespace ro.demo.util {

    const isoDateRegex: RegExp = /^\s*(\d{4})-(\d{2})-(\d{2})\s*$/;
    const isoDateTimeRegex: RegExp = /^\s*(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})\s*$/;

    export function getQueryStringParameter(name: string, uri: string): string {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        let regexS = "[\\?&]" + name + "=([^&#]*)";
        let regex = new RegExp(regexS);
        let results = regex.exec(uri || window.location.search);
        if (!results) {
            return "";
        } else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }

    export function updateQueryStringParameter(uri: string, key: string, value: string): string {
        let re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
        let separator = uri.indexOf("?") !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, "$1" + key + "=" + value + "$2");
        } else {
            return uri + separator + key + "=" + value;
        }
    }

    export function noCacheUrl(url: string): string {
        if (getQueryStringParameter("ts", url)) {
            return url;
        }

        return updateQueryStringParameter(url, "ts", new Date().getTime().toString());
    }

    export function urlCombine(root: string, ...paths: string[]): string {
        let result = root + "/" + paths.join("/");
        result = result.replace(/([^:\s])\/+/g, "$1/");
        return result;
    }

    export function getQueryStringObject(uri: string): any {
        let result: StringKeyMap<string> = {};
        uri = uri || window.location.href;
        uri = uri.split("?").slice(1).join("?");

        uri.replace(new RegExp("([^?=&]+)(=([^&#]*))?", "g"),
            function (_$0: any, $1: any, _$2: any, $3: any): string {
                if ($1 && $3) {
                    result[decodeURIComponent($1)] = decodeURIComponent($3);
                }
                return "";
            });

        return result;
    }

    export class DateTime {
        year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        second: number;

        constructor(year: number, month: number, day: number, hour: number = 0, minute: number = 0, second: number = 0) {
            this.year = year;
            this.month = month;
            this.day = day;
            this.hour = hour;
            this.minute = minute;
            this.second = second;
        }

        static parseIso(input: string | null | undefined): DateTime | null {
            if (input == null) {
                return null;
            }
            let match = isoDateRegex.exec(input);
            if (match) {
                let year = intFromString(match[1]);
                let month = intFromString(match[2]);
                let day = intFromString(match[3]);
                if (year && month && day) {
                    let result = new DateTime(year, month, day);
                    return result.isValid() ? result : null;
                } else {
                    return null;
                }
            }

            match = isoDateTimeRegex.exec(input);
            if (match) {
                let year = intFromString(match[1]);
                let month = intFromString(match[2]);
                let day = intFromString(match[3]);
                let hour = intFromString(match[4]);
                let minute = intFromString(match[5]);
                let second = intFromString(match[6]);
                if (year && month && day && hour != null && minute != null && second != null) {
                    let result = new DateTime(year, month, day, hour, minute, second);
                    return result.isValid() ? result : null;
                } else {
                    return null;
                }
            }

            return null;
        }


        static now(): DateTime {
            let now = new Date();
            return new DateTime(now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());
        }

        static compareDates(date1: DateTime, date2: DateTime): number {
            let firstDate: Date = new Date();
            firstDate.setFullYear(date1.year);
            firstDate.setMonth(date1.month);
            firstDate.setDate(date1.day);

            let secondDate: Date = new Date();
            secondDate.setFullYear(date2.year);
            secondDate.setMonth(date2.month);
            secondDate.setDate(date2.day);

            return firstDate > secondDate ? 1 : (firstDate.getTime() === secondDate.getTime() ? 0 : -1);
        }

        toIsoDateString(): string {
            return intToString(this.year, "0000", 4) + "-" +
                intToString(this.month, "00", 2) + "-" +
                intToString(this.day, "00", 2);
        }

        toIsoDateTimeString(): string {
            return this.toIsoDateString() + " " +
                intToString(this.hour, "00", 2) + ":" +
                intToString(this.minute, "00", 2) + ":" +
                intToString(this.second, "00", 2);
        }

        toClientDateString(): string {
            return intToString(this.day, "00", 2) + "-" +
                intToString(this.month, "00", 2) + "-" +
                intToString(this.year, "0000", 4);
        }

        toClientDateTimeString(): string {
            return this.toClientDateString() + " " +
                intToString(this.hour, "00", 2) + ":" +
                intToString(this.minute, "00", 2);
        }

        clone(): DateTime {
            return new DateTime(this.year, this.month, this.day,
                this.hour, this.minute, this.second);
        }

        fitDayInMonth() {
            if (this.day <= 0) {
                this.day = 1;
            }

            let daysInMonth = this.getDaysInMonth();
            if (this.day > daysInMonth) {
                this.day = daysInMonth;
            }
        }

        getDaysInMonth() {
            return new Date(this.year, this.month, 0).getDate();
        }

        addMonths(months: number) {
            let date = new Date(this.year, this.month - 1 + months, 1);
            this.year = date.getFullYear();
            this.month = date.getMonth() + 1;
        }

        isValid(): boolean {
            let date = new Date(this.year, this.month - 1, this.day, this.hour || 0, this.minute || 0, this.second || 0);
            return date.getFullYear() == this.year && date.getMonth() == this.month - 1 && date.getDate() == this.day &&
                date.getHours() == this.hour && date.getMinutes() == this.minute && date.getSeconds() == this.second;
        }
    }


    export function dateToIso(input: string): string {
        // dd-mm-yyyy -> yyyy-mm-dd
        let regex = /^\s*(\d{2})-(\d{2})-(\d{4})\s*$/;
        let match = regex.exec(input);
        if (!match) {
            return "";
        }

        return match[3] + "-" + match[2] + "-" + match[1];
    }


    export function dateFromIso(input: string | null | undefined): string {
        if (input == null) {
            return "";
        }
        let match = isoDateRegex.exec(input);
        if (!match) {
            return "";
        }

        return match[3] + "-" + match[2] + "-" + match[1];
    }

    export function dateTimeToIso(input: string): string {
        // dd-mm-yyyy hh:mm -> yyyy-mm-dd hh:mm:ss
        let regex = /^\s*(\d{2})-(\d{2})-(\d{4})\s(\d{2}):(\d{2})\s*$/;
        let match = regex.exec(input);
        if (!match) {
            return "";
        }

        return match[3] + "-" + match[2] + "-" + match[1] + " " + match[4] + ":" + match[5] + ":00";
    }

    export function dateTimeFromIso(input: string | null | undefined): string {
        if (input == null) {
            return "";
        }
        let match = isoDateTimeRegex.exec(input);
        if (!match) {
            return "";
        }

        return match[3] + "-" + match[2] + "-" + match[1] + " " + match[4] + ":" + match[5];
    }

    function getBackgroundImageUrl(element: JQuery): string {
        let url = element.css("background-image");
        let matches = /^url\(([""]?)(.*)\1\)$/.exec(url);
        return matches ? matches[2] : "";
    }

   

   
    export function getLessData(lessClass: string): any {
        let lessElement = $("." + lessClass);
        if (lessElement.length == 0) {
            $("body").append($("<div>").addClass(lessClass).addClass("displayNone"));
        }

        let backgroundUrl = getBackgroundImageUrl(lessElement);
        return getQueryStringObject(backgroundUrl);
    }


    export function getFileExtension(filename: string | null | undefined): string {
        if (filename == null) {
            return "";
        }
        let ext = /^.+\.([^.]+)$/.exec(filename);
        return !ext ? "" : ext[1].toLowerCase();
    }

    export function validFileExtension(list: string[], extension: string): boolean {
        for (let i = 0; i < list.length; i++) {
            if (list[i] == extension) {
                return true;
            }
        }
        return false;
    }

    export function replaceExtension(filename: string, extension: string): string | null {
        if (!filename) {
            return null;
        }

        return filename.replace(/\.([^.]+)$/, "." + extension);
    }

    export function validEmail(input: string): boolean {
        if (!input) {
            return false;
        }

        return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(input);
    }

    export function validUrl(input: string | null | undefined): boolean {
        if (!input) {
            return false;
        }

        return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/|www\.|)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/.test(input);
    }

    export function truncate(input: string, n: number, useWordBoundary: boolean): string {
        if (!input) {
            return "";
        }

        let tooLong = input.length > n;
        let part = tooLong ? input.substr(0, n - 1) : input;
        part = useWordBoundary && tooLong ? part.substr(0, part.lastIndexOf(" ")) : part;
        return tooLong ? part + "..." : part;
    }

    export function parseNumberArray(input: string): number[] {
        if (input) {
            input = $.trim(input);
        }

        if (!input) {
            return [];
        }

        let items = input.split(/\s*[,;]\s*/);
        let result: number[] = [];
        for (let i = 0; i < items.length; i++) {
            let value = intFromString(items[i]);
            if (value !== null) {
                result.push(value);
            }
        }

        return result;
    }

    export function parseStringArray(input: string): string[] {
        let result: string[] = [];
        if (input) {
            let items = input.split(",");
            if (items) {
                let itemsLength = items.length;
                for (let i = 0; i < itemsLength; i++) {
                    let item = $.trim(items[i]);
                    if (item > "") {
                        result.push(item);
                    }
                }
            }
        }
        return result;
    }

    export function stringCapitalize(value: string): string {
        if (!value) {
            return value;
        }

        return value.slice(0, 1).toUpperCase() + value.slice(1);
    }

    export function leftPad(s: string, width: number, char: string) {
        return (s.length >= width) ? s : (new Array(width).join(char) + s).slice(-width);
    }

  

    export function mmToPixels(value: number): number {
        if (!value || isNaN(value)) {
            return 0;
        }

        return Math.round(3.78 * value);
    }

    export function getDevicePixelRatio(): number {
        if (window["devicePixelRatio"]) {   // tslint:disable-line:no-string-literal
            return window.devicePixelRatio;
        } else {
            return 1.0;
        }
    }

    export function getSmoothDevicePixelRatio(): number {
        if (window["devicePixelRatio"]) {   // tslint:disable-line:no-string-literal
            if (window.devicePixelRatio >= 1) {
                return Math.ceil(window.devicePixelRatio);
            } else {
                return window.devicePixelRatio;
            }
        } else {
            return 1.0;
        }
    }


    export function firstDefined<T>(...args: T[]): T | null {
        if (args == null) {
            return null;
        }
        for (let val of args) {
            if (val != null) {
                return val;
            }
        }
        return null;
    }

    export function callOnClickVoidFunction(component: React.Component<{ onClick?: VoidFunction }, any>): void {
        if (component.props.onClick) {
            component.props.onClick();
        }
    }

    export function copyDefinedFields(target: any, source: any): void {
        for (let key of Object.keys(source)) {
            if (source[key] != null) {
                target[key] = source[key];
            }
        }
    }

    export function debounce(func: () => void, wait: number = 100): () => void {
        let h: number;
        return () => {
            clearTimeout(h);
            h = setTimeout(() => func(), wait);
        };
    }

    export function setCookie(name: string, value: string, expirationDays: number = 0): void {
        let expires: string = "";
        if (expirationDays != 0) {
            let d = new Date();
            d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
            expires = ";expires=" + d.toUTCString();
        }
        document.cookie = name + "=" + value + expires + ";path=/";
    }

    export function getCookie(name: string): string {
        let searchName = name + "=";
        let ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(searchName) == 0) {
                return c.substring(searchName.length, c.length);
            }
        }
        return "";
    }

    export function deleteCookie(name: string) {
        setCookie(name, "", -2);
    }

    export function stringReplacer(tpl: string, args: { [key: string]: any }): string {
        return tpl.replace(/\${(\w+)}/g, (_, v) => args[v]);
    }

    export function getPdfUrl(fileId: string): string {
        let url = util.updateQueryStringParameter("common-files/download", "fileId", fileId);
        url = util.updateQueryStringParameter(url, "ts", new Date().getTime().toString());
        return url;
    }
}