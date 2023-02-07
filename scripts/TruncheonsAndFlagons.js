import { CreateForm } from "./team/CreateForm.js";
import { CreatePlayer } from "./player/PlayerForm.js";
import { Leaderboard } from "./score/ScoreList.js";
import { GameForm } from "./game/ScoreForm.js";

export const TruncheonsAndFlagons = () => {
    return `
    <div class='forms'>
    ${CreateForm()}
    <div class = "newPlayerForm">
    <h3> New Player </h3>
    ${CreatePlayer()}
    </div>
    <div class="currentGameBox">
    <h3>Current Game</h3>
    <div class='currentGame'> No game in progress...
    </div>
    </div>

    <div class="leaderBoard">
    <h3>LeaderBoard</h3>
    ${Leaderboard()}
    </div>
    </div>

    <div class='game'>
        <h1>Truncheons & Flagons</h1>
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