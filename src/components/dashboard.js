import React, { Component } from 'react'
import axios from 'axios';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }
    componentDidMount() {
        this.getUsers = setInterval(() => {
            axios
                .get('http://localhost:4000/api/users/register')
                .then((res) => {
                    this.setState({
                        users: res.data,
                    })
                }).catch((err) => {
                    
                });
        }, 500);
    }
    componentWillUnmount() {
        clearInterval(this.getUsers)
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}

export default Dashboard

