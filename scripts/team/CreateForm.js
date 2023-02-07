import { sendTeam } from "../dataAccess.js"

export const CreateForm = () => {
    let html =`
    <div class ="newTeamForm">
    <h3> New Team </h3>
        <label class="label" for="teamName">Team Name</label>
        <input type="text" name="teamName" class="input" />
    

    <button class="button" id="createTeam">Create Team</button>
    </div>
`
return html
}

const mainContainer = document.querySelector("#container")

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "createTeam") {
        const teamName = document.querySelector("input[name='teamName']").value
        const dateCreated = new Date().toLocaleDateString()

        const dataToSendToAPI = {
            name: teamName,
            dateCreated: dateCreated
        }

        sendTeam(dataToSendToAPI)
    }
})