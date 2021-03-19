import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export class Navigation extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to={"/login"}>MERN STACK</Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                            <Link className="nav-link" to={"/login"}>Login</Link>
                            </li>
                            <li className="nav-item">
                            <Link className="nav-link" to={"/register"}>Sign up</Link>
                            </li>
                        </ul>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}

export default Navigation
