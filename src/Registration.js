import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import Login from './Login';
import './App.css';

class Registration extends Component {
    reg = (e) => {
        e.preventDefault();
        const body = {
            email: e.target[0].value,
            name: e.target[1].value,
            password: e.target[2].value,
        }
        console.log(process.env.REACT_APP_URL)
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
            <div>
               <a className='btn' href="/Login">Login</a>
            </div>
            <form onSubmit={this.reg.bind()} className="">
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
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        );
    }
}

export default Registration