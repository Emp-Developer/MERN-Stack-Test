import React from 'react'
import Cookies from 'js-cookie'

const AuthApi = React.createContext();

const Dashboard = () => {
    const Auth = React.useContext(AuthApi)
    const handleOnClick = () => {
        Auth.setAuth(false);
        Cookies.remove("user");
    }
    return(
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleOnClick}>Logout</button>
        </div>
    )
}

export default Dashboard
