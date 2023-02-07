const applicationState = {
    gameScores: {round: 0},
    team1: {score: 0},
    team2: {score:0},
    team3: {score:0}
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
export const getTeam1 = () => {
    return applicationState.team1
}
export const getTeam2 = () => {
    return applicationState.team2
}
export const getTeam3 = () => {
    return applicationState.team3
}
export const getRoundScores = () => {
    return applicationState.gameScores
}

export const setTeam1 = (id) => {
    applicationState.team1.id = id
    //document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
}
export const setTeam2 = (id) => {
    applicationState.team2.id = id
   // document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
}
export const setTeam3 = (id) => {
    applicationState.team3.id = id
    //document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
}

export const sendTeam = (teamToSend) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(teamToSend)
    }


    return fetch(`${API}/teams`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
        })
}

export const sendPlayer = (playerToSend) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(playerToSend)
    }


    return fetch(`${API}/players`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            document.querySelector("#container").dispatchEvent(new CustomEvent("stateChanged"))
        })
}