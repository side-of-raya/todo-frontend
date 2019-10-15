import React, { Component } from 'react';
import './App.css';

class ThingsToDo extends Component {
  render() {
    const listToDo = this.props.thingsToDo.map(item => {            
      return (
        <li className="list-group-item" key={item.id}>
          <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id="customCheck1"
                checked={item.is_checked} onChange={ ()=> this.props.checkItem(item.id) }/>
          <label className="custom-control-label" htmlFor="customCheck1" 
								style={ { textDecorationLine: item.is_checked ? "line-through" : "" } }>
            
            <span>{item.value}</span>
            
          </label>
          <button className="close" htmlFor="customCheck1" onClick={()=> this.props.deleteItem(item.id)}></button>
          </div>
          
        </li>
      )
  	});
  	return(
	  	<ul className='list-group todo'> {listToDo} </ul>
  	)
  }
}

export default ThingsToDo

//list-group-item list-group-item-action