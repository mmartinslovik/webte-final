import { useState, useEffect } from "react";
import LogoList from './LogoList';
import CharList from './CharList';

const LOGOS = 8

const initOrder = () => {
    var order = []
    for(let i = 0; i < LOGOS; i++) {
        order.push(i)
    }

    return order
}


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

    const [solution, setSolution] = useState(0)

    const sendDataToParent = (bool) => { // the callback. Use a better name
        console.log("solution", bool)
        setSolution(bool)
        if (bool) {
            removeLogo(iter)
            increaseIter()
            increasescore()
        }
    };

    const [score, setScore] = useState(0)

    const increasescore = () => {
        setScore(score + 100)
    }

    const [order, setOrder] = useState(initOrder())

    const removeLogo = (index) => {
        setOrder(order.splice(index, 1))
        console.log("order", order)
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                {score}
            </div>
            <div>
                {<LogoList iter={iter} sendDataToParent={sendDataToParent} />}
            </div>
            {iter > 0 && <button type="submit" onClick={() => decreaseIter()}>prev</button>}
            {iter < order.length && <button type="submit" onClick={() => increaseIter()}>next</button>}
        </form>
    )
}

export default LogoForm;