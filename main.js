"use strict"

let createElement = element => document.createElement(element)
let wrapper = document.querySelector("#wrapper")

function createColumn(){
    let container = createElement("div")
    container.classList.add("player")
    for (let i = 0; i < 19; ++i){
        let div = createElement("div")
        div.classList.add("task",`${i}`)
        container.append(div)
    }
    return container
}

function renderColumns (){
    for (let i = 0; i < 4; ++i){
        let column = createColumn()
        wrapper.append(column)
    }
}

renderColumns()