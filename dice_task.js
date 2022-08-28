function saveButtons () {
  let diceDivs = selectElements('#dices > div')
  for (let div of diceDivs) {
    div.children[2].addEventListener('click', function () {
      saveToggle(div.children[0])
    })
  }
}

function saveToggle (die) {
  let nmbThrow = parseInt(selectElement('#playerName').dataset.throw)
  if (nmbThrow == 0) {
    return
  }
  if (die.dataset.keep == 'unsaved') {
    die.dataset.keep = 'saved'
    die.parentElement.children[2].innerText = 'Unsave Die'
  } else {
    die.dataset.keep = 'unsaved'
    die.parentElement.children[2].innerText = 'Save Die'
  }
  let savedDie = selectElements('[data-keep = saved')
  if (savedDie.length == 5) {
    chooseYatzy()
  }
}

function chooseYatzy () {
  let currentPlayerDiv = sortPlayers()[0]
  if (!currentPlayerDiv.children[16].classList.contains('chosen')) {
    let yatzyDiv = currentPlayerDiv.children[16]
    yatzyDiv.innerHTML = ''
    let chooseButton = createElement('button')
    chooseButton.innerText = 'Choose'
    chooseButton.addEventListener('click', function () {
      taskToggle(yatzyDiv)
      removeChoice()
      addYatzyPoints(currentPlayerDiv)
    })
    yatzyDiv.append(chooseButton)
  }
}

function addYatzyPoints (player) {
  let die = selectElements('[data-keep = saved]')
  let dieArray = []
  for (let dice of die) {
    dieArray.push(dice)
    if (dieArray.length == 5) {
      if (dieArray.some(v => v.dataset.value === dieArray[0].dataset.value))
        player.children[16].innerText = 50
      let currentPlayerDiv = sortPlayers()[0]
      currentPlayerDiv.dataset.turn++
      nextTurn()
    }
  }
}

function addPoints (task, turn) {
  let currentPlayerDiv = sortPlayers()[0]
  console.log(oneToSixeDone(currentPlayerDiv))
  if (oneToSixeDone(currentPlayerDiv) == false) {
    oneToSixPoints(task)
  }
  // else if()
  taskToggle(task)
  upperTotal()
  currentPlayerDiv.dataset.turn++
  nextTurn()
}

function oneToSixPoints (task) {
  let taskStr = task.classList[0]
  let taskNmb = parseInt(taskStr.charAt(taskStr.length - 1))
  let die = selectElements('[data-keep = saved]')
  let points = 0
  for (let dice of die) {
    if (dice.dataset.value == taskNmb) {
      points += parseInt(dice.dataset.value)
    }
  }
  task.innerHTML = `${points}`
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

function nextTurn () {
  renderPlayer()
  resetRolls()
  sortPlayers()
}

function chooseTask () {
  let currentPlayerDiv = sortPlayers()[0]
  if (oneToSixeDone(currentPlayerDiv) == false) {
    for (let i = 1; i < 7; ++i) {
      oneToSixTasks(currentPlayerDiv, i)
    }
  } else {
    for (let i = 9; i < 18; ++i) {
      lowerHalf(currentPlayerDiv, i)
    }
  }
}

function oneToSixTasks (player, i) {
  if (!player.children[i].classList.contains('chosen')) {
    let taskDiv = player.children[i]
    taskDiv.innerHTML = ''
    let chooseButton = createElement('button')
    chooseButton.innerText = 'Choose'
    chooseButton.addEventListener('click', function () {
      removeChoice()
      addPoints(taskDiv, i)
    })
    taskDiv.append(chooseButton)
  }
}

function oneToSixeDone (player) {
  let taskList = []
  for (let i = 1; i < 7; ++i) {
    if (player.children[i].classList.contains('chosen')) {
      let taskDiv = player.children[i]
      taskList.push(taskDiv)
    }
  }
  return (taskList.length == 6)
}

function lowerHalf (player, i) {
  if (!player.children[i].classList.contains('chosen')) {
    let taskDiv = player.children[i]
    taskDiv.innerHTML = ''
    let chooseButton = createElement('button')
    chooseButton.innerText = 'Choose'
    chooseButton.addEventListener('click', function () {
      taskToggle(taskDiv)
      removeChoice()
      addPoints(taskDiv, i)
    })
    taskDiv.append(chooseButton)
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

function upperTotal () {
  let currentPlayerDiv = sortPlayers()[0]
  let points = 0
  for (let i = 1; i < 7; ++i) {
    let task = currentPlayerDiv.children[i]
    if (task.classList.contains('chosen')) {
      points += parseInt(task.innerText)
    }
  }
  currentPlayerDiv.children[7].innerText = points
}

saveButtons()
