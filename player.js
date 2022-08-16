let startBtn = selectElement("#start")

startBtn.addEventListener("click", startGame)
selectElement('#roller').addEventListener('click', currentThrow)

function playingPlayers (){
    let players = selectElements(".player")
    for (let player of players){
        let playerName = player.children[0].children[0].value
        console.log(playerName)
        if(playerName != "Name" && playerName != ""){
            player.classList.add("playing")
        }
        else if (playerName == "Name" || playerName == ""){
            player.classList.remove("playing")
        }
    }
}

function startGame (){
    playingPlayers()
    turnsStart()
    renderPlayer()
    currentThrow()
}

function currentPlayer(){
    let players = [selectElements(".playing")]
    let currentPlayerDiv = players.sort((a,b) => players[a].dataset.turn - players[b].dataset.turn)[0]
    let currentPlayerName = currentPlayerDiv[0].children[0].children[0].value
    return currentPlayerName
}

function renderPlayer(){
    let nameSign = selectElement("#playerName")
    nameSign.textContent = currentPlayer()
}

function currentThrow(){
    let player = selectElement("#playerName")
    let rollCounter = selectElement("#nmbRolls")
    rollCounter.innerText = `${player.dataset.throw}/3`

}

function turnsStart (){
    let players = selectElements(".playing")
    for (let player of players){
        player.dataset.turn = 0
    }
}