import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class ThingsToDo extends Component {
  state = {
    readOnly: true,
    itemValue: '',
  }

  editItem = async (id, args, e) => {
    try{
      e.persist();
      if (!args.value && typeof is_checked === 'undefined') 
        e.target.value = this.state.itemValue;

      const body = { id, args }
      const res = await axios.patch(process.env.REACT_APP_URL + '/todo', body, {
        headers: {authorization: localStorage.getItem('authorization')}
      })
      console.log(e.target)
      console.log(res)
      console.log()
      console.log()
      console.log()
      e.target = res.data;
      e.target.checked = res.data.is_checked
      this.setState({ readOnly: true });
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    const listToDo = this.props.thingsToDo.map(item => {   
      const { deleteItem } = this.props;
      return (
        <li className="list-group-item" key={item.id}>
          <div className="custom-control custom-checkbox">
          <input type="checkbox" className="custom-control-input" id={item.id}
            checked={item.is_checked}
            onChange={ (e)=> this.editItem(item.id, { is_checked: !item.is_checked }, e) }/>
          <label className="custom-control-label" htmlFor={item.id} />            
          <input  className='todoitem' id={item.id}
            readOnly={this.state.readOnly}
            onDoubleClick={() => this.setState({readOnly : false})}
            onFocus={(e) => this.setState({ itemValue: e.target.value })}
            onBlur={(e) => this.editItem(item.id, {value: e.target.value}, e) }
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