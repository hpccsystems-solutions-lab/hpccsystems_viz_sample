import React from "react";
import "./App.css";
// Uncomment the following section if you want to use autentication
// import {Login} from "./pages/Login";
// import useToken from "./hooks/useToken";
import {Main} from "./pages/Main";
import {Layout} from "antd";

const {Header} = Layout;

function App() {

    //Uncomment the following section if you want to use autentication

    // const {token, setToken} = useToken();

    // if (!token) {
    //     return <Login setToken={setToken}/>
    // } else {
        return (
            <Layout style={{minHeight: "100vh"}}>
                <Header>
                    <div style={{fontSize: 18, color: "white"}}>HPCC Systems - Visualization Sample</div>
                   
                </Header>
                <Main/>
            </Layout>
        )
    // }

}

export default App;
