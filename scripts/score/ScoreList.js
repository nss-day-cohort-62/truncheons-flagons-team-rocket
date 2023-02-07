import { getPlayers, getScores, getTeams } from "../dataAccess.js"

export const Leaderboard = () => {
    const teams = getTeams()

    
    let html = `<table class='list'>
    <tr class='listItem'>
        <th>Teams:</th>
        <th>Players:</th>
        <th>Scores:</th>
    </tr>`
    
    const listItems = teams.map(TeamStat)

    html += listItems.join('')

    html += '</table>'

    return html
}

export const TeamStat = (team) => {
    const scores = getScores()
    const players = getPlayers()

    let html = `<tr class='listItem'>
    <td>${team.name}</td>`

    const playerArray = players.filter(player => (player.teamId === team.id))
    html += `<td>${playerArray.length}</td>`

    const scoreArray = scores.filter(score => (score.teamId === team.id))
    
    let totalScore = 0

    for  (const score of scoreArray) {
        totalScore += score.score
    }

    html += `<td>${totalScore}</td></tr>`

    return html
}