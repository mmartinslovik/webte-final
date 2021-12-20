function Score({score}) {
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <button type="button" className="btn btn-secondary" 
                        data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Move characters to the upper
                        rectangle to match logo name.">
                        instructions
                    </button>
                </div>
                <div className="col" id="score">
                    score : {score}
                </div>
                <div className="col">
                    
                </div>
            </div>
        </div>
    )
}

export default Score;