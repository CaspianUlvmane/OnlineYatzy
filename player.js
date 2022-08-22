let startBtn = selectElement('#start')

startBtn.addEventListener('click', startGame)
selectElement('#roller').addEventListener('click', currentThrow)
selectElement('#roller').addEventListener('click', chooseTask)

function playingPlayers () {
  let players = selectElements('.player')
  for (let player of players) {
    let playerName = player.children[0].children[0].value
    console.log(playerName)
    if (playerName != 'Name' && playerName != '') {
      player.classList.add('playing')
    } else if (playerName == 'Name' || playerName == '') {
      player.classList.remove('playing')
    }
  }
}

function startGame () {
  playingPlayers()
  turnsStart()
  renderPlayer()
  currentThrow()
}

function currentPlayer () {
  let players = sortPlayers()[0]
  let name = players.children[0].children[0].value
  return name
}

function renderPlayer () {
  let nameSign = selectElement('#playerName')
  nameSign.textContent = currentPlayer()
}

function currentThrow () {
  let player = selectElement('#playerName')
  let rollCounter = selectElement('#nmbRolls')
  rollCounter.innerText = `${player.dataset.throw}/3`
}

function turnsStart () {
  let players = selectElements('.playing')
  for (let player of players) {
    player.dataset.turn = 0
  }
}

function chooseTask () {
  let currentPlayerDiv = sortPlayers()[0]
  if (currentPlayerDiv.dataset.turn < 7) {
    for (let i = 1; i < 7; ++i) {
      if (!currentPlayerDiv.children[i].classList.contains('chosen')) {
        let taskDiv = currentPlayerDiv.children[i]
        taskDiv.innerHTML = ''
        let chooseButton = createElement('button')
        chooseButton.innerText = 'Choose'
        chooseButton.addEventListener('click', function () {
          taskToggle(taskDiv)
          removeChoice()
          addPoints(taskDiv)
        })
        taskDiv.append(chooseButton)
      }
    }
  }
}

function taskToggle (task) {
  task.classList.toggle('chosen')
}

function removeChoice () {
  let buttons = selectElements('.task > button')
  for (let button of buttons) {
    if (!button.parentElement.classList.contains('chosen')) {
      button.parentElement.innerHTML = ''
    }
  }
}

function addPoints (task) {
  let taskStr = task.classList[0]
  let taskNmb = parseInt(taskStr.charAt(taskStr.length - 1))
  let die = selectElements('[data-keep = saved')
  let points = 0
  for (let dice of die)
    if (dice.dataset.value == taskNmb) {
      points += parseInt(dice.dataset.value)
    }
  task.innerHTML = `${points}`
  let currentPlayerDiv = sortPlayers()[0]
  console.log(currentPlayerDiv)
  currentPlayerDiv.dataset.turn++
  nextTurn()
}

function nextTurn () {
  renderPlayer()
  resetRolls()
  sortPlayers()
  console.log(sortPlayers()[0])
}

function resetRolls () {
  let rollCounter = selectElement('#playerName')
  rollCounter.dataset.throw = 0
  let rollsCounter = selectElement('#nmbRolls')
  rollsCounter.innerText = `${rollCounter.dataset.throw}/3`
  let savedDie = selectElements(`[data-keep="saved"]`)
  for (let die of savedDie) {
    die.dataset.keep = 'unsaved'
    die.parentElement.children[2].innerText = 'Save Die'
  }
}

function sortPlayers () {
  let players = [selectElements('.playing')]
  let playerElements = players[0]
  let playingPlayersArray = []
  for (let player of playerElements) {
    playingPlayersArray.push(player)
  }
  playingPlayersArray.sort((a, b) => a.dataset.turn - b.dataset.turn)
  return playingPlayersArray
}
