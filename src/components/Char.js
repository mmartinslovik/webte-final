import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
 
 function Char({content}) {
     return (
        <div
            style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: `${-5}px`,
            fontWeight: "bold"
            }}
        >
            {content}
        </div>
     )
 }

 export default Char;