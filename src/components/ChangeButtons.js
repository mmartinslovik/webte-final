import { useState } from "react";

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