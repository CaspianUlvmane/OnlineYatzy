let startBtn = selectElement('#start')

startBtn.addEventListener('click', startGame)
selectElement('#roller').addEventListener('click', currentThrow)
selectElement('#roller').addEventListener('click', chooseTask)

function playingPlayers () {
  let players = selectElements('.player')
  for (let player of players) {
    let playerName = player.children[0].children[0].value
    if (playerName != 'Name' && playerName != '') {
      player.classList.add('playing')
    } else if (playerName == 'Name' || playerName == '') {
      player.classList.remove('playing')
    }
  }
}

function startGame () {
  document.querySelector("#start").style.display = "none"
  document.querySelector("#roller").style.display = "block"
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
