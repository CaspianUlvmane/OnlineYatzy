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
    currentThrow()
}

function currentThrow(){
    let player = selectElement("#playerName")
    let rollCounter = selectElement("#nmbRolls")
    rollCounter.innerText = `${player.dataset.throw}/3`

}