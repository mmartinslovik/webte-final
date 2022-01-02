/*
    returns a "congratulations" screen after successfully completing the quiz
*/

function Success() {
    return (
        <div className="container" id="success_container">
            <div className="row">
                <h2>Dobrá práca!</h2>
                <p>Zvládli ste to.</p>
            </div>
        </div>
    )
}

export default Success;