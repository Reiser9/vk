import React from 'react';
import Auth from './Components/Auth/Auth.jsx';
import VK from 'vk-openapi';
import {Routes, Route} from 'react-router-dom';

import Profile from './Components/Profile/Profile.jsx';
import Main from './Components/Main/Main.jsx';
import Status from './Components/Status/Status.jsx';
import Friends from './Components/Friends/Friends.jsx';
import Groups from './Components/Groups/Groups.jsx';
import Wall from './Components/Wall/Wall.jsx';

import './App.css';

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
        <div className="content">
            <div className="container">
                <div className="content__inner">
                    <Auth authState={authState} fail={fail} load={load} auth={auth} />

                    <Routes>
                        <Route exact path="/" element={<Main />} />
                        <Route exact path="/profile" element={<Profile load={load} logout={logout} authState={authState} />} />
                        <Route exact path="/status" element={<Status load={load} authState={authState} />} />
                        <Route exact path="/friends" element={<Friends load={load} authState={authState} />} />
                        <Route exact path="/wall" element={<Wall load={load} authState={authState} />} />
                        <Route exact path="/groups" element={<Groups load={load} authState={authState} />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
}

export default App;