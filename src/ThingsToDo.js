import React, { Component } from 'react';
import './App.css';

class ThingsToDo extends Component {
  state = {
    readOnly: true
  }
  editItem = (id) => {
    this.setState({readOnly : true}, this.props.editItem(id, this.newToDo.value));
  }
  render() {
    const listToDo = this.props.thingsToDo.map(item => {            
      return (
        <li className="list-group-item" key={item.id}>
          <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id={item.id}
                checked={item.is_checked} onChange={ ()=> this.props.editItem(item.id) }/>
          <label className="custom-control-label" htmlFor={item.id} />            
          <input  className='i' ref={ref => this.newToDo = ref}
            readOnly={this.state.readOnly}
            onDoubleClick={() => this.setState({readOnly : false})}
            onBlur={() => this.editItem(item.id)}
            htmlFor={item.id} 
            style={ { textDecorationLine: item.is_checked ? "line-through" : "" } }
            defaultValue={item.value}></input>
              
          <button className="close" htmlFor={item.id} onClick={()=> this.props.deleteItem(item.id)}></button>
          </div>
          
        </li>
      )
  	});
  	return(
	  	<ul className='list-group'> {listToDo} </ul>
  	)
  }
}

export default ThingsToDo