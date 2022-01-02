import { useState } from "react";

/*
  child component located in navigational bar that sends its parent component LogoForm.js value to render:
  0: game description 
  1: game 
*/

function ChangeButtons({sendValueToRender}) {
    const [value, setValue] = useState(1);

    const handleChange = (val) => {
      setValue(val)
      sendValueToRender(val)
    }
  
    return (
      <div>
         <button type="button" className="navbar_buttons" onClick={() => handleChange(0)}>Popis hry</button>
         <button type="button" className="navbar_buttons" onClick={() => handleChange(1)}>Hra</button>
      </div>
    );
  }

export default ChangeButtons;