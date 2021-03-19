import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './routes/route';
import React from 'react'
import Cookies from 'js-cookie'
import {Router} from 'react-router'

import AuthApi from './middleware/authapi';

function App() {
  const [auth, setAuth] = React.useState(false);

    const readCookie = () => {
        const user = Cookies.get("user");
        if(user) {
            setAuth(true);
        }
    }
    React.useEffect(() => {
        readCookie();
    }, [])
  return (   
        <div className="App">
          <AuthApi.Provider value = {{auth, setAuth}}>
                <Router>
                    <Routes />
                </Router>
            </AuthApi.Provider>
        </div> 
  );
}

export default App;
