import React from 'react';
import VK from 'vk-openapi';
import {Layout, Typography, Image} from 'antd';

import './App.css';

const {Header, Content} = Layout;
const {Text} = Typography;

const App = () => {
    const [authState, setAuthState] = React.useState(false);
    const [load, setLoad] = React.useState(true);
    const [fail, setFail] = React.useState(false);
    const [token, setToken] = React.useState('');

    React.useEffect(() => {
        VK.init({
            apiId: 8024402,
        });
    }, []);

    React.useEffect(() => {
        VK.Auth.getLoginStatus(r => {
            if(r.session){
                setFail(false);
                setAuthState(true);
                setLoad(false);
                setToken(r.session.sid);
            }
            else{
                setAuthState(false);
                setLoad(false);
            }
        });
    }, []);

    const auth = async () => {
        await VK.Auth.login(r => {
            if(r.session){
                setFail(false);
                setAuthState(true);
                setLoad(false);
                setToken(r.session.sid);
            }
            else{
                setAuthState(false);
                setFail(true);
                setLoad(false);
            }
        }, 1 + 2 + 1024 + 8192 + 65536 + 262144 + 524288);
    }

    const logout = async () => {
        await VK.Auth.logout(() => {
            setAuthState(false);
        });
    }

    return (
        <header className='header'>
            <div className='container'>
                <div className='header__inner w100 df aic jcsb'>
                    
                </div>
            </div>
        </header>
    );
}

export default App;