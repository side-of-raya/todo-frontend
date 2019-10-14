import React, { Component } from 'react';
import axios from 'axios';
import App from './App';
import ReactDOM from 'react-dom';

class Login extends Component {
    state = {
        error: ""
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
            <form onSubmit={this.login.bind()}>
                <p>{this.state.error}</p>
                <input type="text">
                </input>
                <br/>
                <input type="text">
                </input>
                <br/>
                <input type="submit"></input>
            </form>
        );
    }
}

export default Login