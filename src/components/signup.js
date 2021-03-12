import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "Hello World!",
            last_name: "Business",
            email: "empdeveloper123@gmail.com",
            password: "business313"
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    // handleChange() {
    //     this.setState(state => {
    //         first_name: state.first_name
    //         last_name: state.last_name
    //         email: state.email
    //         password: this.state.password
    //     })
    // }
    handleSubmit(){
        console.log("btn clicked")
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }
        axios.post("http://localhost:4000/signup",data )
        .then((res)=>{
            alert(res.data.email)
        })
        .catch((e)=>{

        })
    }
    render() {
        return (
            <>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" onChange={this.handleChange} className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" onChange={this.handleChange} className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={this.handleChange} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={this.handleChange} className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p>
        </>
        )
    }
}

export default Signup
