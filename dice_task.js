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
  let die = selectElements('.die')
  let dieArray = []
  for (let dice of die) {
    dieArray.push(dice) 
    }

    let filteredArray = dieArray.filter(a => a.dataset.value == dieArray[0].dataset.value)  

    if (filteredArray.length == 5) {
      player.children[16].innerText = 50
      let currentPlayerDiv = sortPlayers()[0]
      currentPlayerDiv.dataset.turn++
      nextTurn()
    } else {
      player.children[16].innerText = 0
      let currentPlayerDiv = sortPlayers()[0]
      currentPlayerDiv.dataset.turn++
      nextTurn()
    }
}

function addPoints (task, taskNmb) {
  let currentPlayerDiv = sortPlayers()[0]
  if (oneToSixeDone(currentPlayerDiv) == false) {
    oneToSixPoints(task)
    taskToggle(task)
    upperTotal()
  } else {
    lowerHalfPoints(task, taskNmb)
    lowerTotal()
  }
  currentPlayerDiv.dataset.turn++
  nextTurn()
}

function lowerHalfPoints (task, taskNmb) {
  let dieArray = sortedDieArray()
  let currentPlayerDiv = sortPlayers()[0]

  if (taskNmb == 9) {
    onePair(task, dieArray)
  }
  if (taskNmb == 10) {
    twoPairs(task, dieArray)
  }
  if (taskNmb == 11) {
    threeOfAKind(task, dieArray)
  }
  if (taskNmb == 12) {
    fourOfAKind(task, dieArray)
  }
  if (taskNmb == 13) {
    fullHouse(task, dieArray)
  }
  if (taskNmb == 14) {
    smallLadder(task, dieArray)
  }
  if (taskNmb == 15) {
    largeLadder(task, dieArray)
  }
  if (taskNmb == 16) {
    addYatzyPoints(currentPlayerDiv)
  }
  if (taskNmb == 17) {
    Chance(task, dieArray)
  }
}

function twoPairs (task, dieArray) {
  let points = 0
  let pairs = 0
  for (let i = 0; i < dieArray.length; ++i) {
    if (dieArray[i] == dieArray[i + 1] && dieArray[i] != dieArray[i + 2]) {
      points += dieArray[i] * 2
      pairs++
    }
  }
  if (pairs < 2) {
    points = 0
  }
  task.innerHTML = `${points}`
}

function threeOfAKind (task, dieArray) {
  let points = 0

  for (let i = 0; i < dieArray.length; ++i) {
    if (dieArray[i] == dieArray[i - 1] && dieArray[i] == dieArray[i - 2]) {
      points = dieArray[i] * 3
    }
    task.innerHTML = `${points}`
  }
}

function fourOfAKind (task, dieArray) {
  let points = 0

  for (let i = 0; i < dieArray.length; ++i) {
    if (
      dieArray[i] == dieArray[i - 1] &&
      dieArray[i] == dieArray[i - 2] &&
      dieArray[i] == dieArray[i - 3]
    ) {
      points = dieArray[i] * 4
    }
    task.innerHTML = `${points}`
  }
}

function smallLadder (task, dieArray) {
  let points = 0

    for (let i = 0; i < dieArray.length; ++i) {
      if (dieArray[i] == dieArray[i+1]) {
         points = 0
        task.innerHTML = `${points}`
        return
      } else {
        points += parseInt(dieArray[i])
      }
    }
  
  if (points != 15) {
    points = 0
  }
  task.innerHTML = `${points}`
}

function largeLadder (task, dieArray) {
  let points = 0
    for (let i = 0; i < dieArray.length; ++i) {
      if (dieArray[i] == dieArray[i+1]) {
        points = 0
        task.innerHTML = `${points}`
        return
      }
      else {
        points += parseInt(dieArray[i])
      }
    }
  if (points != 20) {
    points = 0
  }
  task.innerHTML = `${points}`
}

function Chance (task, dieArray) {
  let points = 0
  for (let point of dieArray) {
    points += parseInt(point)
  }
  task.innerHTML = `${points}`
}

function fullHouse (task, dieArray) {
  let points = 0
  for (let i = 0; i < dieArray.length; ++i) {
    if (
      dieArray[i] == dieArray[i - 1] &&
      dieArray[i + 1] == dieArray[i + 2] &&
      dieArray[i + 1] == dieArray[i + 3]
    ) {
      points = dieArray[i] * 2 + dieArray[i + 1] * 3
      task.innerHTML = `${points}`
      return
    } else if (
      dieArray[i] == dieArray[i - 1] &&
      dieArray[i] == dieArray[i - 2] &&
      dieArray[i + 1] == dieArray[i + 2]
    ) {
      points = dieArray[i] * 3 + dieArray[i + 1] * 2
      task.innerHTML = `${points}`
      return
    }
  }
}

function onePair (task, dieArray) {
  let points = 0
  for (let i = 0; i < dieArray.length; ++i) {
    if (dieArray[i] == dieArray[i - 1]) {
      points = dieArray[i] * 2
    }
  }
  task.innerHTML = `${points}`
}

function sortedDieArray () {
  let die = selectElements('.die')
  let dieArray = []
  for (let dice of die) {
    dieArray.push(dice)
  }
  let sortedArray = dieArray
    .sort((a, b) => a.dataset.value - b.dataset.value)
    .map(a => a.dataset.value)
  return sortedArray
}

function oneToSixPoints (task) {
  let taskStr = task.classList[0]
  let taskNmb = parseInt(taskStr.charAt(taskStr.length - 1))
  let die = selectElements('.die')
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
  return taskList.length == 6
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
  if (points >= 63) {
    currentPlayerDiv.children[8].innerText = 50
  }
  else {
    currentPlayerDiv.children[8].innerText = 0
  }
  currentPlayerDiv.children[7].innerText = points
}

function lowerTotal () {
  let currentPlayerDiv = sortPlayers()[0]
  let points = 0
  for (let i = 9; i < 18; ++i) {
    let task = currentPlayerDiv.children[i]
    if (task.classList.contains('chosen')) {
      points += parseInt(task.innerText)
    }
  }
  for (let i = 7; i < 9; ++i) {
    let task = currentPlayerDiv.children[i]
    points += parseInt(task.innerText)
  }
  currentPlayerDiv.children[18].innerText = points
}

saveButtons()
