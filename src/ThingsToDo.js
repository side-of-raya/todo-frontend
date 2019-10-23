import React, { Component } from 'react';
import './App.css';

class ThingsToDo extends Component {
  state = {
    readOnly: true,
    itemValue: '',
  }

  onBlurHandler = (id, value, e) => {
    if (!e.target.value) {
      e.target.value = this.state.itemValue;
      return
    }
    this.props.editItem(id, {value});
    this.setState({ readOnly: true })
  }

  render() {
    const { deleteItem, editItem, thingsToDo } = this.props;
    const listToDo = thingsToDo.map(item => {
      return (
        <li className="list-group-item" key={item.id}>
          <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id={item.id}
            checked={item.is_checked}
            onChange={ ()=> editItem(item.id, { is_checked: !item.is_checked }) }/>
          <label className="custom-control-label" htmlFor={item.id} />            
          <input  className='todoitem' id={item.id}
            readOnly={this.state.readOnly}
            onDoubleClick={() => this.setState({readOnly : false})}
            onFocus={(e) => this.setState({ itemValue: e.target.value })}
            onBlur={(e) => this.onBlurHandler(item.id, e.target.value, e)}
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
