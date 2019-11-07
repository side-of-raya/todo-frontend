import React, { Component } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

class ThingsToDo extends Component {

  state = {
    editable: false,
    itemValue: '',
    disabled: true,
  }

  onBlurHandler = (id, value, e) => {
    e.persist();
    if (!e.target.textContent) {
      e.target.textContent = this.state.itemValue;
      return;
    }
    if (e.target.textContent !== this.state.itemValue)
      this.props.editItem({id}, {value});
    this.setState({ editable: false })
  }

  onDragEnd = async (result) => {
    if (!result.destination) {
      return;
    }
    const oldIndex = result.source.index;
    const newIndex = result.destination.index;
    const helpArray = [...this.props.thingsToDo]
    let queue_number;
    if (oldIndex > newIndex)
      if (helpArray[newIndex-1])
        queue_number = (helpArray[newIndex].queue_number + helpArray[newIndex-1].queue_number)/2
      else queue_number = helpArray[newIndex].queue_number - 5000
    else
      if (helpArray[newIndex+1])
        queue_number = (helpArray[newIndex].queue_number + helpArray[newIndex+1].queue_number)
      else queue_number = helpArray[newIndex].queue_number + 5000;
    if (oldIndex !== newIndex)
      this.props.editItem({queue_number: helpArray[oldIndex].queue_number}, {queue_number}, oldIndex, newIndex)
  };

  render() {
    const { deleteItem, editItem, thingsToDo } = this.props;
  	return(
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {thingsToDo.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div className="custom-control custom-checkbox">
                      <input type="checkbox" className="custom-control-input" id={item.id}
                        checked={item.is_checked}
                        onChange={ ()=> editItem({id: item.id}, { is_checked: !item.is_checked }) } />
                      <label className="custom-control-label" htmlFor={item.id}/>  
                      <label className='todoitem' id={item.id}
                        contentEditable={this.state.editable}
                        onDoubleClick={(e) => {this.setState({editable : true});
                         e.target.focus()
                        }}
                        onFocus={(e) => this.setState({ itemValue: e.target.textContent })}
                        onBlur={(e) => this.onBlurHandler(item.id, e.target.textContent, e)}
                        style={ { textDecorationLine: item.is_checked ? "line-through" : "" } }
                        >{item.value}</label>
                      <button className="close" htmlFor={item.id} onClick={()=> deleteItem(item.id)}/>
                    </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

export default ThingsToDo

const getItems = count =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k}`,
    content: `item ${k}`
  }));

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  // padding: grid * 2,
  // margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  // background: isDragging ? "lightgreen" : "grey",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = isDraggingOver => ({
  // background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  // width: 250
});
