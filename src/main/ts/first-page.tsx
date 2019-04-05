namespace ro.demo {

    export interface SearchParams {
        substring: string;
    }

    export interface SearchResult {
        protests: Protest[];
    }

    export interface FirstPageParam {
        somestring: string;
    }

    export interface FirstPageResult {
        somestring: string;
    }

    export interface FirstPageState {
        hasErrors: boolean;
        isLoggedIn: boolean;
    }

    export interface ProtestParams {

    }

    export interface ProtestResult {

    }

    @page("first", "first/load")
    export class FirstPage extends React.Component<PageProps<FirstPageParam, FirstPageResult>, FirstPageState> {

        // private searchRest: RestFunction<SearchParams, SearchResult> = defineRest("first/search");

        // private searchTextInput: SearchInput | null = null;

        // constructor(props: PageProps<FirstPageParam, FirstPageResult>) {
        //     super(props);
        // }

        //     // daca nu lucrezi cu ce primesti initial de pe server, adaugi in state ca
        //     // sa apara ca rezultat 
        // }

        render() {
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

            return (
                <div>
                    <h1>Aici este {this.props.result.somestring}</h1>
                </div>
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
        }

        // private onClickSearch() {

        //     this.setState({
        //         hasErrors: false,
        //         protests: []
        //     })


        //     if (this.searchTextInput) {

        //         this.searchRest({
        //             substring: this.searchTextInput.getValue(),
        //         }, (result) => {
        //             if (0 == result.protests.length) {
        //                 this.setState({ hasErrors: true });
        //             } else {
        //                 this.setState({ hasErrors: false, protests: result.protests });
        //             }
        //         })
        //     }
        // }

        // private onClickAddProtest() {
        //     if (ro.demo.userId != 0) {
        //         navigatePage(ProtestRegisterPage);
        //     } else {
        //         this.setState({
        //             isLoggedIn: false
        //         })
        //     }
        // }

        // private onClickShowProtest(protestId: number) {
        //     navigatePage(ProtestDetails, { protestId: protestId });
        // }

    }
}