/*
    returns game description screen, default after the page is loaded 
*/

function Instructions() {
    return (
        <div className="container" id="instructions_container">
            <div className="row">
                <h2>Popis hry</h2>
            </div>
            <div className="row">
                <p>
                    Ako moje záverečné zadanie z predmetu webové technológie, som vytvoril hru s názvom
                    "Logo Quiz". Logika hry je jednoduchá.
                    Po načítaní obrázku loga známej značky, je potrebné
                    pomocou technológie "drag n drop" premiestniť písmená zo spodného obdĺžnika do vrchného
                    obdĺžnika tak, aby tvorili názov zobrazeného loga. Hra obsahuje 10 úloh.
                </p>
                <p>
                    Keď si budete istí, že vami zadaný názov je správny, stlačte
                    tlačidlo "Odpovedaj".
                    Pokiaľ nebudete vedieť ihneď odpovedať, môžete sa prekliknúť na ďaľšiu úlohu
                    a znovu sa vrátiť. Ponúkané sú taktiež možnosti "Nápoveda" a "Riešenie".
                    Nápoveda vypíše informáciu na ozrejmenie danej úlohy, pričom riešenie rovno
                    usporiada písmená do poradia v akom sa majú nachádzať.
                    Aj po stlačení tlačidla "Riešenie" je potrebné stlačiť tlačidlo "Odpovedaj".
                </p>
                <p>
                    Po správnom vyriešení úlohy sa pripočíta skóre a program Vám ponúkne ďalšiu,
                    ak sa tam ešte nejaká ešte nezodpovedaná úloha nachádza.
                </p>
            </div>
            <div className="row">
                <p>
                    Hra je vytvorená pomocou knižnice "React.js" s pomocou knižnice 
                    "react-bootstrap" a "Bootstrap" css.
                    Dáta na generovanie v náhodnom poradí sa nachádzajú v súbore "data.json". 
                    Generujú sa obrázky prezaté z google.
                </p>
                <p>
                    Na vytvorenie technológie "drag n drop" boli použité komponenty z knižnice
                    "react-beautiful-dnd".
                </p>
            </div>
            <div className="row">
                <h3>Linky</h3>
                <ul>
                    <li>
                        <a href="https://reactjs.org/docs/getting-started.html">
                            react.js
                        </a>
                    </li>
                    <li>
                        <a href="https://getbootstrap.com/docs/5.1/getting-started/introduction/">
                            bootstrap
                        </a>
                    </li>
                    <li>
                        <a href="https://react-bootstrap.github.io/">
                            react-bootstrap
                        </a>
                    </li>
                    <li>
                        <a href="https://github.com/atlassian/react-beautiful-dnd">
                            react-beautiful-dnd
                        </a>
                    </li>
                </ul>
            </div>

        </div>
    )
}

export default Instructions;