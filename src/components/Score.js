import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Button from 'react-bootstrap/Button';
import Tooltip from 'react-bootstrap/Tooltip'

function Score({ score }) {
    const message = ['tooltip']
    const renderTooltip = (message) => (
        <Tooltip id="button-tooltip" {...message}>
            <div>
                Move characters from the bottom row to the top row. Match the name of the displayed logo.
                Then hit the answer button in order to submit your solution then your score should increase. 
                If you are not sure, whether your solution is correct just click next and you can always come back later. If you have no
                idea what the solution is just click "solution" button. 
            </div>
        </Tooltip>
    );

    return (
        <div className="container">
            <div className="row" id="section-to-print">
                <div>
                    <h2>
                        Instructions
                    </h2>
                    Move characters from the bottom row to the top row. Match the name of the displayed logo.
                    Then hit the answer button in order to submit your solution then your score should increase. 
                    If you are not sure, whether your solution is correct just click next and you can always come back later. If you have no
                    idea what the solution is just click "solution" button. 
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <Button variant="secondary">instructions</Button>
                    </OverlayTrigger>
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