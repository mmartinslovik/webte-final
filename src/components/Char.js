import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
 
 function Char({char, ref, style}) {
     console.log(char, style, ref)
     return (
         <div ref={ref} style={style}>
             <div>{char}</div>
        </div>
     )
 }

 export default Char;