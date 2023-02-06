import { fetchPlayers, fetchScores, fetchTeams } from "./dataAccess.js"
import { TruncheonsAndFlagons } from "./TruncheonsAndFlagons.js"

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
            mainContainer.innerHTML = TruncheonsAndFlagons()
        }
    )
}
render ()