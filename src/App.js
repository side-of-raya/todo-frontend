import React, { Component } from 'react';
import ThingsToDo from "./ThingsToDo";
import axios from 'axios';
import Login from './Login'
import ReactDOM from 'react-dom';

class App extends Component {
  state = {
    thingsToDo: [],
    condition: 1,
    logged: false,
    is_checked: false,
  }

  componentDidMount = () => {
    this.getItems();
  }
  
  getItems = () => {
    axios.get(process.env.REACT_APP_URL + '/todos', {
      headers: {authorization: localStorage.getItem('authorization')}
     })
    .then(res => {
        this.setState({thingsToDo : res.data})
    })
    .catch ((error) => {
      console.log(error)
        if( error.response.status === 401)
        ReactDOM.render(<Login />, document.getElementById('root'));
    })
  }

  addItem = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const body = {
        value: e.target.value,
      };
      axios.post(process.env.REACT_APP_URL + '/todos', body, {
        headers: {authorization: localStorage.getItem('authorization')}
      })
      .then( (res) => this.getItems())
      .catch((error) => { console.log(error) });
      e.target.value = ""
    };
  }

  deleteItem = (body) => {
    body = {id: body}
    axios.delete(process.env.REACT_APP_URL + '/todo/' + body.id, {
      headers: {authorization: localStorage.getItem('authorization')}
    })
      .then( (res) => this.getItems())
      .catch(error => console.log(error));
  }

  deleteDoneItem = () => {
    axios.delete(process.env.REACT_APP_URL + '/todos', {
      headers: {authorization: localStorage.getItem('authorization')}
    })
    .then( (res) => this.getItems())
  }

  editItem = (id, value) => {
    console.log(value)
    const body = { id, args: { value } }
    axios.patch(process.env.REACT_APP_URL + '/todos', body, {
      headers: {authorization: localStorage.getItem('authorization')}
    })
    .then( (res) => this.getItems())
  }

  logout = () => {
    axios.post(process.env.REACT_APP_URL + '/users/logout',{
      headers: {authorization: localStorage.getItem('authorization')}
    })
    localStorage.removeItem('authorization');
    ReactDOM.render(<Login />, document.getElementById('root'));
  }

  render() {
    const { thingsToDo, condition } = this.state;
    let currentToDo;
    switch (condition) {
      default: currentToDo = thingsToDo
        break
      case 2: const helpArray = thingsToDo.filter(item => {
        return !item.is_checked
      })
        currentToDo = helpArray
        break
      case 3: const res = thingsToDo.filter(item => {
        return item.is_checked
      })
        currentToDo = res
        break
    }
     return (
      <div className="container">
        <div className="row">
          <div className="col">
            <div className='stick'>
              <div className='header'>
            <h1 style={{textAlign: 'center'}}>todos</h1>
            <input type="text" className='todo-input' onKeyPress={this.addItem.bind(this)}
              placeholder="What needs to be done?" />
            <br />
            <div className='flex'>
            <label className="btn-sm">{currentToDo.length} to do </label>
            <div className="btn-group btn-group-toggle btn-group-sm" data-toggle="buttons">
              <label className="btn btn-secondary active btn-light"
                onClick={() => this.setState({ condition: 1 })}>All
                <input type="radio"name="options" id="option1"/>
              </label>
              <label className="btn btn-secondary btn-light"
                onClick={() => this.setState({ condition: 2 })}>Active
                <input type="radio"name="options" id="option2"/>
              </label>
              <label className="btn btn-secondary btn-light"
                onClick={() => this.setState({ condition: 3 })}>Completed
                <input type="radio"name="options" id="option3"/>
              </label>
              </div>
              <button className="btn btn-secondary btn-sm btn-light" onClick={this.deleteDoneItem}>Clear</button>
              </div>
            </div>
            <div className='list'>
            <ThingsToDo thingsToDo={currentToDo}
              deleteItem={this.deleteItem} editItem={this.editItem} />
              </div>
            </div>
          </div>
        </div>
        <button className='btn btn-secondary btn-sm btn-light logout' onClick={this.logout}>logout</button>
      </div>
    );
  }
}

export default App;