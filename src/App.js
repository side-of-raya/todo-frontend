import React, { Component } from 'react';
import ThingsToDo from "./ThingsToDo";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

axios.defaults.headers.common['authorization'] = localStorage.getItem('authorization');

class App extends Component {
  state = {
    thingsToDo: [],
    condition: 1,
    isLogged: true,
  }

  componentDidMount = () => {
    this.getItems();
  }
  
  getItems = async () => {
    try{
      const res = await axios.get(process.env.REACT_APP_URL + '/todos')
      this.setState({thingsToDo : res.data})
    } catch (error) {
      console.log(error)
      if( error.response.status === 401) this.setState({ isLogged: false })
    }
  }

  addItem = async (e) => {
    try {
      e.persist();
      if (e.key === "Enter" && e.target.value) {
        const body = {
          value: e.target.value,
        };
        const res = await axios.post(process.env.REACT_APP_URL + '/todo', body)
        const helpArray = [...this.state.thingsToDo]
        helpArray.push(res.data);
        this.setState({ thingsToDo: helpArray });
        e.target.value = ""
      }
    } catch(error) {
      console.log(error)
    }    
  }

  editItem = async (id, args) => {
    try{
      const body = { id, args }
      const res = await axios.patch(process.env.REACT_APP_URL + '/todo', body )
      const helpArray = [...this.state.thingsToDo]
      const x = helpArray.findIndex(item => item.id === id);
      helpArray[x] = res.data;
      this.setState({ thingsToDo: helpArray });
    } catch (error) {
      console.log(error)
    }
  }

  deleteItem = async (body) => {
    try{
      body = {id: body}
      await axios.delete(process.env.REACT_APP_URL + '/todo/' + body.id )
      const helpArray = await this.state.thingsToDo.filter(item => item.id !== body.id);
      this.setState({ thingsToDo: helpArray })
    } catch (error) {
      console.log(error)
    }
  }

  deleteDoneItem = async () => {
    try{
      await axios.delete(process.env.REACT_APP_URL + '/todos' )
      const helpArray = this.state.thingsToDo.filter(item => !item.is_checked);
      this.setState({ thingsToDo: helpArray })
    } catch (error) {
      console.log(error)
    }
  }

  logout = () => {
    localStorage.removeItem('authorization');
    this.setState({ isLogged: false })
  }

  render() {
    if (!this.state.isLogged) return <Redirect to={'login'}/>
    // this.getItems();
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
              <button className="btn btn-secondary btn-sm btn-light"
                onClick={this.deleteDoneItem}>Clear</button>
              </div>
            </div>
            <div className='list'>
            <ThingsToDo thingsToDo={currentToDo} deleteItem={this.deleteItem} editItem={this.editItem}/>
              </div>
            </div>
          </div>
        </div>
        <button className='btn btn-secondary btn-sm btn-light logout'
          onClick={this.logout}>logout</button>
      </div>
    );
  }
}

export default App;