import { fetchPlayers, fetchScores, fetchTeams } from "./dataAccess.js"


const mainContainer = document.querySelector("#container")


mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    })



export const render = () => {
    fetchTeams().then(
        () => fetchPlayers())
    .then(
        () => fetchScores())
    .then(
        () => {
            mainContainer.innerHTML = TruncheonsAndDragons()
        }
    )
}
render ()