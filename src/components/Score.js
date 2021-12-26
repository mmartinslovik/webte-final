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
                Po načítaní obrázku loga známej značky je potrebné 
                pomocou technológie "drag n drop" premiestniť písmená zo spodného obdĺžnika tak, aby 
                tvorili názov zobrazeného loga. Keď si budete istí, že vami zadaný názov je správny stlačte 
                tlačidlo "Odpovedaj". Pokiaľ nebudete vedieť odpovedať môžete sa prekliknúť na ďaľšiu úlohu 
                a znovu sa vrátiť.
            </div>
        </Tooltip>
    );

    return (
        <div className="container" id="score_container">
            <div className="row">
                <div className="col">
                    <OverlayTrigger
                        placement="bottom"
                        delay={{ show: 250, hide: 400 }}
                        overlay={renderTooltip}
                    >
                        <Button variant="outline-secondary">Inštrukcie</Button>
                    </OverlayTrigger>
                </div>
                <div className="col">
                    <div id="score">
                        Skóre: {score}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Score;