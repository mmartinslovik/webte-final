/*
    creates a tile with character content that is used to drag between characters' rectangle 
    and solution rectangle
*/

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