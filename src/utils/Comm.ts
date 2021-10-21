export class  Comm {
    

    static async getAPIData(action: string, params: string = ''): Promise<any> {
        let url = process.env.REACT_APP_API + action +"?" + params;
        let headers = new Headers();
        // let token = localStorage.getItem("hpcc_data_browser_ui_token")
        // if (!token) {
        //     token =  "Not Created";
        // }
        headers.set('Content-Type', 'application/json');
        // headers.set('Authorization', 'Bearer ' + token);

        const res = await fetch(url, { method: 'GET', headers });
        const jsonResult = await res.json();
        return jsonResult;
    }
    static async postAPIData(action: string, params: any = {}): Promise<any> {
        let url = process.env.REACT_APP_API +  action;
        let headers = new Headers();
        // let token = localStorage.getItem("hpcc_data_browser_ui_token")
        // if (!token) {
        //     token =  "Not Created";
        // }
        headers.set('Content-Type', 'application/json');
        // headers.set('Authorization', 'Bearer ' + token);

        const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(params) });
        const jsonResult = await res.json();
        return jsonResult;
    }
}