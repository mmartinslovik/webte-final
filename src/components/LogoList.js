import { useState, useEffect } from "react";
import Logo from './Logo';
import CharList from './CharList';


function LogoList(props) {
    const [logos, setLogos] = useState([])

    useEffect(() => {
        fetch('./data.json')
          .then(res => res.json())
          .then(data => setLogos(data));
      }, []);
    
    const iterLogo = logos[props.iter]
    console.log(iterLogo)

    return (
        <div>
            {iterLogo && (<Logo logo={iterLogo} />)}
            {iterLogo && <CharList logoName={iterLogo.title} />}
        </div>
    )
}

export default LogoList;