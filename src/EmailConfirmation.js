import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { withRouter } from 'react-router-dom';
const queryString = require('query-string');

class EmailConfirmation extends Component {
  state = {
    message: '',
  }

  componentDidMount = () => {
    this.active();
  }

  active = async () => {
  const query = queryString.parse(this.props.location.search);
  const res = await axios.get(process.env.REACT_APP_URL + '/user/active/?token=' + query.token);
  if (res.status === 200) this.setState({ isActive: true, message: 'Welcome to todos!' })
  else this.setState({ message: 'Something s went wrong :/'})
  }

  render() {
    return(
      <div className='login' style={{display: 'flex', justifyContent:'center', flexDirection: 'column'}}>
        <label>{this.state.message}</label>
        <br/>
        <a className='btn btn-primary btn-light' href="/Login">Go to list</a>
      </div>
    );
  }
}

export default withRouter(EmailConfirmation)