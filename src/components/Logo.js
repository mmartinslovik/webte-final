/*
    creates and returns image of the logo 
*/

function Logo(props) {
    console.log(props)
    
    return (
        <img className="logo_image" 
            key={props.logo.id} 
            src={`./images/${props.logo.src}`} 
            alt={props.logo.title}>
        </img>
    )
}

export default Logo;