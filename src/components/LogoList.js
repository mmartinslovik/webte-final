import { useState, useEffect } from "react";
import Logo from './Logo';


function LogoList() {
    const [logos, setLogos] = useState([])

    useEffect(() => {
        fetch('./data.json')
          .then(res => res.json())
          .then(data => setLogos(data));
      }, []);

    // var data = []
    // const promise = loadData().then(result => {
    //     result.forEach(element => {
    //         data.push(element)
    //     })
    // })

    return (
        <div>
            {logos && (logos.map(logo => <Logo logo={logo} />))}
        </div>
    )
}

export default LogoList;