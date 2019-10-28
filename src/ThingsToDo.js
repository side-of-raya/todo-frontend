import React, { Component } from 'react';
import './App.css';
import {sortableContainer, sortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';
// import axios from 'axios';

const SortableItem = sortableElement(({value}) => <li>{value}</li>);

const SortableContainer = sortableContainer(({children}) => {
  return <ul className='list-group'>{children}</ul>;
});
class ThingsToDo extends Component {
  state = {
    readOnly: true,
    itemValue: '',
    // items: [],
    // currentId: 0,
  }

  onBlurHandler = (id, value, e) => {
    if (!e.target.value) {
      e.target.value = this.state.itemValue;
      return
    }
    this.props.editItem({id}, {value});
    this.setState({ readOnly: true })
  }

  onSortEnd = async ({oldIndex, newIndex}) => {
    console.log(oldIndex, newIndex)
    // await this.setState(({items}) => ({
    //   items: arrayMove(items, oldIndex, newIndex),
    // }));
    if (oldIndex !== newIndex)
      this.props.editItem({queue_number: oldIndex}, {queue_number: newIndex})
    //console.log(this.state.items)
  };

  render() {
    const { deleteItem, editItem, thingsToDo } = this.props;
    let value = (item) => {
      return(          
          <input  className='todoitem' id={item.id}
            readOnly={this.state.readOnly}
            onDoubleClick={() => this.setState({readOnly : false})}
            onFocus={(e) => this.setState({ itemValue: e.target.value })}
            onBlur={(e) => this.onBlurHandler(item.id, e.target.value, e)}
            htmlFor={item.id}
            style={ { textDecorationLine: item.is_checked ? "line-through" : "" } }
            defaultValue={item.value}/>
          )
    }
    const items = thingsToDo.map((item) => {
      return(
        <div className="custom-control custom-checkbox"key={item.id}>
          <input type="checkbox" className="custom-control-input" id={item.id}
            checked={item.is_checked}
            onChange={ ()=> editItem({id: item.id}, { is_checked: !item.is_checked }) } />
          <label className="custom-control-label" htmlFor={item.id} />  
      <SortableItem className="list-group-item" key={item.id} index={item.queue_number} value={value(item)}/>
      <button className="close" htmlFor={item.id} onClick={()=> deleteItem(item.id)}/>
        </div>
      )
  	});
  	return(
	  	<SortableContainer onSortEnd={this.onSortEnd} className="list-group">
        {items}
    </SortableContainer>
  	)
  }
}

export default ThingsToDo


/*return (
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
      */