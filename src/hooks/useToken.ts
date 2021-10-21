import {useState} from 'react';

export default function useToken() {
    const getToken = () => {
        return localStorage.getItem('hpcc_data_browser_ui_token');
    };

    const [token, setToken] = useState(getToken());

    const saveToken = (userToken: string | null) => {
        if (userToken) {
            localStorage.setItem('hpcc_data_browser_ui_token', userToken);
        } else {
            localStorage.removeItem('hpcc_data_browser_ui_token');
        }
        setToken(userToken);
    };

    return {
        setToken: saveToken,
        token
    }
}