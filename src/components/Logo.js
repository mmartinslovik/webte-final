import './Logo.css';

function Logo(props) {
    return (
        <img className="image" 
            key={props.logo.id} 
            src={`./images/${props.logo.src}`} 
            alt={props.logo.title}
            width="250"
            heigth="250"></img>
    )
}

export default Logo;