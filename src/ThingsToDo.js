import React, { Component } from 'react';

class ThingsToDo extends Component {
  render() {
    const listToDo = this.props.thingsToDo.map(item => {            
      return (
        <li className="list-group-item list-group-item-action" key={item.id}
          >
          <div className="round">
            <label>
              <input type="checkbox" className="filled-in"
                checked={ item.is_checked }
                onChange={ ()=> this.props.checkItem(item.id) }/>
                <span style={
								{ textDecorationLine: item.is_checked ? "line-through" : "" } }>
                {item.value}
                </span>
                <button className="btn" 
                  onClick={()=> this.props.deleteItem(item.id)}>☒</button>
            </label>
          </div>
          <hr/>
        </li>
      )
  	});
  	return(
	  	<ul className="list-group"> {listToDo} </ul>
  	)
  }
}

export default ThingsToDo