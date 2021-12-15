import { useState, useEffect } from "react";
import Char from './Char';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

function CharList(props) {
    var chars = [];

    [...props.logoName].forEach((element, index) => {
        chars.push(element)
    })

    return (
        <div className="CharList">
            {chars && (chars.map(char => <Char char={char} />))}
        </div>
    )
}

export default CharList;