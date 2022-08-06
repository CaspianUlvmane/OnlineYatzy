'use strict'

let createElement = element => document.createElement(element)
let selectElements = element => document.querySelectorAll(element)
let selectElement = element => document.querySelector(element)

selectElement('#throw').addEventListener('click', toggleThrow)
selectElement('#board').addEventListener('click', toggleBoard)

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

function numbGen (){
    return Math.ceil(Math.random() * 6)
}

function randomDice (dice){
    let value = dice.dataset.value
    let valueAsNumber = parseInt(value)
    
}

renderColumns()
fillName()
