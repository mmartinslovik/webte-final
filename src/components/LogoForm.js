import { useState, useEffect } from "react";
import LogoList from './LogoList';
import CharList from './CharList';
import Score from './Score';

const LOGOS = 10

const initOrder = () => {
    var order = []
    for(let i = 0; i < LOGOS; i++) {
        order.push(i)
    }

    return shuffleOrder(order)
}

const shuffleOrder = (arr) => {
    arr.sort(() => Math.random() - 0.5);
    
    return arr
}

function checkStorage() {
    var storedContent = localStorage.getItem("logosOrder")
    console.log(storedContent)
    if (!!storedContent) {
        return storedContent.split(",").map(Number);
    }
    return initOrder();
}

var storedOrder = checkStorage()

function LogoForm() {
    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("SUBMITTED")
    }

    const [order, setOrder] = useState(storedOrder)

    const removeLogo = (index) => {
        setOrder(order.filter(value => {return value != index}))
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
            increasescore()
            removeLogo(order[iter])
            // increaseIndex()
        }
    };

    const [score, setScore] = useState(0)

    const increasescore = () => {
        setScore(score + 100)
    }

    const [index, setIndex] = useState(order[0])

    const increaseIndex = () => {
        increaseIter()
        setIndex(order[iter])
    }

    const decreaseIndex = () => {
        decreaseIter()
        setIndex(order[iter])
    }

    console.log("order", order)
    localStorage.setItem("logosOrder", order);
    console.log("iter", iter)

    return (
        <form onSubmit={handleSubmit}>
            <Score score={score} />
            <div>
                {<LogoList iter={order[iter]} sendDataToParent={sendDataToParent} />}
            </div>
            <div className="container">
                <div className="row align-items-start">
                    <div className="col">
                        {iter > 0 && <button type="submit" className="btn btn-dark" onClick={() => decreaseIndex()}>previous</button>}
                    </div>
                    <div className="col" id="score">
                        {iter < (order.length - 1) && <button type="submit" className="btn btn-dark" onClick={() => increaseIndex()}>next</button>} 
                    </div>
                </div>
            </div>
        </form>
    )
}

export default LogoForm;