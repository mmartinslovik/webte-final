import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
 
 function Char({content}) {
     return (
        <div
            style={{
            display: "flex",
            justifyContent: "space-around",
            }}
        >
            {content}
        </div>
     )
 }

 export default Char;