import { sendPlayer, getTeams } from "../dataAccess.js";

export const CreatePlayer = () => {
    let html = `
    <div class="field">
            <input type="text" placeholder="First Name" name="playerFirstName" class="input" />
        </div>
    <div class="field">
        <input type="text" placeholder="Last Name" name="playerLastName" class="input" />
        </div>
    <div class="field">
        ${getTeamNames()}
        </div>
        <button class="button" id="addPlayer">Add Player to Team</button>
    `
    return html
}

const getTeamNames = () => {
    const teams = getTeams()

    let html = `        
        <select class="teams" name = "teams" id="teams">
            <option value="0">Choose a team</option>
            ${teams.map(team => {
                // let selected = ""
                // if( selectedTeam.id=== team.id) {
                //     selected = "selected"
                // }
                return `<option value="${team.id}" >${team.name}</option>`
            }).join("")}
        </select>
`
    return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "addPlayer") {
        const playerFirstName = document.querySelector("input[name='playerFirstName']").value
        const playerLastName = document.querySelector("input[name='playerLastName']").value
        const playerTeamId = document.querySelector("select[name='teams']").value
    
        const dataToSendToAPI = {
            firstName: playerFirstName,
            lastName: playerLastName,
            teamId: parseInt(playerTeamId)
        }

        sendPlayer(dataToSendToAPI)
    }
})