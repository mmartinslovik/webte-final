import React, { useState } from "react";
// components needed for drag n drop to function 
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Char from "./Char";

// generates random characters to increase difficulty
const generateRandomChar = (charsLen) => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

    return {
        'id': `char-${charsLen}`, 'content': characters.charAt(Math.floor(Math.random() * characters.length))
    }
}

// creates random order of the characters
const shuffle = (strArr) => {
    strArr.sort(function () {
        return 0.5 - Math.random()
    })
    return strArr
}

const getRandomChars = (len) => {
    var chars = []
    for (let i = 0; i < 4; i++) {
        chars.push(generateRandomChar(len++))
    }
    return chars
}

// transforms logo name into character tiles data
const getChars = (logoName) => {
    var chars = [];
    [...logoName].forEach((element, index) => {
        chars.push({ 'id': `char-${index}`, 'content': element })
    })

    return chars;
}

// initializes the state of CharList.js component
const initChars = (logoName) => {
    var chars = getChars(logoName)
    var randomChars = getRandomChars(logoName.length)
    console.log(chars)
    return shuffle([...chars, ...randomChars])
}

// reorders tiles in the rectangle
const reorder = (list, startIndex, lastIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(lastIndex, 0, removed);

    return result;
};


// moves an item from one list to another list based od react-beautiful-dnd
const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destinationClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destinationClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destinationClone;

    return result;
};

const grid = 8;

// changes style of the character tiles
const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 ${grid}px ${grid}px 0`,
    width: 40,
    height: 40,
    borderRadius: `${5}%`,
    background: isDragging ? "#F8961E" : "#4D908E",

    // styles needed to apply on draggables
    ...draggableStyle
});

// changes style of the rectangles 
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#F9C74F" : "lightgray",
    padding: grid,
    flexWrap: "wrap",
    width: `${80}%`,
    minHeight: 65,
    display: "inline-flex",
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: `${1}%`,
});

/*
    creates solution and starting rectangle filled with characters forming a solution with addition of 
    random characters, onClick displays hint or completes the solution
*/

function CharList(props) {

    const [state, setState] = useState([[], initChars(props.logoName)]);

    // creates all drag n drop logic, required by the library
    function onDragEnd(result) {
        const { source, destination } = result;

        // dropped outside the rectangle
        if (!destination) {
            return;
        }
        const destInd = +destination.droppableId;
        const srcInd = +source.droppableId;

        // drag n drop within the rectangle
        if (srcInd === destInd) {
            const items = reorder(state[srcInd], source.index, destination.index);
            const newState = [...state];
            newState[srcInd] = items;

            setState(newState);
        } 
        // drag n drop between starting and solution rectangles
        else {
            const result = move(state[srcInd], state[destInd], source, destination);
            const newState = [...state];
            newState[srcInd] = result[srcInd];
            newState[destInd] = result[destInd];

            setState(newState);
        }
    }

    // validates user solution, if correct the information is send into LogoForm.js 
    const validateSolution = () => {
        var sol = ''
        var solArr = state[0];
        solArr.forEach(ele => {
            sol += ele.content;
        })

        if (sol == props.logoName) {
            return true
        }
        return false
    }

    // creates solution and sends data into LogoForm.js
    const [solution, setSolution] = useState(false)
    const makeSolution = () => {
        setSolution(true)
        setState([getChars(props.logoName), getRandomChars(props.logoName.length)])
    }
    
    // sets hint for conditional rendering
    const [hint, setHint] = useState(false)
    const getHint = () => {
        setHint(true)
    }

    return (
        <div className="container">
            <div style={{ display: "flex", flexDirection: "column", margin: `${1}%` }}>
                {/* 
                    react-beautiful-dnd requires using components:
                    1) DragDropContext - wraps the part of your application you want to have drag and drop enabled for
                    2) Droppable - an area that can be dropped into
                    3) Draggable - what can be dragged around
                    with its required properties for fully functional application
                 */}
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
                                                    <Char content={item.content} />
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
            <div className="container" id="menu">
                <div className="row">
                    {hint && <div>{props.logoHint}</div>}
                    {solution && <div>{props.logoName}</div>}
                    <div className="row align-items-start">
                        <div className="col">
                            <button type="button" className="btn btn-outline-warning" onClick={() => getHint()}>Nápoveda</button>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-outline-success" onClick={() => props.sendDataToParent(validateSolution())}>Odpovedaj</button>
                        </div>
                        <div className="col">
                            <button type="button" className="btn btn-outline-info" onClick={() => makeSolution()}>Riešenie</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharList;
