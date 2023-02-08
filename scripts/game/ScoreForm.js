import { changeTeamScore, getRoundNumber, getScores, getTeam1, getTeam2, getTeam3, getTeams, sendScore, setTeam1, setTeam1Score, setTeam2, setTeam2Score, setTeam3, setTeam3Score } from "../dataAccess.js"
import { TruncheonsAndFlagons } from "../TruncheonsAndFlagons.js"


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
        const team1 = getTeam1()
        const team2 = getTeam2()
        const team3 = getTeam3()

        if (team1.id && team2.id && team3.id) {
            RenderRound()
        }

    } else if ((event.target.id === "teams2")) {
        //const teamSelected2 = parseInt(event.target.value)
        setTeam2(parseInt(event.target.value))
        const team1 = getTeam1()
        const team2 = getTeam2()
        const team3 = getTeam3()
        if (team1.id && team2.id && team3.id) {
            RenderRound()
        }

    } else if ((event.target.id === "teams3")) {
        //const teamSelected3 = parseInt(event.target.value)
        setTeam3(parseInt(event.target.value))
        const team1 = getTeam1()
        const team2 = getTeam2()
        const team3 = getTeam3()
        if (team1.id && team2.id && team3.id) {
            RenderRound()
        }
    }

    RenderCurrentGame()
})

mainContainer.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "saveRoundScores") {
        const teamOne = document.querySelector("input[name='teamOne']").value
        const teamTwo = document.querySelector("input[name='teamTwo']").value
        const teamThree = document.querySelector("input[name='teamThree']").value

        if((parseInt(teamOne) + parseInt(teamTwo) + parseInt(teamThree)) != 3) {
           popUpText('You must record 3 total points for each round. You provided ' + (parseInt(teamOne) + parseInt(teamTwo) + parseInt(teamThree)))
        } else {
            setTeam1Score(parseInt(teamOne))
            setTeam2Score(parseInt(teamTwo))
            setTeam3Score(parseInt(teamThree))
    
            RenderCurrentGame()
    
            let roundNumber = getRoundNumber()
            
            if (roundNumber.round === 3) {
                EndCurrentGame()
                mainContainer.innerHTML = TruncheonsAndFlagons()
    
            } else {
                RenderRound()
            }
        }
    }
})

export const gameOne = (team) => {
    const team1 = getTeam1()
    const team2 = getTeam2()
    const team3 = getTeam3()

    if (team.id === team1.id) {
        return `<li class= "teamScore"><p>${team.name}</p><p>${team1.score}</p></li>`
    }
    else if (team.id === team2.id) {
        return `<li class= "teamScore"><p>${team.name}</p><p>${team2.score}</p></li>`
              
    }
    else if (team.id === team3.id) {
        return `<li class= "teamScore"><p>${team.name}</p><p>${team3.score}</p></li>`
    }
}



export const CurrentGame = () => {
    const teams = getTeams()
    let html = `<ul>`
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
    const roundNumber = getRoundNumber()
    roundNumber.round++

    const foundTeamOne = teams.find((team) => { return team1.id === team.id })
    const foundTeamTwo = teams.find((team) => { return team2.id === team.id })
    const foundTeamThree = teams.find((team) => { return team3.id === team.id })
    let html = `
<h2>Round ${roundNumber.round}</h2>
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

export const RenderRound = () => {
    const currentRound = document.querySelector(".gameplay")
    currentRound.innerHTML = Rounds()
    //document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
}

export const EndCurrentGame = () => {
    const teams = getTeams()
    const scores = getScores()
    let team1 = getTeam1()
    let team2 = getTeam2()
    let team3 = getTeam3()
    let roundNumber = getRoundNumber()

    if (scores.map(score => score.teamId).includes(team1.id)) {
        let foundTeamOne = scores.find((score) => { return team1.id === score.teamId })
        foundTeamOne.score += team1.score
        changeTeamScore(foundTeamOne.id, foundTeamOne)
    } else {
        let score = 0
        const dataToSendToAPI = {
            teamId: team1.id,
            score: score
        }
        sendScore(dataToSendToAPI)
        let getUpdatedScores = getScores()
        let foundTeamOne = getUpdatedScores.find((score) => { return team1.id === score.teamId })
        foundTeamOne.score = team1.score
        changeTeamScore(foundTeamOne.id, foundTeamOne)
    }

    if (scores.map(score => score.teamId).includes(team2.id)) {
        let foundTeamTwo = scores.find((score) => { return team2.id === score.teamId })
        foundTeamTwo.score += team2.score
        changeTeamScore(foundTeamTwo.id, foundTeamTwo)
    } else {
        let score = 0
        const dataToSendToAPI = {
            teamId: team2.id,
            score: score
        }
        sendScore(dataToSendToAPI)
        let getUpdatedScores = getScores()
        let foundTeamTwo = getUpdatedScores.find((score) => { return team2.id === score.teamId })
        foundTeamTwo.score = team2.score
        changeTeamScore(foundTeamTwo.id, foundTeamTwo)

    }
    if (scores.map(score => score.teamId).includes(team3.id)) {
        let foundTeamThree = scores.find((score) => { return team3.id === score.teamId })
        foundTeamThree.score += team3.score
        changeTeamScore(foundTeamThree.id, foundTeamThree)
    } else {
        let score = 0
        const dataToSendToAPI = {
            teamId: team3.id,
            score: score
        }
        sendScore(dataToSendToAPI)
        let getUpdatedScores = getScores()
        let foundTeamThree = getUpdatedScores.find((score) => { return team3.id === score.teamId })
        foundTeamThree.score = team3.score
        changeTeamScore(foundTeamThree.id, foundTeamThree)
    }

    if ((team1.score > team2.score) && (team1.score > team3.score)){
        let foundTeamOne = teams.find((team) => { return team1.id === team.id })
        popUpText(`${foundTeamOne.name} wins!`)
    } else if ((team2.score > team1.score) && (team2.score > team3.score)){
        let foundTeamTwo = teams.find((team) => { return team2.id === team.id })
        popUpText(`${foundTeamTwo.name} wins!`)
    } else if ((team3.score > team1.score) && (team3.score > team1.score)){
        let foundTeamThree = teams.find((team) => { return team3.id === team.id })
        popUpText(`${foundTeamThree.name} wins!`)
    } else {
        popUpText(`It's a tie...`)
    }

    team1.score = 0
    team2.score = 0
    team3.score = 0

    setTeam1(0)
    setTeam2(0)
    setTeam3(0)

    roundNumber.round = 0
}

export const popUpText = (textString) => {
    let html = `<div id="overlay">
    <div id="popup">
    <button id="popupclose">X</button>
    <div class="popupcontent">
        <h1>${textString}</h1>
    </div>
</div>
</div>
`
const popUp = document.querySelector("#popUpGoHere")
    popUp.innerHTML = html

}

document.addEventListener("click", clickEvent => {
    if (clickEvent.target.id === "popupclose") {
        // const mainContainer = document.querySelector("#container")
        // mainContainer.innerHTML = TruncheonsAndFlagons()
    var overlay = document.getElementById("overlay");
    var popup = document.getElementById("popup");
 
    // Close Popup Event
        overlay.style.display = 'none';
        popup.style.display = 'none';
    }
})




