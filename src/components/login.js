import React, { useState, Component } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

const AuthApi = React.createContext();


const Login = () => {
    const Auth = React.useContext(AuthApi);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
   
    const handleSubmit = (e) => {
        e.preventDefault();
        Auth.setAuth(true)
        Cookies.set("user", "loginTrue")
        
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post("http://localhost:4000/api/users/login", data)
            .then((res) => {
                console.log(data.email);
                window.location.href = "/"
            })
            .catch((e) => {

            })
    }
    
        return (
            <>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={e => setPassword(e.target.value)} className="form-control" placeholder="Enter password" />
                </div>

                <div className="form-group">
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div>

                <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">Sign In</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </>
        )
   
}

export default Login
