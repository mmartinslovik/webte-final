import { useState, useEffect } from "react";
import LogoList from './LogoList';
import CharList from './CharList';

const LOGOS = 10

const initOrder = () => {
    var order = []
    for(let i = 0; i < LOGOS; i++) {
        order.push(i)
    }

    return order
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
            <div>
                {score}
            </div>
            <div>
                {<LogoList iter={order[iter]} sendDataToParent={sendDataToParent} />}
            </div>
            {iter > 0 && <button type="submit" onClick={() => decreaseIndex()}>prev</button>}
            {iter < (order.length - 1) && <button type="submit" onClick={() => increaseIndex()}>next</button>}
        </form>
    )
}

export default LogoForm;