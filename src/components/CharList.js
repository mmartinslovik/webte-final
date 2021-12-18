import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import LogoForm from './LogoForm';

// fake data generator

const generateRandomChar = (charsLen) => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    return { 
        'id': `char-${charsLen}`, 'content': characters.charAt(Math.floor(Math.random() * characters.length)) 
    }
}

const shuffle = (strArr) => {
    strArr.sort(function () {
        return 0.5 - Math.random()
    })
    return strArr;
}

const getChars = (logoName) => {
    var chars = [];
    [...logoName].forEach((element, index) => {
        chars.push({ 'id': `char-${index}`, 'content': element })
    })
    
    for(let i = 0; i < 4; i++) {
        chars.push(generateRandomChar(chars.length))
    }
    // console.log(chars)
    return shuffle(chars);
}

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 ${grid}px ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    minWidth: "fit-content",
    width: `${80}%`,
    height: 50,
    display: "flex",
    flexDirection: "row",
    // justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto"
});

function CharList(props) {
    const [state, setState] = useState([[], getChars(props.logoName)]);

    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            const items = reorder(state[sInd], source.index, destination.index);
            const newState = [...state];
            newState[sInd] = items;
            
            setState(newState);
        } else {
            const result = move(state[sInd], state[dInd], source, destination);
            const newState = [...state];
            newState[sInd] = result[sInd];
            newState[dInd] = result[dInd];

            setState(newState);
        }
    }

    const validateSolution = () => {
        var sol = ''
        var solArr = state[0];
        solArr.forEach(ele => {
            sol += ele.content;
        })

        if(sol == props.logoName) {
            return true
        }
        return false
    }

    return (
        <div>
            <div style={{ display: "flex", flexDirection: "column"}}>
                <DragDropContext onDragEnd={onDragEnd}>
                    {state.map((el, ind) => (
                        <Droppable key={ind} droppableId={`${ind}`} direction="horizontal">
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
                                    {el.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={item.id}
                                            index={index}
                                        >
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
                                                    <div
                                                      style={{
                                                        display: "flex",
                                                        justifyContent: "space-around",
                                                        // width: 25,
                                                        // height: 55
                                                      }}
                                                    >
                                                        {item.content}
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>
            <button type="button" onClick={() => props.sendDataToParent(validateSolution())}>send</button>
        </div>
    );
}

export default CharList;
