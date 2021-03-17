import React, { Component } from 'react'
import axios from 'axios'

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);   
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);     
    }
    // handleChange(e) {
    //     this.setState({ 
    //         [e.target.state]: e.target.value            
    //     });
    // }
    handleFirstnameChange(e) {
        this.setState({ 
            first_name: e.target.value            
        });
    }
    handleLastnameChange(e) {
        this.setState({ 
            last_name: e.target.value            
        });
    }
    handleEmailChange(e) {
        this.setState({ 
            email: e.target.value            
        });
    }
    handlePasswordChange(e) {
        this.setState({ 
            password: e.target.value            
        });
    }
    
    handleSubmit(e){
        e.preventDefault();
        console.log("btn clicked")
        const data = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }
        axios.post("http://localhost:4000/api/users/signup",data )
        .then((res)=>{
            window.location.href = "/";
            window.alert(data.email);
        })
        .catch((e)=>{
            window.alert("Error")
        })
    }
    render() {
        return (
            <form>
                <h3>Sign Up</h3>

                <div className="form-group">
                    <label>First name</label>
                    <input type="text" onChange={this.handleFirstnameChange} defaultValue={this.state.first_name} className="form-control" placeholder="First name" />
                </div>

                <div className="form-group">
                    <label>Last name</label>
                    <input type="text" onChange={this.handleLastnameChange} defaultValue={this.state.last_name} className="form-control" placeholder="Last name" />
                </div>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" onChange={this.handleEmailChange} defaultValue={this.state.email} className="form-control" placeholder="Enter email" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" onChange={this.handlePasswordChange} defaultValue={this.state.password} className="form-control" placeholder="Enter password" />
                </div>

                <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-block">Sign Up</button>
                <p className="forgot-password text-right">
                    Already registered <a href="/login">sign in?</a>
                </p>
            </form>
        )
    }
}

export default Signup
