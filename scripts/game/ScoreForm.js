import { getTeam1,getTeam2,getTeam3, getTeams, setTeam1, setTeam2, setTeam3 } from "../dataAccess.js"


const mainContainer = document.querySelector("#container")

export const GameTeamSelectors = () => {
    const teams = getTeams()

    let html = `
        <select class="teams" id="teams">
            <option value="">Choose a team</option>
            ${teams.map(team => {
                return `<option value="${team.id}">${team.name}</option>`
            }).join("")
        }
    </select>
    `
    return html
}

export const GameForm = () => {
    let html = `<div id='selector1'>${GameTeamSelectors()}</div>`
    html += `<div id='selector2'>${GameTeamSelectors()}</div>`
    html += `<div id='selector3'>${GameTeamSelectors()}</div>`

    return html
}

mainContainer.addEventListener("change", (event) => {

    if (event.target.id === "selector1") {
        const teamSelected1 = parseInt(event.target.value)
        setTeam1(teamSelected1)
    } 
    else if ((event.target.id === "selector2")) {
        const teamSelected2 = parseInt(event.target.value)
        setTeam2(teamSelected2)
    } else if ((event.target.id === "selector3")) {
        const teamSelected3 = parseInt(event.target.value)
        setTeam3(teamSelected3)
    }

    
    if(teamSelected1 && teamSelected2 && teamSelected3) {
        RenderCurrentGame()
    }
})

export const CurrentGame = () => {
    const teams = getTeams()
    const team1Id = getTeam1()
    const team2Id = getTeam2()
    const team3Id = getTeam3()

    const team1 = teams.find((team) => {return team1Id.id === team.id })
    const team2 = teams.find((team)=> {return team2Id.id === team.id})
    const team3 = teams.find((team) => {return team3Id.id === team.id})

    let html =`<ul>
        <h3>Name:</h3>    
            <li>${team1.name}${team2.name}${team3.name}</li>
        <h3>Score:</h3>
    `

    return html

}

export const RenderCurrentGame = () => {
    const currentGame = document.querySelector(".currentGame")
    currentGame.innerHTML = CurrentGame()
}