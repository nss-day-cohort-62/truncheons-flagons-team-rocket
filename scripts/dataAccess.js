const applicationState = {

}

const API = "http://localhost:8088"

export const fetchTeams = () => {
    return fetch(`${API}/teams`) 
        .then(response => response.json())
        .then((teamsFetched) => {
            applicationState.teams = teamsFetched
        }
    )
}
export const fetchPlayers = () => {
    return fetch(`${API}/players`) 
        .then(response => response.json())
        .then((playersFetched) => {
            applicationState.players = playersFetched
        }
    )
}
export const fetchScores = () => {
    return fetch(`${API}/scores`) 
        .then(response => response.json())
        .then((scoresFetched) => {
            applicationState.scores = scoresFetched
        }
    )
}
export const getTeams = () => {
    return applicationState.teams.map(team => ({...team}))
}
export const getPlayers = () => {
    return applicationState.players.map(player => ({...player}))
}
export const getScores = () => {
    return applicationState.scores.map(score => ({...score}))
}