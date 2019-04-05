namespace ro.demo {

    export interface PageHostPageDetails {
        pageKey?: number;
        pageType?: typeof React.Component;
        pageResult?: any;
        pageParams?: any;
        pageName?: string;
        scrollPosition: number;
    }



    export interface PageHostState {
        pages: PageHostPageDetails[];
        isLocked?: boolean;
        isHeaderOpen?: boolean;
        debugConsoleLines?: string[] | undefined;
        webBroadcastNotification?: string | undefined;
        isMeasuring: boolean;
        // measurables: MeasurableReactComponent[];

    }

    export class PageHost extends React.Component<{}, PageHostState> {
        basePageKey: number = 1;
        scrollPosition: number | null = null;
        measuringTimer: number | null = null;
        addMeasurableTimer: number | null = null;

        lastBodyClientWidth: number = 0;
        lastWindowInnerWidth: number = 0;
        consecutiveResizeCount: number = 0;
        periodicCheckInterval: number | null = null;

        measurables: MeasurableReactComponent[] = [];

        constructor(props: {}) {
            super(props);
            this.state = {
                pages: [],
                isMeasuring: false
            };

            this.periodicCheckInterval = setInterval(() => this.periodicCheckSize(), 200);
        }


        render() {
            let pages: any[] = [];
            for (let i = 0; i < this.state.pages.length; i++) {
                let page = this.state.pages[i];
                let PageType = page.pageType as any;   // tslint:disable-line:variable-name

                let pageStyle: React.CSSProperties = {};
                if (i < this.state.pages.length - 1) {
                    pageStyle = { display: "none" };
                }
                // pageStyle.maxWidth = "768px";
                // pageStyle.margin = "0 auto";

                if (PageType != null) {
                    pages.push(
                        <div key={page.pageKey} className="page" style={pageStyle}>                            
                            <PageType  {... { params: page.pageParams || {}, result: page.pageResult }} />
                        </div>
                    );
                }
            }





            return (
                <div className="page-host" >                 
                    {pages}
                </div>
            );
        }

        windowResizeHandler: VoidFunction = () => {
            if (this.state.isMeasuring && this.measuringTimer != null) {
                clearTimeout(this.measuringTimer);
                this.startMeasureTimeout();
                return;
            }
            this.setState({ isMeasuring: true }, () => {
                this.startMeasureTimeout();
            });
        }

        startMeasureTimeout() {
            this.measuringTimer = setTimeout(() => {
                this.measuringTimer = null;
                for (let measurable of this.measurables) {
                    if (measurable != null) {
                        measurable.measureWidth();
                    }
                }
                this.setState({ isMeasuring: false });
            }, 100);
        }

        componentDidMount() {
            window.addEventListener("scroll", () => {
                this.handleScroll();
            }, false);

            this.windowResizeHandler();
            window.addEventListener("resize", this.windowResizeHandler);
        }

        componentWillUnmount() {

            if (this.periodicCheckInterval != null) {
                clearInterval(this.periodicCheckInterval);
            }

            window.removeEventListener("scroll", () => {
                this.handleScroll();
            }, false);

            window.removeEventListener("resize", this.windowResizeHandler);
        }

        handleScroll() {
            this.scrollPosition = $(document).scrollTop();
            if (this.state.pages != null && this.state.pages.length > 0 && this.state.pages[this.state.pages.length - 1].scrollPosition != null) {
                this.state.pages[this.state.pages.length - 1].scrollPosition = $(document).scrollTop();
            }
        }

        componentDidUpdate() {
            if (this.scrollPosition !== null) {
                $(document).scrollTop(this.scrollPosition);
                this.scrollPosition = null;
            }
            if (this.state.pages != null && this.state.pages.length > 0) {
                $(document).scrollTop(this.state.pages[this.state.pages.length - 1].scrollPosition);
            }
        }

        setPage(pageType: typeof React.Component, pageName: string, pageParams: any, pageResult: any) {
            if (this.scrollPosition === null) {
                this.scrollPosition = 0;
            }

            this.setState({
                pages: [{
                    pageKey: this.basePageKey++, pageType: pageType, pageName: pageName,
                    pageParams: pageParams, pageResult: pageResult, scrollPosition: 0
                }]
            });
        }

        pushPage(pageType: typeof React.Component, pageName: string | undefined, pageParams: any, pageResult: any) {
            if (this.scrollPosition === null) {
                this.scrollPosition = 0;
            }
            let newPages: PageHostPageDetails[] = [];
            if (this.state.pages != null) {
                newPages = this.state.pages.concat([{
                    pageKey: this.basePageKey++, pageType: pageType, pageName: pageName,
                    pageParams: pageParams, pageResult: pageResult, scrollPosition: 0
                }]);
            }
            this.setState({ pages: newPages });
        }

        popPage() {
            let newPages: PageHostPageDetails[] = [];
            if (this.state.pages != null) {
                newPages = this.state.pages.slice(0, this.state.pages.length - 1);
            }
            this.setState({ pages: newPages });
        }

        getPages(): PageHostPageDetails[] {
            if (this.state.pages) {
                return this.state.pages;
            }
            return [];
        }

        setLocked(locked: boolean) {
            this.setState({ isLocked: locked });
        }



        measurableAdded() {
            if (this.addMeasurableTimer != null) {
                clearTimeout(this.addMeasurableTimer);
            }

            this.addMeasurableTimer = setTimeout(() => {
                this.windowResizeHandler();
            }, 1000);

        }

        private periodicCheckSize(): void {

            let bodyClientWidth = document.body.clientWidth;
            let windowInnerWidth = window.innerWidth;

            if (windowInnerWidth == this.lastWindowInnerWidth) {
                if (bodyClientWidth == this.lastBodyClientWidth) {
                    this.consecutiveResizeCount = 0;
                    return;
                } else {
                    if (this.consecutiveResizeCount < 3) {
                        this.consecutiveResizeCount++;
                        this.lastBodyClientWidth = bodyClientWidth;
                        this.lastWindowInnerWidth = windowInnerWidth;
                        this.windowResizeHandler();
                    } else {
                        this.lastBodyClientWidth = bodyClientWidth;
                        this.lastWindowInnerWidth = windowInnerWidth;
                    }
                }
            } else {
                this.consecutiveResizeCount = 0;
                this.lastBodyClientWidth = bodyClientWidth;
                this.lastWindowInnerWidth = windowInnerWidth;
                this.windowResizeHandler();
            }


        }




    }
}