import { useState, useEffect } from "react";
import LogoList from './LogoList';
import Score from './Score';
import ChangeButtons from './ChangeButtons';
import Instructions from "./Instructions";
import Success from "./Success";

// number of logos in data.json 
const LOGOS = 10

const initOrder = () => {
    var order = []
    for (let i = 0; i < LOGOS; i++) {
        order.push(i)
    }

    return shuffleOrder(order)
}

// creates random order of levels
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

function checkScore() {
    if (!!localStorage.getItem("score")) {
        return Number(localStorage.getItem("score"))
    }
    return 0
}

// order of the displayed logos and score fetched from local storage
var storedOrder = checkStorage()
var storedScore = checkScore()

/*
    main component that contains all other components a forms whole structure of the game
*/

function LogoForm() {

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("SUBMITTED")
    }

    const [order, setOrder] = useState(storedOrder)

    const removeLogo = (index) => {
        setOrder(order.filter(value => { return value != index }))
    }

    const [iter, setIter] = useState(0)

    const increaseIter = () => {
        setIter(iter + 1)
    }

    const decreaseIter = () => {
        setIter(iter - 1)
    }

    const [solution, setSolution] = useState(1)

    // checks the user solution, if correct adds score, removes logo from the pool
    // and moves to the next level
    const sendDataToParent = (userSolution) => {
        console.log("solution", userSolution)
        setSolution(userSolution)
        if (userSolution) {
            increasescore()
            if (order.indexOf(order[iter + 1]) > -1) {
                removeLogo(order[iter])
            } else {
                removeLogo(order[iter])
                decreaseIndex()
            }
        }
    };

    const [score, setScore] = useState(storedScore)

    const increasescore = () => {
        setScore(score + 100)
    }

    const [index, setIndex] = useState(order[0])

    // move to the next level
    const increaseIndex = () => {
        increaseIter()
        setIndex(order[iter])
    }

    // move to the previous level
    const decreaseIndex = () => {
        decreaseIter()
        setIndex(order[iter])
    }

    // save logos order and score to the local storage 
    useEffect(() => {
        localStorage.setItem("logosOrder", order)
    }, order);

    useEffect(() => {
        localStorage.setItem("score", score)
    }, score);

    // set value form ChangeButtons.js for conditional rendering 
    const [value, setValue] = useState(0)
    const sendValueToRender = (val) => {
        setValue(val)
    }

    return (
        <div>
            <div id="navbar">
                <h1>logo quiz</h1>
                <div id="navbar_buttons_div"><ChangeButtons sendValueToRender={sendValueToRender} /></div>
            </div>
            <div>
                {value ? <form onSubmit={handleSubmit}>
                    <Score score={score} />
                    {!solution && <div>Nesprávne</div>}
                    <div>
                        {order.length
                            ? <div>
                                <div>
                                    {<LogoList iter={order[iter]} sendDataToParent={sendDataToParent} />}
                                </div>
                                <div className="container">
                                    <div className="row align-items-start">
                                        <div className="col">
                                            {iter > 0 && <button type="submit" className="btn btn-outline-dark" onClick={() => decreaseIndex()}>Predchádzajúce</button>}
                                        </div>
                                        <div className="col">
                                            {iter < (order.length - 1) && <button type="submit" className="btn btn-outline-dark" onClick={() => increaseIndex()}>Ďalšie</button>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : <div>
                                <Success />
                            </div>
                        }
                    </div>
                </form>
                    : <Instructions />
                }
            </div>
        </div>

    )
}

export default LogoForm;