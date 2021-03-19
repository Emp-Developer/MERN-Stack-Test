import React, { Component } from 'react'
import axios from 'axios';

export class Update extends Component {
    constructor(props) {
        super(props);
        this.state = {
            first_name: "",
            last_name: "",
            email: "",
            password: "",           
        }
        this.handleFirstnameChange = this.handleFirstnameChange.bind(this);
        this.handleLastnameChange = this.handleLastnameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    componentDidMount = () => {
        this.getUser();
    }

    getUser = () => {
        axios.get('http://localhost:4000/api/users/api')
            .then((response) => {
                const data = response.data;
                console.log('Data has been received!!');
                this.setState({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    password: data.password                    
                })
            })
            .catch(() => {

            })
    }

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

    // handleChange = (event) => {
    //     const target = event.target;
    //     const name = target.name;
    //     const value = target.value;

    //     this.setState({
    //         [name]: value
    //     });
    // }

    handleChange = ({ target }) => {
        const {name, value} = target;
        this.setState({
            [name]: value
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();

        const payload = {
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }

        axios({
            url: 'http://localhost:4000/api/users/save',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log("");
                window.location.href('/');
            })
            .catch(() => {
                console.log();
            });
    }
      
    render() {
        return (
            <div>
                <form>
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>First name</label>
                        <input type="text" onChange={this.handleFirstnameChange} defaultValue={this.state.first_name} className="form-control" placeholder="First name" />
                    </div>

                    <div className="form-group">
                        <label>Last name</label>
                        <input 
                            type="text"
                            name="last_name"
                            onChange={this.handleLastnameChange} 
                            defaultValue={this.state.last_name} 
                            className="form-control" 
                            placeholder="Last name" />
                    </div>

                    <div className="form-group">
                        <label>Email address</label>
                        <input type="email" onChange={this.handleEmailChange} defaultValue={this.state.email} className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={this.handlePasswordChange} defaultValue={this.state.password} className="form-control" placeholder="Enter password" />
                    </div>

                    <button type="submit" onClick={this.handleSubmit} className="btn btn-primary btn-block">Save</button>
                    <p className="forgot-password text-right">
                        Already registered <a href="/login">sign in?</a>
                    </p>
                </form>                
            </div>            
        )
    }
}

export default Update;
