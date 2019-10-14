import React, { Component } from 'react';
import ThingsToDo from "./ThingsToDo";
import axios from 'axios';
import Login from './Login'
import ReactDOM from 'react-dom';

const url = 'http://localhost:3001'

class App extends Component {

  state = {
    thingsToDo: [],
    condition: 1,
    logged: false
  }

  componentDidMount = () => {
    this.getItems();
  }
  
  getItems = () => {
    axios.get(url + '/todos', {
      headers: {authorization: localStorage.getItem('authorization')}
    }).then(res => {
        this.setState({thingsToDo : res.data})
      })
      .catch((error) => { console.log(error) })
  }

  addItem = (e) => {
    if (e.key === "Enter" && e.target.value) {
      const body = {
        value: e.target.value,
      };
      axios.post(url + '/todos', body, {
        headers: {authorization: localStorage.getItem('authorization')}
      })
      .then( (res) => this.getItems())
      .catch((error) => { console.log(error) });
      e.target.value = ""
    };
  }

  deleteItem = (body) => {
    body = {id: body}
    axios.delete(url + '/todo/' + body.id, {
      headers: {authorization: localStorage.getItem('authorization')}
    })
      .then( (res) => this.getItems())
      .catch(error => console.log(error));
  }

  deleteDoneItem = () => {
    axios.delete(url + '/todos', {
      headers: {authorization: localStorage.getItem('authorization')}
    })
    .then( (res) => this.getItems())
  }

  checkItem = (id) => {
    const body = { id }
    axios.patch(url + '/todos', body, {
      headers: {authorization: localStorage.getItem('authorization')}
    })
    .then( (res) => this.getItems())
  }
  logout = () => {
    axios.post(url + '/users/logout',{
      headers: {authorization: localStorage.getItem('authorization')}
    })
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
        <h1>todos</h1>
        <div className="row">
          <div className="col">
            <input type="text" onKeyPress={this.addItem.bind(this)}
              placeholder="What needs to be done?" />
            <br />
            <label className="">{currentToDo.length} to do </label>
            <div className="btn-group btn-group-toggle" data-toggle="buttons">
              <label className="btn btn-secondary active btn-light"
                onClick={() => this.setState({ condition: 1 })}>All
                <input type="radio" />
              </label>
              <label className="btn btn-secondary btn-light"
                onClick={() => this.setState({ condition: 2 })}>Active
                <input type="radio" />
              </label>
              <label className="btn btn-secondary btn-light"
                onClick={() => this.setState({ condition: 3 })}>Completed
                <input type="radio" />
              </label>
            </div>
            <button className="btn btn-light" onClick={this.deleteDoneItem}>Clear completed</button>
            <ThingsToDo thingsToDo={currentToDo}
              deleteItem={this.deleteItem} checkItem={this.checkItem} />
          </div>
        </div>
      </div>
    );
  }
}


export default App;