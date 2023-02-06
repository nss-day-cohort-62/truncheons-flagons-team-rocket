import { CreateForm } from "./team/CreateForm.js";
import { CreatePlayer } from "./player/PlayerForm.js";
import { Leaderboard } from "./score/ScoreList.js";
import { GameForm } from "./game/ScoreForm.js";

export const TruncheonsAndFlagons = () => {
    return `
    <div class='forms'>
    ${CreateForm()}
    ${CreatePlayer()}
    <h2>Current Game</h2>
    <div class='currentGame'>
    </div>
    ${Leaderboard()}
    </div>
    <div class='game'>
        <h1>Truncheons and Flagons</h1>
        <div class='gameplay'>
        <button id='gameButton'>Start Game</button>
        </div>
    </div>
    `
}

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "gameButton") {
        renderTeamSelect()
    }
})

export const renderTeamSelect = () => {
    const newGame = document.querySelector(".gameplay")
    newGame.innerHTML = GameForm()
}