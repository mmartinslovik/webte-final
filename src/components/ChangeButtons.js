import { useState } from "react";

function ChangeButtons({sendValueToRender}) {
    const [value, setValue] = useState(1);

    const handleChange = (val) => {
      setValue(val)
      sendValueToRender(val)
    }
  
    return (
      <div>
         <button type="button" className="btn btn-dark" onClick={() => handleChange(0)}>napoveda</button>
         <button type="button" className="btn btn-dark" onClick={() => handleChange(1)}>hra</button>
      </div>
    );
  }

export default ChangeButtons;