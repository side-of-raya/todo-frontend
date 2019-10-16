import React, { Component } from 'react';
import axios from 'axios';
import App from './App';
import ReactDOM from 'react-dom';
import './App.css';


class Login extends Component {
    state = {
        error: ''
    }
    login = (e) => {
        e.preventDefault();
        const body = {
            email: e.target[0].value,
            password: e.target[1].value,
        }
        axios.post("http://localhost:3001/users/login", body)
            .then((res) => {
                if (res.status === 200) {
                    localStorage.setItem('authorization', res.data.authorization);
                    ReactDOM.render(<App />, document.getElementById('root'));
                } else {
                    this.setState({ error: "wrong login/pass :c"})
                }
            })
                
    }
    render() {
        return(
            <div className='login'>
                <label>{this.state.error}</label>
            <form onSubmit={this.login.bind()} className="">
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"/>
            </div>
            <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            </div>
        );
    }
}

export default Login