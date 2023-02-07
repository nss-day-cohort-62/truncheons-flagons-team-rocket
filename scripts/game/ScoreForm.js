import { getRoundScores, getTeam1, getTeam2, getTeam3, getTeams, setTeam1, setTeam2, setTeam3 } from "../dataAccess.js"


const mainContainer = document.querySelector("#container")

export const GameTeamSelectors = () => {
    const teams = getTeams()

    let html = `
            <option value="">Choose a team</option>
            ${teams.map(team => {
        return `<option value="${team.id}">${team.name}</option>`
    }).join("")
        }
    `
    return html
}

export const GameForm = () => {
    let html = `<select class="teams" id="teams1">${GameTeamSelectors()} </select>
             <select class="teams" id="teams2">${GameTeamSelectors()} </select>
             <select class="teams" id="teams3">${GameTeamSelectors()} </select>
             `

    return html
}

mainContainer.addEventListener("change", (event) => {

    if (event.target.id === "teams1") {
        //const teamSelected1 = parseInt(event.target.value)
        setTeam1(parseInt(event.target.value))

    }
    else if ((event.target.id === "teams2")) {
        //const teamSelected2 = parseInt(event.target.value)
        setTeam2(parseInt(event.target.value))

    } else if ((event.target.id === "teams3")) {
        //const teamSelected3 = parseInt(event.target.value)
        setTeam3(parseInt(event.target.value))


    }

    RenderCurrentGame()

    const team1 = getTeam1()
    const team2 = getTeam2()
    const team3 = getTeam3()
    if (team1.id && team2.id && team3.id) {
        RenderRoundOne()
    }

})
mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveRoundScores") {
        const teamOne = document.querySelector("input[name='teamOne']").value
        const teamTwo = document.querySelector("input[name='teamTwo']").value
        const teamThree = document.querySelector("input[name='teamThree']").value

        const teamOneObject = getTeam1()
        const teamTwoObject = getTeam2()
        const teamThreeObject = getTeam3()

        teamOneObject.score = teamOne
        teamTwoObject.score = teamTwo
        teamThreeObject.score = teamThree

    }
})

export const gameOne = (team) => {
    const team1 = getTeam1()
    const team2 = getTeam2()
    const team3 = getTeam3()

    if (team.id === team1.id) {
        return `<li> ${team.name}</li>
                <li> ${team1.score}</li>`
    }
    else if (team.id === team2.id) {
        return `<li> ${team.name}</li>
                <li> ${team2.score}</li>`
    }
    else if (team.id === team3.id) {
        return `<li> ${team.name}</li>
        <li>${team3.score}</li>`
    }
}



export const CurrentGame = () => {
    const teams = getTeams()
    let html = `<ul>`
    html += `<li>Name:</li><li>Score:</li>`
    const listRequest = teams.map(gameOne)
    html += listRequest.join("")
    html += `</ul>`
    return html
}

export const Rounds = () => {
    const teams = getTeams()
    const team1 = getTeam1()
    const team2 = getTeam2()
    const team3 = getTeam3()

    const foundTeamOne = teams.find((team) => { return team1.id === team.id })
    const foundTeamTwo = teams.find((team) => { return team2.id === team.id })
    const foundTeamThree = teams.find((team) => { return team3.id === team.id })
    let html = `
<div class="teamsScores">
<label class="label" for="teamOne">${foundTeamOne.name}</label>
<input type="text" name="teamOne" class="input" />
</div>

<div class="teamsScores">
<label class="label" for="teamTwo">${foundTeamTwo.name}</label>
<input type="text" name="teamTwo" class="input" />
</div>

<div class="teamsScores">
<label class="label" for="teamThree">${foundTeamThree.name}</label>
<input type="text" name="teamThree" class="input" />
</div>

<button class="button" id="saveRoundScores">Save Round Scores</button>
`


    return html
}



export const RenderCurrentGame = () => {
    const currentGame = document.querySelector(".currentGame")
    currentGame.innerHTML = CurrentGame()
    //document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
}


export const RenderRoundOne = () => {
    const currentRound = document.querySelector(".gameplay")
    currentRound.innerHTML = Rounds()
    //document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
}