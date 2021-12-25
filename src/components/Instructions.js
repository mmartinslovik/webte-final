function Instructions() {
    return (
        <div className="container" id="instructions_container">
            <div className="row">
                <h2>Popis hry</h2>
            </div>
            <div className="row">
                    Ako moje záverečné zadanie z predmetu webové technológie, som sa vytvoril hru 
                    "Logo Quiz". Logika hry je jednoduchá. Po načítaní obrázku loga známej značky je potrebné 
                    pomocou technológie "drag n drop" premiestniť písmená zo spodného obdĺžnika tak, aby 
                    tvorili názov zobrazeného loga. Keď si budete istí, že vami zadaný názov je správny stlačte 
                    tlačidlo "Odpovedaj". Pokiaľ nebudete vedieť odpovedať môžete sa prekliknúť na ďaľšiu úlohu 
                    a znovu sa vrátiť. Ponúkané sú taktiež možnosti "Nápoveda" a "Riešenie". Po správnom vyriešení 
                    danej úlohu sa pripočíta skóre a program Vám ponúkne ďalšiu, ak sa tam ešte nejaká nezodpovedaná úloha nachádza.
            </div>
            <div className="row">
                    Hra je vytvorená pomocou knižnice "React.js" s pomocou knižnice "react-bootstrap" a "Bootstrap". 
                    Dáta na generovanie v náhodnom poradí sa nachádzajú v súbore "data.json". Generujú sa obrázky 
                    prezaté z google.
                    Na vytvorenie technológie "drag n drop" boli použité komponenty z knižnice 
                    "react-beautiful-dnd". 
            </div>
            
        </div>
    )
}

export default Instructions;