let startBtn = selectElement("#start")

startBtn.addEventListener("click", startGame)
selectElement('#roller').addEventListener('click', currentThrow)
selectElement('#roller').addEventListener('click', chooseTask)

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
    let players = sortPlayers()
    let name = players.children[0].children[0].value
    console.log(name)
    return name
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

function chooseTask (){
    let players = [selectElements(".playing")]
    let currentPlayerDiv = players.sort((a,b) => players[a].dataset.turn - players[b].dataset.turn)[0]
    if (currentPlayerDiv[0].dataset.turn < 7){
        for (let i = 1; i < 7; ++i){
            let taskDiv = selectElement(`.task_${i}`)
            taskDiv.innerHTML = ""
            console.log(taskDiv)
            let chooseButton = createElement("button")
            chooseButton.innerText = "Choose"
            chooseButton.addEventListener("click", function(){
                taskToggle(taskDiv)
                removeChoice()
                addPoints()
            })
            taskDiv.append(chooseButton) 
        }
    }
}

function taskToggle(task){
    console.log(task)
    task.classList.toggle("chosen")
}

function removeChoice(){
    let buttons = selectElements(".task > button")
    for (let button of buttons){
        if (!button.parentElement.classList.contains("chosen")){
            button.parentElement.innerHTML = ""
        }
    }
}

function addPoints (){
    let task = selectElement(".chosen")
    let taskStr = task.classList[0]
    let taskNmb = parseInt(taskStr.charAt(taskStr.length - 1))
    console.log(taskNmb)
    let die = selectElements("[data-keep = saved")
    console.log(die)
    let points = 0
    for (let dice of die){
        console.log(dice.dataset.value)
        points += parseInt(dice.dataset.value)

    }
    task.innerHTML = `${points}`
    let players = [selectElements(".playing")]
    let currentPlayerDiv = players.sort((a,b) => players[a].dataset.turn - players[b].dataset.turn)[0]
    currentPlayerDiv[0].dataset.turn++
    nextTurn()
}

function nextTurn (){
    renderPlayer()
    resetRolls()
}

function resetRolls (){
    let rollCounter = selectElement("#playerName")
    rollCounter.dataset.throw = 0
    let rollsCounter = selectElement("#nmbRolls")
    rollsCounter.innerText = `${rollCounter.dataset.throw}/3`
    let savedDie = selectElements(`[data-keep="saved"]`)
    for (let die of savedDie){
        die.dataset.keep = "unsaved"
        die.parentElement.children[2].innerText = "Save Die"
    }
}

function sortPlayers(){
    let players = [selectElements(".playing")]
    let playerElements = players[0]
    let playingPlayersArray = []
    for (let player of playerElements){
        playingPlayersArray.push(player)
    }
    playingPlayersArray.sort((a,b) => a.dataset.turn - b.dataset.turn)
    return playingPlayersArray[0]
}