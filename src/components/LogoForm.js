import { useState, useEffect } from "react";
import LogoList from './LogoList';

function LogoForm() {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("SUBMITTED")
    }
    
    const [iter, setIter] = useState(0)

    const increaseIter = () => {
        setIter(iter + 1)
    }

    const decreaseIter = () => {
        setIter(iter - 1)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {<LogoList iter={iter}/>}
            </div>
            <button type="submit" onClick={() => decreaseIter()}>prev {iter}</button>
            <button type="submit" onClick={() => increaseIter()}>next {iter}</button>
        </form>
    )
}

export default LogoForm;