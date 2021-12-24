import React, { useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import LogoForm from './LogoForm';
import Char from "./Char";


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
    return strArr
}

const getRandomChars = (len) => {
    var chars = []
    for(let i = 0; i < 4; i++) {
        chars.push(generateRandomChar(len++))
    }
    return chars
}

const getChars = (logoName) => {
    var chars = [];
    [...logoName].forEach((element, index) => {
        chars.push({ 'id': `char-${index}`, 'content': element })
    })
    
    // console.log(chars)
    return chars;
}

const initChars = (logoName) =>{
    var chars = getChars(logoName)
    var randomChars = getRandomChars(logoName.length)
    console.log(chars)
    return shuffle([...chars, ...randomChars])
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
    width: 40,
    height: 40,
    borderRadius: `${5}%`,

    // change background colour if dragging
    background: isDragging ? "#F8961E" : "#4D908E",

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "#F9C74F" : "lightgray",
    padding: grid,
    // border: '1px solid grey',
    flexWrap: "wrap",
    // minWidth: "fit-content",
    width: `${80}%`,
    minHeight: 60,
    display: "inline-flex",
    flexDirection: "row",
    // justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: `${1}%`,
});

function CharList(props) {
    const [state, setState] = useState([[], initChars(props.logoName)]);
    console.log("state", state)

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

    const [solution, setSolution] = useState(false)
    const makeSolution = () => {
        setSolution(true)
        setState([getChars(props.logoName), getRandomChars(props.logoName.length)])
    }

    const [hint, setHint] = useState(false)
    const getHint = () => {
        setHint(true)
    }

    return (
        <div className="container">
            <div style={{ display: "flex", flexDirection: "column", margin: `${1}%`}}>
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
            <div className="container">
                <div className="menu">
                    {hint && <div>{props.logoHint}</div>}
                    {solution && <div>{props.logoName}</div>}
                </div>
                <div className="menu">
                    <button type="button" className="btn btn-outline-success" onClick={() => props.sendDataToParent(validateSolution())}>Odpovedaj</button>
                </div>
                <div className="menu">
                    <button type="button" className="btn btn-outline-warning" onClick={() => getHint()}>Nápoveda</button>
                </div>
                <div className="menu">
                    <button type="button" className="btn btn-outline-info" onClick={() => makeSolution()}>Riešenie</button>
                </div>
            </div>
        </div>
    );
}

export default CharList;
