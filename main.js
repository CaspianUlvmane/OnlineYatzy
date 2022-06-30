"use strict"

let creatDiv = () => document.createElement("div")
let wrapper = document.querySelector("#wrapper")

function createColumn(){
    for (let i = 0; i < 19; ++i){
        let div = creatDiv()
        div.classList.add(`${i}`)
    }
}

function renderColumns (){
    for (let i = 0; i < 4; ++i){
        let column = createColumn()
        wrapper.append(column)
    }
}