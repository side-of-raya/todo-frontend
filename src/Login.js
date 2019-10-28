import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  state = {
    isLogged: false,
    error: '',
    display: 'none',
  }

  login = async (e) => {
    try{
      e.preventDefault();
      const body = {
        email: e.target[0].value,
        password: e.target[1].value,
      }
      const res = await axios.post(process.env.REACT_APP_URL + '/users/login', body)
      if (res.status === 200) {
        localStorage.setItem('authorization', res.data.authorization);
        this.setState({ isLogged: true })          
      }
    } catch (error) {
      if (error.response.status === 401) {
        this.setState({ error: error.response.data, display: '' });
        return
      }
      console.log(error)
    }
  }

  render() {
    if (this.state.isLogged) return <Redirect to={'/'}/>
    return(
      <div className='login'>   
      <form onSubmit={this.login.bind()}>
      <div className="form-group alert-div">
        <label htmlFor="exampleInputEmail1">Email address</label>
        <div className="alert alert-danger" style={ { display : this.state.display } } role="alert">
        {this.state.error}
        </div>
        <input type="email" required={true} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password" required={true} className="form-control" id="exampleInputPassword1" placeholder="Password"/>
      </div>      
      <div className='flex'>
      <button type="submit" className="btn btn-primary">Let me in</button>
      <a className='btn btn-primary' href="/Registration">Have no account?</a>
      </div>  
      </form>
      </div>
    );
  }
}

export default Login