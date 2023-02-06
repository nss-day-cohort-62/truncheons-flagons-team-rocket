import { getPlayers, getScores, getTeams } from "../dataAccess.js"

export const Leaderboard = () => {
    const teams = getTeams()

    
    let html = `<ul class='list'>
    <li class='listItem'>
        <p>Teams:</p>
        <p>Players:</p>
        <p>Scores:</p>
    </li>`
    
    const listItems = teams.map(TeamStat)

    html += listItems.join('')

    html += '</ul>'

    return html
}

export const TeamStat = (team) => {
    const scores = getScores()
    const players = getPlayers()

    let html = `<li class='listItem'>
    <p>${team.name}</p>`

    const playerArray = players.filter(player => (player.teamId === team.id))
    html += `<p>${playerArray.length}</p>`

    const scoreArray = scores.filter(score => (score.teamId === team.id))
    
    let totalScore = 0

    for  (const score of scoreArray) {
        totalScore += score.score
    }

    html += `<p>${totalScore}</p>`

    return html
}