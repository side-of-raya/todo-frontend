import React, { Component } from 'react';
import './App.css';

class ThingsToDo extends Component {
  state = {
    readOnly: true,
    itemValue: '',
  }
  render() {
    const listToDo = this.props.thingsToDo.map(item => {   
      const { editItem, deleteItem } = this.props;         
      return (
        <li className="list-group-item" key={item.id}>
          <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id={item.id}
            checked={item.is_checked}
            onChange={ ()=> editItem(item.id, {is_checked: !item.is_checked}) }/>
          <label className="custom-control-label" htmlFor={item.id} />            
          <input  className='todoitem'
            readOnly={this.state.readOnly}
            onDoubleClick={() => this.setState({readOnly : false})}
            onChange={(e) => this.setState({ itemValue: e.target.value })}
            onBlur={() => editItem(item.id, {value: this.state.itemValue}) }
            htmlFor={item.id} 
            style={ { textDecorationLine: item.is_checked ? "line-through" : "" } }
            defaultValue={item.value}/>
          <button className="close" htmlFor={item.id} onClick={()=> deleteItem(item.id)}/>
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

//this.props.editItem(item.id, {value: this.newToDo.value})