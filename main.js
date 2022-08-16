'use strict'

let createElement = element => document.createElement(element)
let selectElements = element => document.querySelectorAll(element)
let selectElement = element => document.querySelector(element)

selectElement('#throw').addEventListener('click', toggleThrow)
selectElement('#board').addEventListener('click', toggleBoard)
selectElement('#roller').addEventListener('click', rollDice)

function createColumn () {
  let container = createElement('div')
  container.classList.add('player')
  for (let i = 0; i < 19; ++i) {
    let div = createElement('div')
    div.classList.add(`task_${i}`)
    div.classList.add(`task`)
    container.append(div)
  }
  return container
}

function renderColumns () {
  for (let i = 0; i < 4; ++i) {
    let column = createColumn()
    selectElement('main').append(column)
  }
}

function fillName () {
  let nameBoxes = selectElements('.task_0')
  for (let box of nameBoxes)
    box.innerHTML = `<input type="text" value="Name"></input>`
}

function toggleThrow () {
  selectElement('#throw').classList.toggle('active')
  selectElement('#board').classList.toggle('active')
  selectElement('header').style.display = 'flex'
  selectElement('main').style.display = 'none'
}

function toggleBoard () {
  selectElement('#throw').classList.toggle('active')
  selectElement('#board').classList.toggle('active')
  selectElement('header').style.display = 'none'
  selectElement('main').style.display = 'flex'
}

function numbGen () {
  return Math.ceil(Math.random() * 6)
}

function randomDice (dice) {
  let dieces = selectElements('[data-keep = "unsaved')
  for (let die of dieces) {
    die.dataset.value = numbGen()
  }
}

function numberUpdate (){
  let diceDivs = selectElements("#dices > div")
  for (let div of diceDivs){
    div.children[1].innerText = div.children[0].dataset.value
  }
}

function rollDice () {
  let player = selectElement("#playerName")
  let timesRun = 0
  if(player.dataset.throw == 3){
    return 3
  }
  let interval = setInterval(function () {
    randomDice()
    numberUpdate()
    if (timesRun == 10) {
      clearInterval(interval)
    }
    timesRun += 1
  }, 150)
  player.dataset.throw++ 
  return parseInt(player.dataset.throw)
}

function saveButtons (){
  let diceDivs = selectElements("#dices > div")
  for (let div of diceDivs){
    div.children[2].addEventListener("click", function (){saveToggle(div.children[0])})
  }
}

function saveToggle(die){
  if (die.dataset.keep == "unsaved"){
    die.dataset.keep = "saved"
    die.parentElement.children[2].innerText = "Unsave Die"
  }
  else {
    die.dataset.keep = "unsaved"
    die.parentElement.children[2].innerText = "Save Die"
  }
}

renderColumns()
fillName()
saveButtons()