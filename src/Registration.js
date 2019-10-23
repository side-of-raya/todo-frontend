import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Login from './Login';
import './App.css';

class Registration extends Component {
    reg = (e) => {
        const regexp = /\.+[a-zA-Z]+$/;
        e.preventDefault();
        const matches = e.target[0].value.match(regexp)|| [];
        if (matches.toString().length > 4)
            alert ('There cannot be more than 3 symbols after dot in email')
        const body = {
            email: e.target[0].value,
            name: e.target[1].value,
            password: e.target[2].value,
        }
        axios.post(process.env.REACT_APP_URL + '/users', body)
        .then((res) => {
            if (res.status === 200) {
                ReactDOM.render(<Login />, document.getElementById('root'));
            }
        })
        .catch ((error) => {
            console.log(error)
            if (error.response.status === 403) alert ('Email is already used')
        })
    }
    render() {
        return(
            <div className='login'>
            <form onSubmit={this.reg.bind()}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Your name</label>
                <input type="text" className="form-control" placeholder="Name"/>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" required={true} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div className='flex'>
                <button type="submit" className="btn btn-primary">Submit</button>
                <a className='btn btn-light btn-sm' href="/Login">Back to Login</a>
            </div>
            </form>
            </div>
        );
    }
}

export default Registration